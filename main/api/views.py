from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import json
import torch
import time
from .model_loader import load_model
from ..logger import logger  

@csrf_exempt
def predict_lstm(request):
    """
    Recibe una secuencia numérica y devuelve una predicción del modelo LSTM.
    """
    if request.method == "POST":
        start_time = time.time()
        try:
            data = json.loads(request.body.decode("utf-8"))
            sequence = data.get("sequence", [])

            if not sequence:
                return JsonResponse({"error": "No sequence provided"}, status=400)

            x = torch.tensor(sequence, dtype=torch.float32).unsqueeze(0)
            model = load_model()

            with torch.no_grad():
                y_pred = model(x).item()

            elapsed = time.time() - start_time
            logger.info(f"✅ Predicción LSTM completada en {elapsed:.2f} segundos")

            return JsonResponse({"prediction": round(float(y_pred), 4)})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            logger.error(f"❌ Error en predict_lstm: {e}")
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)


@csrf_exempt
def predict_csv(request):
    """
    Permite subir un archivo CSV, procesarlo y devolver predicciones del modelo LSTM.
    """
    if request.method == "POST":
        start_time = time.time()
        try:
            file = request.FILES.get("file")
            if not file:
                return JsonResponse({"error": "No se ha subido ningún archivo CSV"}, status=400)

            df = pd.read_csv(file)
            if df.empty:
                return JsonResponse({"error": "El CSV está vacío"}, status=400)

            MAX_ROWS = 5000
            if len(df) > MAX_ROWS:
                df = df.iloc[:MAX_ROWS]

            df = df.select_dtypes(include=["number"]).fillna(0)
            tensor_data = torch.tensor(df.values, dtype=torch.float32)

            model = load_model()
            preds = []

            with torch.no_grad():
                for i in range(len(tensor_data) - 28):
                    seq = tensor_data[i:i+28].unsqueeze(0)
                    pred = model(seq).item()
                    preds.append(pred)

            elapsed = time.time() - start_time
            logger.info(f"✅ Predicción CSV completada ({len(preds)} muestras) en {elapsed:.2f} segundos")

            return JsonResponse({"predictions": preds[:50]}, safe=False)

        except Exception as e:
            logger.error(f"❌ Error en predict_csv: {e}")
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido (solo POST)"}, status=405)


def health_check(request):
    """Verifica el estado del servidor."""
    return JsonResponse({"status": "ok"})

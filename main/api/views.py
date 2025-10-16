from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import pandas as pd
import json
import torch
import os
from .model_loader import load_model

@csrf_exempt
def predict_lstm(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            sequence = data.get("sequence", [])

            if not sequence:
                return JsonResponse({"error": "No sequence provided"}, status=400)

            x = torch.tensor(sequence, dtype=torch.float32).unsqueeze(0)

            with torch.no_grad():
                y_pred = load_model(x).item()

            return JsonResponse({"prediction": round(float(y_pred), 4)})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)



@csrf_exempt
def predict_csv(request):
    """
    Permite subir un archivo CSV, procesarlo y devolver predicciones del modelo LSTM.
    """
    if request.method == "POST":
        try:
            # 1️⃣ Verificamos que se suba el archivo
            file = request.FILES.get("file")
            if not file:
                return JsonResponse({"error": "No se ha subido ningún archivo CSV"}, status=400)

            # 2️⃣ Leemos el CSV
            df = pd.read_csv(file)
            if df.empty:
                return JsonResponse({"error": "El CSV está vacío"}, status=400)

            # 3️⃣ Convertimos a tensor (solo columnas numéricas)
            df = df.select_dtypes(include=["number"]).fillna(0)
            tensor_data = torch.tensor(df.values, dtype=torch.float32)

            # 4️⃣ Generamos las predicciones fila a fila
            preds = []
            with torch.no_grad():
                for i in range(len(tensor_data) - 28):  # ventana de 28 días
                    seq = tensor_data[i:i+28].unsqueeze(0)
                    pred = load_model(seq).item()
                    preds.append(pred)

            # 5️⃣ Devolvemos las predicciones
            return JsonResponse({"predictions": preds[:50]}, safe=False)  # limitamos para vista

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido (solo POST)"}, status=405)
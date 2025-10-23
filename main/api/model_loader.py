import torch
import torch.nn as nn
import os
from pathlib import Path

# ==============================
# DEFINICIÓN DEL MODELO
# ==============================
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size, dropout=0.2):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(
            input_size,
            hidden_size,
            num_layers,
            batch_first=True,
            dropout=dropout
        )
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])  # Usa la última salida temporal
        return out

# ==============================
# CARGA DIFERIDA (Lazy Loading)
# ==============================
_model_cache = None  # ✅ cache global controlada

def get_model():
    """
    Carga el modelo LSTM solo cuando se necesita.
    Si ya está cargado, reutiliza la instancia en memoria.
    """
    global _model_cache
    if _model_cache is None:
        checkpoint_path = os.path.join(Path(__file__).resolve().parent, "best_lstm.pt")
        if not os.path.exists(checkpoint_path):
            raise FileNotFoundError(f"No se encontró el archivo del modelo: {checkpoint_path}")

        checkpoint = torch.load(checkpoint_path, map_location="cpu")

        model = LSTMModel(
            input_size=checkpoint.get("input_size", 62),
            hidden_size=checkpoint.get("hidden_size", 128),
            num_layers=checkpoint.get("num_layers", 2),
            output_size=checkpoint.get("output_size", 1),
            dropout=checkpoint.get("dropout", 0.2),
        )
        model.load_state_dict(checkpoint["model_state_dict"])
        model.eval()

        _model_cache = model
        print(f"✅ Modelo LSTM cargado correctamente desde {checkpoint_path}")
    return _model_cache

import logging
import os

# Crear logger principal
logger = logging.getLogger("django")
logger.setLevel(logging.INFO)

# Crear handler para consola (Render mostrará esto en los logs)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Formato con hora, nivel y mensaje
formatter = logging.Formatter(
    "%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S"
)
console_handler.setFormatter(formatter)

# Evitar handlers duplicados
if not logger.handlers:
    logger.addHandler(console_handler)

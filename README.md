# 🌸 Fuyu Portafolio — Django + IA

Este proyecto es una aplicación web construida con **Django** que sirve como portafolio profesional y base para futuros desarrollos con **modelos de IA**.  
Incluye integración de predicciones, endpoints API y un diseño escalable listo para despliegue en producción.

---

## 🚀 Tecnologías utilizadas

- 🐍 **Python 3.11**
- 🌐 **Django 5.x**
- 🧠 **PyTorch** para modelos de predicción
- 📊 **Pandas / NumPy** para procesamiento de datos
- 🧭 **Gunicorn + Whitenoise + Waitress** para despliegue
- ☁️ **Render** para hosting
- 📝 HTML, CSS, Bootstrap para el frontend

---

## 🧠 Características principales

- 📂 **Portafolio dinámico** con proyectos, libros y blog.
- 🧠 **Endpoints API** para predicciones con modelos de Machine Learning (LSTM y CSV).
- 🧪 **Health Check API** para monitoreo.
- 🖼️ Gestión de recursos estáticos optimizada con Whitenoise.
- 🧰 Estructura lista para escalar en microservicios si es necesario.

---

## 📁 Estructura del proyecto

```
portafolio/
│── main/                 # App principal con vistas y API
│   ├── api/              # Modelos y endpoints de predicción
│   ├── templates/        # Plantillas HTML
│   ├── static/           # Archivos estáticos
│── portafolio/           # Configuración Django
│── manage.py             # Script principal
│── requirements.txt      # Dependencias del proyecto
│── Procfile              # Archivo para despliegue en Render
│── .gitignore            # Ignora .venv y otros archivos innecesarios
```

---

## ⚡ Instalación local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/EderCabascango/PortafolioWeb.git
   cd PortafolioWeb
   ```

2. Crea y activa un entorno virtual:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

5. Accede a [http://localhost:8000](http://localhost:8000)

---

## 🌿 Despliegue en Render

1. Asegúrate de tener `Procfile` y `requirements.txt` en la raíz.
2. Sube el proyecto a GitHub.
3. Crea un nuevo servicio web en [https://render.com](https://render.com).
4. Render detectará Django automáticamente.
5. Configura variables de entorno y despliega 🚀.

---

## 🧠 Endpoints principales

| Método | Endpoint              | Descripción                             |
|--------|-------------------------|------------------------------------------|
| GET    | `/health`               | Verifica si la API está viva 🫀           |
| POST   | `/predict_lstm`         | Realiza predicciones usando LSTM        |
| POST   | `/predict_csv`          | Realiza predicciones desde un archivo CSV |

---

## 🧑‍💻 Autor

**Eder Cabascango**  
📍 Ecuador  
💼 Científico de Datos — Fundador de Fuyu  
🌐 [LinkedIn](https://www.linkedin.com/in/eder-cabascango) | [GitHub](https://github.com/EderCabascango)

> “There are two types of people in the world: those who can extrapolate from incomplete data.”

---

## 🛡️ Licencia

Este proyecto está bajo licencia MIT — siéntete libre de usarlo, modificarlo y mejorarlo.

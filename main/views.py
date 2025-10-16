from django.shortcuts import render, get_object_or_404
from .models import Project, BlogPost, Book
import markdown
from django.http import JsonResponse
from .api.model_loader import load_model
import torch
import numpy as np
import json

# =======================================
# CARGA DEL MODELO AL INICIAR EL SERVIDOR
# =======================================
try:
    model = load_model()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
except Exception as e:
    model = None
    print(f"⚠️ Error al cargar el modelo LSTM: {e}")

# ==============================
# PÁGINAS PRINCIPALES
# ==============================
def home(request):
    projects = Project.objects.all().order_by('-created_at')[:3]  # últimos 3 proyectos
    posts = BlogPost.objects.all().order_by('-created_at')[:2]    # últimos 2 posts
    return render(request, 'main/home.html', {'projects': projects, 'posts': posts})

def portfolio(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'main/portfolio.html', {'projects': projects})

def project_detail(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    project.tools_list = project.tools.split(',') if project.tools else []
    return render(request, 'main/project_detail.html', {'project': project})

def blog(request):
    posts = BlogPost.objects.all().order_by('-created_at')
    return render(request, 'main/blog.html', {'posts': posts})

def blog_detail(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)
    return render(request, 'main/blog_detail.html', {'post': post})

def about(request):
    return render(request, 'main/about.html')

def cv(request):
    return render(request, 'main/cv.html')

def books(request):
    books = Book.objects.all().order_by('-created_at')
    return render(request, 'main/books.html', {'books': books})

def book_detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.summary_html = markdown.markdown(
        book.summary_md,
        extensions=['fenced_code', 'tables']
    )
    return render(request, 'main/book_detail.html', {'book': book})

# ==============================
# PREDICCIÓN CON LSTM
# ==============================
def predict_view(request):
    if request.method == "POST":
        if model is None:
            return JsonResponse({"error": "El modelo no está cargado."}, status=500)

        try:
            # Si viene como string desde formulario
            raw_data = request.POST.get("sequence")
            if raw_data is None:
                # Si viene desde fetch JSON
                raw_data = json.loads(request.body).get("sequence")

            if isinstance(raw_data, str):
                sequence = eval(raw_data)  # ⚠️ sólo si controlas el input — mejor usar json.loads en prod
            else:
                sequence = raw_data

            x_input = torch.tensor(sequence, dtype=torch.float32).unsqueeze(0).to(device)
            with torch.no_grad():
                prediction = model(x_input).item()

            return JsonResponse({"prediction": round(float(prediction), 4)})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Usa método POST para enviar datos."})


# ==============================
# DEMO DE PROYECTOS
# ==============================
def project_demo(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    return render(request, 'main/project_demo.html', {'project': project})

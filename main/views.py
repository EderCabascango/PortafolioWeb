from django.shortcuts import render, get_object_or_404
from .models import Project, BlogPost

# Página principal
def home(request):
    projects = Project.objects.all().order_by('-created_at')[:3]  # últimos 3 proyectos
    posts = BlogPost.objects.all().order_by('-created_at')[:2]    # últimos 2 posts
    return render(request, 'main/home.html', {'projects': projects, 'posts': posts})

# Lista completa de proyectos
def portfolio(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'main/portfolio.html', {'projects': projects})

# Detalle de un proyecto específico
def project_detail(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    # Crear lista de herramientas para mostrar mejor en template
    project.tools_list = project.tools.split(',') if project.tools else []
    return render(request, 'main/project_detail.html', {'project': project})

# Lista de posts del blog
def blog(request):
    posts = BlogPost.objects.all().order_by('-created_at')
    return render(request, 'main/blog.html', {'posts': posts})

# Página individual de blog (opcional)
def blog_detail(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)
    return render(request, 'main/blog_detail.html', {'post': post})

# Página Sobre Mí
def about(request):
    return render(request, 'main/about.html')

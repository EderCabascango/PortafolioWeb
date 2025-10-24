from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tools = models.CharField(max_length=200)
    github_link = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)  # para ver la demo online
    
    # ✅ Ahora solo guarda el nombre del archivo, no una ruta de media
    image = models.CharField(max_length=255, blank=True, null=True)
    
    tags = models.CharField(max_length=200, blank=True, null=True)  # filtros por tecnología
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    has_demo = models.BooleanField(default=False, verbose_name="¿Mostrar demo interactiva?")
    api_url = models.URLField(blank=True, null=True, verbose_name="URL del endpoint (si aplica)")

    def __str__(self):
        return self.title


class Resource(models.Model):
    RESOURCE_TYPES = (
        ('notebook', 'Jupyter Notebook'),
        ('dataset', 'Dataset'),
        ('doc', 'Document'),
        ('other', 'Other'),
    )
    project = models.ForeignKey(Project, related_name='resources', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    file = models.FileField(upload_to='project_resources/')
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES, default='other')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    cover = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    summary_md = models.TextField(help_text="Resumen en formato Markdown")
    pdf_file = models.FileField(upload_to='book_files/', blank=True, null=True)
    epub_file = models.FileField(upload_to='book_files/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

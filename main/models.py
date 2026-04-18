from django.db import models
import csv
import io

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

# ==============================
# MODELOS DE CERTIFICACIÓN
# ==============================

class Certification(models.Model):
    title = models.CharField(max_length=200, help_text="Ej: Microsoft DP-100")
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class CertUnit(models.Model):
    certification = models.ForeignKey(Certification, related_name='units', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, help_text="Ej. Unidad 1")
    title = models.CharField(max_length=200, help_text="Tema de la unidad")
    summary = models.TextField(blank=True, null=True, help_text="Resumen del tema abordado en la unidad")
    video_url = models.URLField(blank=True, null=True, help_text="Enlace de YouTube u otra plataforma para embeber (uno por unidad)")
    flashcards_csv = models.FileField(upload_to='temp_csv/', blank=True, null=True, help_text="Sube un CSV con columnas (pregunta, respuesta) para auto-generar tarjetas al guardar en esta unidad.")
    order = models.PositiveIntegerField(default=0, help_text="Orden de visualización para la certificación")

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.certification.title} - {self.name}"

class CertSlide(models.Model):
    unit = models.ForeignKey(CertUnit, related_name='slides', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    pdf_file = models.FileField(upload_to='cert_slides/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class CertFlashcard(models.Model):
    unit = models.ForeignKey(CertUnit, related_name='flashcards', on_delete=models.CASCADE)
    question = models.TextField(help_text="Pregunta de la tarjeta")
    answer = models.TextField(help_text="Respuesta de la tarjeta")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Tarjeta: {self.question[:50]}..."

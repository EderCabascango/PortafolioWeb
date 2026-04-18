from django.contrib import admin
from .models import Project, BlogPost, Resource, Book, Certification, CertUnit, CertSlide, CertFlashcard
import csv
import io

# Inline para recursos asociados a cada proyecto
class ResourceInline(admin.TabularInline):
    model = Resource
    extra = 1
    fields = ('name', 'resource_type', 'file')

# Admin para Project
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'tools', 'github_link', 'demo_link', 'created_at')
    list_display_links = ('title',)
    search_fields = ('title', 'tools', 'tags')
    list_filter = ('created_at', 'tags')
    ordering = ('-created_at',)
    inlines = [ResourceInline]

# Admin para BlogPost
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title',)
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    search_fields = ('title', 'author')
    ordering = ('-created_at',)


# ==============================
# ADMIN DE CERTIFICACIONES
# ==============================

class CertSlideInline(admin.TabularInline):
    model = CertSlide
    extra = 1

class CertFlashcardInline(admin.TabularInline):
    model = CertFlashcard
    extra = 1

class CertUnitInline(admin.StackedInline):
    model = CertUnit
    extra = 1
    fields = ('name', 'title', 'summary', 'video_url', 'order')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    inlines = [CertUnitInline]

@admin.register(CertUnit)
class CertUnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'certification', 'order')
    list_filter = ('certification',)
    inlines = [CertSlideInline, CertFlashcardInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        
        # Procesar el CSV de flashcards asociado a esta unidad si existe
        if 'flashcards_csv' in form.changed_data and obj.flashcards_csv:
            try:
                csv_file = obj.flashcards_csv.read().decode('utf-8')
                reader = csv.reader(io.StringIO(csv_file), delimiter=',')
                header_skipped = False
                
                for row in reader:
                    if not header_skipped and (row[0].lower() == 'pregunta' or row[0].lower() == 'question'):
                        header_skipped = True
                        continue
                    
                    if len(row) >= 2:
                        pregunta = row[0].strip()
                        respuesta = row[1].strip()
                        if pregunta and respuesta:
                            CertFlashcard.objects.create(
                                unit=obj,
                                question=pregunta,
                                answer=respuesta
                            )
                
                # Limpiar archivo tras uso
                obj.flashcards_csv.delete(save=True)
            except Exception as e:
                pass


@admin.register(CertSlide)
class CertSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'unit', 'order')

@admin.register(CertFlashcard)
class CertFlashcardAdmin(admin.ModelAdmin):
    list_display = ('question', 'unit', 'order')
    search_fields = ('question',)

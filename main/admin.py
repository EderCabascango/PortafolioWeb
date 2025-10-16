from django.contrib import admin
from .models import Project, BlogPost, Resource, Book

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

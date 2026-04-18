from rest_framework import serializers
from main.models import Project, Resource, BlogPost, Book, Certification, CertUnit, CertSlide, CertFlashcard

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'name', 'file', 'resource_type', 'uploaded_at']

class ProjectSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tools', 'github_link', 'demo_link', 'image', 'tags', 'created_at', 'has_demo', 'api_url', 'resources']

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'cover', 'summary_md', 'pdf_file', 'epub_file', 'created_at']

class CertFlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertFlashcard
        fields = ['id', 'question', 'answer', 'order']

class CertSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertSlide
        fields = ['id', 'title', 'pdf_file', 'order']

class CertUnitSerializer(serializers.ModelSerializer):
    slides = CertSlideSerializer(many=True, read_only=True)
    flashcards = CertFlashcardSerializer(many=True, read_only=True)

    class Meta:
        model = CertUnit
        fields = ['id', 'name', 'title', 'summary', 'video_url', 'order', 'slides', 'flashcards']

class CertificationSerializer(serializers.ModelSerializer):
    units = CertUnitSerializer(many=True, read_only=True)

    class Meta:
        model = Certification
        fields = ['id', 'title', 'description', 'image', 'created_at', 'units']

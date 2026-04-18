from django.urls import path
from main.api import views as api_views
from main import views as main_views 

urlpatterns = [
    # Rutas originales de Machine Learning
    path("predict_lstm/", api_views.predict_lstm, name="predict_lstm"),
    path("predict_csv/", api_views.predict_csv, name="predict_csv"),
    path("health/", main_views.health_check, name="health_check"),

    # Rutas para el Frontend en React (API REST)
    path("projects/", api_views.ProjectList.as_view(), name="project-list"),
    path("projects/<int:pk>/", api_views.ProjectDetail.as_view(), name="project-detail"),
    path("blogs/", api_views.BlogPostList.as_view(), name="blog-list"),
    path("blogs/<int:pk>/", api_views.BlogPostDetail.as_view(), name="blog-detail"),
    path("books/", api_views.BookList.as_view(), name="book-list"),
    path("books/<int:pk>/", api_views.BookDetail.as_view(), name="book-detail"),
    path("certifications/", api_views.CertificationList.as_view(), name="certification-list"),
    path("certifications/<int:pk>/", api_views.CertificationDetail.as_view(), name="certification-detail"),
]
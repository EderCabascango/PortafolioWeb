from django.urls import path, include
from . import views
from main.api.views import predict_lstm, predict_csv

urlpatterns = [
    path('', views.home, name='home'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('project/<int:project_id>/', views.project_detail, name='project_detail'),
    path('blog/', views.blog, name='blog'),
    path('blog/<int:post_id>/', views.blog_detail, name='blog_detail'),
    path('about/', views.about, name='about'),
    path('cv/', views.cv, name='cv'),
    path('books/', views.books, name='books'),
    path('books/<int:book_id>/', views.book_detail, name='book_detail'),
    path('api/', include('main.api.urls')),
    path('project/<int:project_id>/demo/', views.project_demo, name='project_demo'),
    path('aboutme/', views.aboutme, name='aboutme'),
]

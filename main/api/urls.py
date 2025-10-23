from django.urls import path
from main import views as main_views
from main.api import views as api_views

urlpatterns = [
    path("health/", main_views.health_check, name="health_check"),
    path("predict_lstm/", api_views.predict_lstm, name="predict_lstm"),
    path("predict_csv/", api_views.predict_csv, name="predict_csv"),
]

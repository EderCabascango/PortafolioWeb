from django.urls import path
from .views import predict_lstm, predict_csv

urlpatterns = [
    path("predict/", predict_lstm, name="predict_lstm"),
    path("predict_csv/", predict_csv, name="predict_csv"),
]

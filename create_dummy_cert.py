import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portafolio.settings')
django.setup()

from main.models import Certification, CertUnit, CertSlide, CertFlashcard

def run():
    Certification.objects.all().delete()
    
    cert = Certification.objects.create(
        title="Microsoft Certified: Azure Data Scientist Associate (DP-100)",
        description="Esta certificación mide tu capacidad para aplicar la ciencia de datos y el aprendizaje automático para implementar y ejecutar cargas de trabajo de aprendizaje automático en Azure."
    )

    # CREAR UNIDADES
    u1 = CertUnit.objects.create(
        certification=cert,
        name="Unidad 1",
        title="Diseñar y preparar una solución de aprendizaje automático",
        summary="En esta unidad introductoria exploraremos el entorno del Workspace de Azure Machine Learning. Revisaremos cómo configurar el cómputo y crear conexiones a los almacenes de datos básicos para empezar a interactuar de manera segura.",
        video_url="https://www.youtube.com/embed/zpOULjyy-n8",
        order=1
    )

    CertFlashcard.objects.create(
        unit=u1,
        question="¿Qué es Azure Machine Learning Workspace?",
        answer="Es el recurso de nivel superior para Azure Machine Learning, proporcionando un lugar centralizado para trabajar con todos los artefactos.",
        order=1
    )
    CertFlashcard.objects.create(
        unit=u1,
        question="¿Qué tipo de clúster se usa típicamente para entrenar modelos en AML?",
        answer="Compute Clusters.",
        order=2
    )
    CertFlashcard.objects.create(
        unit=u1,
        question="¿Qué es un datastore en AML?",
        answer="Es una referencia a una cuenta de almacenamiento subyacente que guarda la información de conexión.",
        order=3
    )

    u2 = CertUnit.objects.create(
        certification=cert,
        name="Unidad 2",
        title="Exploración de datos y aprovisionamiento",
        summary="Aprenderemos cómo registrar, manejar y realizar análisis exploratorio de datos utilizando la integración de Azure ML con Pandas. Adicionalmente conectaremos flujos de Spark para procesar grandes bases de datos.",
        video_url="https://www.youtube.com/embed/dQw4w9WgXcQ",
        order=2
    )
    
    CertFlashcard.objects.create(
        unit=u2,
        question="¿Qué ventaja tienen los Datasets sobre los Datastores tradicionales?",
        answer="Brindan materialización, versionamiento y simplifican el flujo de CI/CD para entrenamientos y re-entrenamientos tabulares.",
        order=1
    )

    print(f"Creada certificación: {cert.title} con 2 unidades de muestra.")

if __name__ == '__main__':
    run()

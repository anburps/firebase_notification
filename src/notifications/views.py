import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, UserToken
import firebase_admin
from firebase_admin import credentials, messaging
from django.shortcuts import render

cred = credentials.Certificate("static/credentials.json")
firebase_admin.initialize_app(cred)

@csrf_exempt
def save_fcm_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        fcm_token = data.get('fcm_token')

        if fcm_token:
            UserToken.objects.create(token=fcm_token)
            return JsonResponse({'status': 'Token saved successfully'})
        else:
            return JsonResponse({'error': 'No token provided'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)



def index(request):
    return render(request, 'index.html')

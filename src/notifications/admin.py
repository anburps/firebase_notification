from django.contrib import admin
from .models import UserToken, Product

# Register your models here.
admin.site.register(UserToken)
admin.site.register(Product)
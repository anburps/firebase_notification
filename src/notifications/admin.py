from django.contrib import admin
from .models import UserToken, Product,Device

# Register your models here.
admin.site.register(UserToken)
admin.site.register(Product)
admin.site.register(Device)
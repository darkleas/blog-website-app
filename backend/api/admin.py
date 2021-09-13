from django.contrib import admin
from . import models
from django_summernote.admin import SummernoteModelAdmin

# Register your models here.

class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('description', )
admin.site.register(models.Comments)
admin.site.register(models.Post,PostAdmin)
admin.site.register(models.Category)
admin.site.register(models.Profile)

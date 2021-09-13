from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.utils.text import slugify
from django_summernote.widgets import SummernoteWidget, SummernoteInplaceWidget
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    biography = models.TextField(blank=True)

    profile_pic = models.CharField(null=True,blank=True, max_length=10000)
    def __str__(self):
        return self.user

class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    url = models.SlugField(max_length=255, unique=True,blank=True)
    img = models.CharField(max_length=2500)
    created_date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(User,blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True)
    def save(self, *args, **kwargs):
        self.url = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
    def __str__(self):
        return self.title


class Comments(models.Model):
    username = models.CharField(max_length=255)
    text = models.TextField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE,null=True)
    created_date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.text

from rest_framework import serializers
from api import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','username','email','password')
    def create(self, validated_data):
        password = validated_data.pop('password',None)

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ('id','user','biography','profile_pic')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ('id','title', 'description', 'url','img','created_date','likes','category')

    def create(self, validated_data):
        return models.Post.objects.create(**validated_data)
    def update(self,instance ,validated_data):
        instance.likes = validated_data.get('likes',instance.likes)
        instance.save()

        return instance
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id','title')
    def create(self, validated_data):
        return models.Category.objects.create(**validated_data)
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Comments
        fields = ('id','username','text', 'user','created_date','post')
    def create(self, validated_data):
        return models.Comments.objects.create(**validated_data)

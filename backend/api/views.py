from collections import UserDict
import json
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from . import models
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from . import serializers
from django.views.decorators.csrf import requires_csrf_token


# Create your views here.

def index(request):
    return render(request, "index.html")

@api_view(['GET','POST'])
def post_list(request):
    if request.method == "POST":
        x = serializers.PostSerializer(data=request.data)
        if x.is_valid():
            x.save()
            return Response(x.data, status= status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET":
        posts = models.Post.objects.all()
        serializer = serializers.PostSerializer(posts,many=True)
        return Response(data=serializer.data)

@api_view(['GET','POST'])
def profile_list(request):
    if request.method == "POST":
        x = serializers.ProfileSerializer(data=request.data)
        if x.is_valid():
            x.save()
            return Response(x.data, status= status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET":
        posts = models.Profile.objects.all()
        serializer = serializers.ProfileSerializer(posts,many=True)
        return Response(data=serializer.data)
@api_view(['POST'])
def like_post(request):    
    if request.method == "POST":
        articleid = request.data['articleid']
        userid = request.data['userid']
        article = models.Post.objects.get(id=articleid)
        user = User.objects.get(id=userid)
        article.likes.add(user)
        article.save()
        return Response(data=request.data, status= status.HTTP_201_CREATED)
@api_view(['POST'])
def remove_like_post(request):    
    if request.method == "POST":
        articleid = request.data['articleid']
        userid = request.data['userid']
        article = models.Post.objects.get(id=articleid)
        user = User.objects.get(id=userid)
        article.likes.remove(user)
        article.save()
        return Response(data=request.data, status= status.HTTP_201_CREATED)
@api_view(['GET','POST'])
def category_list(request):
    if request.method == "POST":
        x = serializers.CategorySerializer(data=request.data)
        if x.is_valid():
            x.save()
            return Response(x.data, status= status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET":
        category = models.Category.objects.all()
        serializer = serializers.CategorySerializer(category,many=True)
        return Response(data=serializer.data)

@api_view(['GET','POST'])
def comment_list(request):
    if request.method == "POST":
        print(request.data)
        x = serializers.CommentSerializer(data=request.data)
        if x.is_valid() and request.data['user'] and request.data['post'] and request.data['username'] != "undefined":
            x.save()
            return Response(x.data, status= status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET":
        comment = models.Comments.objects.all()
        serializer = serializers.CommentSerializer(comment,many=True)
        return Response(data=serializer.data)
@api_view(['GET','POST'])
def remove_comment(request):
    if request.method == "POST":
        user_id = request.data['user_id']
        user = User.objects.get(id=user_id)

        comment_id = request.data['comment_id']
        comment = models.Comments.objects.get(id=comment_id)

        if comment.user == user:
            comment.delete()
            return Response(request.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def edit_picture(request):
    if request.method == "POST":
        user_id = request.data['user_id']
        user = User.objects.get(id=user_id)

        profile = models.Profile.objects.get(user=user)
        

        if profile.user == user:
            profile.profile_pic = request.data['img']
            profile.save()
            return Response(request.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)




class Register(APIView):
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        username = request.data['username']

        password = request.data['password']
        repassword = request.data['repassword']
        if len(username) < 4 or len(password) < 6 or len(username) > 24 or len(password) > 32:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if password and repassword and password == repassword:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            userx = User.objects.get(username=username)
            models.Profile.objects.create(user=userx)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ViewProtect(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        
        return Response(
            {
                "id":request.user.id,
                "username":request.user.username,
                "first_name":request.user.first_name,
                "last_name":request.user.last_name,
                "email":request.user.email,
                "last_login":request.user.last_login,
                "date_joined":request.user.date_joined,
                "is_active":request.user.is_active,

            }
        )
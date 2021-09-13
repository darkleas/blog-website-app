from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('post_list/',views.post_list),
    path('profile_list/',views.profile_list),
    path('like_post/',views.like_post),
    path('remove_like_post/',views.remove_like_post),
    path('remove_comment/',views.remove_comment),
    path('edit_picture/',views.edit_picture),

    path('category_list/',views.category_list),
    path('comment_list/',views.comment_list),

    path('user/', views.ViewProtect.as_view()),
    path('register/', views.Register.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),




] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import ValidationError, NotFound
from django.shortcuts import get_object_or_404
from .models import Faculty
from .serializers import FacultySerializer

logger = logging.getLogger(__name__)

class FacultyListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            faculties = Faculty.objects.all()
            serializer = FacultySerializer(faculties, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error retrieving faculties: {str(e)}")
            return Response(
                {"detail": "Error retrieving faculties."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class FacultyCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            serializer = FacultySerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            logger.warning(f"Validation error: {str(e)}")
            return Response(
                {"detail": "Validation error", "errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Error creating faculty: {str(e)}")
            return Response(
                {"detail": "Error creating faculty."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class FacultyDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, slug):
        try:
            faculty = Faculty.get_by_slug(slug)
            serializer = FacultySerializer(faculty)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error retrieving faculty: {str(e)}")
            return Response(
                {"detail": "Error retrieving faculty."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def put(self, request, slug):
        try:
            faculty = Faculty.get_by_slug(slug)
            serializer = FacultySerializer(faculty, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Faculty.DoesNotExist:
            raise NotFound("Faculty not found.")
        except ValidationError as e:
            logger.warning(f"Validation error: {str(e)}")
            return Response(
            {"detail": "Validation error", "errors": e.detail},
            status=status.HTTP_400_BAD_REQUEST
        )
        except Exception as e:
            logger.error(f"Error updating faculty: {str(e)}")
            return Response(
            {"detail": "Error updating faculty."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    def patch(self, request, slug):
        try:
            faculty = Faculty.get_by_slug(slug)
            serializer = FacultySerializer(faculty, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Faculty.DoesNotExist:
            raise NotFound("Faculty not found.")
        except ValidationError as e:
            logger.warning(f"Validation error: {str(e)}")
            return Response(
                {"detail": "Validation error", "errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Error updating faculty: {str(e)}")
            return Response(
                {"detail": "Error updating faculty."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, slug):
        try:
            faculty = Faculty.get_by_slug(slug)
            faculty.delete()
            return Response(
                {"detail": "Faculty successfully deleted."},
                status=status.HTTP_204_NO_CONTENT
            )
        except Faculty.DoesNotExist:
            raise NotFound("Faculty not found.")
        except Exception as e:
            logger.error(f"Error deleting faculty: {str(e)}")
            return Response(
                {"detail": "Error deleting faculty."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
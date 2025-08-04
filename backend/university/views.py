# university/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from .models import University
from .serializers import UniversitySerializer
import logging
import traceback  


# Set up logging
logger = logging.getLogger(__name__)





class UniversityGetAPIView(APIView):
    """
    List all universities.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            universities = University.objects.all().order_by('name')
            if not universities.exists():
                return Response(
                    {"detail": "No universities found."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = UniversitySerializer(universities, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error retrieving universities: {str(e)}")
            return Response(
                {"detail": "An error occurred while retrieving universities."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UniversityCreateAPIView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not request.data:
            return Response(
                {"detail": "No data provided."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            print("Request data:", request.data)  # Debug log
            serializer = UniversitySerializer(data=request.data, context={'request': request})
            print("Serializer data:", serializer.initial_data)  # Debug log
            serializer.is_valid(raise_exception=True)
            print("Serializer validated data:", serializer.validated_data)  # Debug log
            instance = serializer.save(owner=request.user)
            print("Created instance:", instance)  # Debug log
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except ValidationError as e:
            logger.warning(f"Validation error creating university: {str(e)}")
            return Response(
                {"detail": "Validation error", "errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except IntegrityError as e:
            logger.error(f"Integrity error creating university: {str(e)}")
            return Response(
                {"detail": "A university with this name already exists."},
                status=status.HTTP_409_CONFLICT
            )
        except Exception as e:
            logger.error(f"Error creating university: {str(e)}")
            logger.error(traceback.format_exc())  # This will log the full traceback
            return Response(
                {
                    "detail": "An error occurred while creating the university.",
                    "error": str(e)  # Include the actual error message
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UniversityRetrieveAPIView(APIView):
    """
    Retrieve a university instance by slug.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, slug):
        try:
            university = University.get_by_slug(slug)
            serializer = UniversitySerializer(university)
            return Response(serializer.data)
        except University.DoesNotExist:
            logger.warning(f"University not found with slug: {slug}")
            return Response(
                {"detail": "University not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error retrieving university {slug}: {str(e)}")
            return Response(
                {"detail": "An error occurred while retrieving the university."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UniversityUpdateAPIView(APIView):
    """
    Update a university instance.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_university(self, slug):
        try:
            return University.get_by_slug(slug)
        except University.DoesNotExist:
            logger.warning(f"University not found for update: {slug}")
            raise NotFound(detail="University not found.")

    def put(self, request, slug):
        if not request.data:
            return Response(
                {"detail": "No data provided for update."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            university = self.get_university(slug)
            serializer = UniversitySerializer(instance=university, data=request.data, partial=False)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
            
        except ValidationError as e:
            logger.warning(f"Validation error updating university {slug}: {str(e)}")
            return Response(
                {"detail": "Validation error", "errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except NotFound as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error updating university {slug}: {str(e)}")
            return Response(
                {"detail": "An error occurred while updating the university."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def patch(self, request, slug):
        if not request.data:
            return Response(
                {"detail": "No data provided for partial update."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            university = self.get_university(slug)
            serializer = UniversitySerializer(instance=university, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
            
        except ValidationError as e:
            logger.warning(f"Validation error in partial update for university {slug}: {str(e)}")
            return Response(
                {"detail": "Validation error", "errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except NotFound as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error in partial update for university {slug}: {str(e)}")
            return Response(
                {"detail": "An error occurred while partially updating the university."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UniversityDeleteAPIView(APIView):
    """
    Delete a university instance.
    """
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, slug):
        try:
            university = University.get_by_slug(slug)
            university_name = university.name  # Store name for logging before deletion
            university.delete()
            logger.info(f"University '{university_name}' (slug: {slug}) deleted by user {request.user.id}")
            return Response(
                {"detail": "University successfully deleted."},
                status=status.HTTP_204_NO_CONTENT
            )
            
        except University.DoesNotExist:
            logger.warning(f"Attempted to delete non-existent university: {slug}")
            return Response(
                {"detail": "University not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error deleting university {slug}: {str(e)}")
            return Response(
                {"detail": "An error occurred while deleting the university."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Program
from .serializers import ProgramSerializer


# List all programs
class ProgramListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            programs = Program.objects.all()
            serializer = ProgramSerializer(programs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create a new program
class ProgramCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProgramSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # serializer.save(owner=request.user)  # Temporarily commented to break migration cycle
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve a single program
class ProgramRetrieveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'detail': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = ProgramSerializer(program)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Update a program
class ProgramUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'detail': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = ProgramSerializer(program, data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'detail': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = ProgramSerializer(program, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete a program
class ProgramDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        try:
            program = Program.objects.get(slug=slug)
        except Program.DoesNotExist:
            return Response({'detail': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            program.delete()
            return Response({'detail': 'Program deleted.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



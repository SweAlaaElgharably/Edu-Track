from rest_framework.permissions import BasePermission

class GroupPermission(BasePermission):
    required_permission = None 
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if not self.required_permission:
            return False
        return request.user.groups.filter(
            permissions__codename=self.required_permission.split(".")[1],
            permissions__content_type__app_label=self.required_permission.split(".")[0]
        ).exists()

from django.apps import AppConfig

class AwalluserConfig(AppConfig):
    name = 'awalluser'

    def ready(self):
        import awalluser.models

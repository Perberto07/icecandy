from rest_framework import serializers
from icecandy.models import customer

class customerSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    phone = serializers.CharField(max_length=15)
    address = serializers.CharField(required=False, allow_blank=True, max_length=100)
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.name = validated_data.get('title', instance.title)
        instance.phone = validated_data.get('linenos', instance.linenos)
        instance.address = validated_data.get('language', instance.language)
        instance.save()
        return instance
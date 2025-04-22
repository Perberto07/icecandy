from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from icecandy.models import customer
from icecandy.serializers import customerSerializer

@csrf_exempt
def customer_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        candy = customer.objects.all()
        serializer = customerSerializer(candy, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = customerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def customer_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        candy = customer.objects.get(pk=pk)
    except customer.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = customerSerializer(candy)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = customerSerializer(candy, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        candy.delete()
        return HttpResponse(status=204)
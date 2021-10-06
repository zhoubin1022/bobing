import json
import os
import random
import re
from pathlib import Path

from django.core import serializers
from django.http import JsonResponse, HttpResponse
from boBingModel.models import Player, Record
from bobing import settings

rules = [
    "114444",  # 状元插金花 0
    "444444",  # 六杯红 1
    "111111",  # 遍地锦 2
    "222222|333333|555555|666666",  # 六杯黑 3
    "144444|244444|344444|444446",  # 五红 4
    "111116|222226|333336|555556|111115|222225|333335|566666\
    |111114|222224|333334|455555|466666111113|222223|355555|366666\
    |111112|233333|255555|266666122222|133333|155555|166666",  # 五子登科 5
    "[^4]*[4]{4}[^4]*",  # 四点红 6
    "123456",  # 对堂 7
    "[^4]*[4]{3}[^4]*",  # 三红 8
    "[1-6]*[^4]{4}[1-6]*",  # 四进 9
    "[^4]*[4]{2}[^4]*",  # 二举 10
    "[^4]*[4]{1}[^4]*",  # 一秀 11
]


def doRandom():
    ran = []
    for i in range(6):
        ran.append(random.randint(1, 6))
    return ran


def judge(request):
    if request.method == 'GET':
        result = {"message": 'success', "data": []}
        ran = doRandom()
        result["data"].append({})
        for i in range(len(ran)):
            result["data"][0][f"num_{i+1}"] = ran[i]
        ran.sort()
        ran_str = ''
        for i in ran:
            ran_str = ran_str + str(i)
        level = 12
        for x in range(len(rules)):
            re_str = rules[x]
            if re.compile(re_str).match(ran_str):
                level = x
                break
        result["data"][0]["level"] = level
        # print(result_ran)
        # print(level)
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})


def allPlayer(request):
    # 获取全部玩家信息
    if request.method == 'GET':
        result = {"message": 'success', "data": []}
        users = Player.objects.all()
        result["data"] = serializers.serialize('python', users)
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})


def addPlayer(request):
    # 添加玩家
    if request.method == 'POST':
        photo = request.FILES['photo']
        name = request.POST.get('name')
        users = Player.objects.filter(name__exact=name)
        if users.exists():
            return JsonResponse({"message": '该昵称已存在'})
        if photo:
            file_info, suffix = os.path.splitext(photo.name)
            if suffix.upper() not in ['.JPG', '.JPEG', '.PNG']:
                return JsonResponse({"message": '图片格式不正确，只接受jpg、jpeg、png格式的图片'})
            path = os.path.join(settings.BASE_DIR, 'media')
            path = os.path.join(path, 'photos')
            path = os.path.join(path, photo.name)
            if os.path.exists(path):
                os.remove(path)
                print("remove")
        new_player = Player(name=name, photo=photo)
        new_player.save()
        new_user = Player.objects.filter(name__exact=name)
        return JsonResponse({"message": 'success', "data": serializers.serialize('python', new_user)})
    return JsonResponse({"message": 'wrong'})


def editPlayer(request):  # 编辑玩家信息
    if request.method == 'POST':
        photo = request.FILES['photo']
        name = request.POST.get('name')
        uid = request.POST.get('id')
        users = Player.objects.filter(name=name)
        # return JsonResponse({"message": 'success', "data": serializers.serialize('python', users)})
        if users.exists():
            for user in users:
                if not (user.id == uid):
                    return JsonResponse({"message": '该昵称已存在'})
        users = Player.objects.get(id=uid)
        if photo:
            photo_info, suf = os.path.splitext(photo.name)
            if suf.upper() not in ['.JPG', '.JPEG', '.PNG']:
                return JsonResponse({"message": '图片格式不正确'})
            path = os.path.join(settings.BASE_DIR, 'media')
            path = os.path.join(path, 'photos')
            path = os.path.join(path, photo.name)
            if not os.path.exists(path):
                users.photo = photo
            users.name = name
            users.save()
            users = Player.objects.filter(name__exact=name)
            return JsonResponse({"message": 'success', "data": serializers.serialize('python', users)})
    return JsonResponse({"message": 'wrong'})


def deletePlayer(request):
    # 删除玩家
    if request.method == 'POST':
        uid = request.POST.get('id')
        users = Player.objects.get(id=uid)
        users.delete()
        return JsonResponse({"message": 'success'})
    return JsonResponse({"message": 'wrong'})


def partPlayer(request):
    # 模糊查询玩家
    if request.method == 'POST':
        part_name = request.POST.get('str')
        result = {"message": 'success', "data": []}
        users = Player.objects.filter(name__contains=part_name)
        result["data"] = serializers.serialize('python', users)
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})


def allRecord(request):
    if request.method == 'POST':
        uid = request.POST.get('id')
        records = Record.objects.filter(uid__exact=uid)
        result = {"message": 'success', "data": serializers.serialize('python', records)}
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})


def addRecord(request):  # 添加记录
    if request.method == 'POST':
        pid = request.POST.get('pid')
        lun = request.POST.get('lun')
        num = request.POST.get('num')
        level = request.POST.get('level')
        uid = request.POST.get('uid')
        # 修改玩家最高奖项
        user = Player.objects.get(id=uid)
        if (not user.level) or user.level > int(level):
            user.level = level
            user.save()
        new_record = Record.objects.create(pid=pid, round=lun, playerNum=num, nowLevel=level, uid_id=uid)
        # new_record = Record(int(pid), int(lun), int(num), int(level), uid_id=user.pk)
        new_record.save()
        records = Record.objects.filter(pid=pid).filter(uid_id=uid)
        return JsonResponse({"message": 'success', "data": serializers.serialize('python', records)})
    return JsonResponse({"message": 'wrong'})


def allRank(request):
    # 返回排行榜
    if request.method == 'GET':
        result = {"message": 'success', "data": []}
        users = Player.objects.filter(level__isnull=False).order_by('level')
        for user in users:
            user_rank = {"name": user.name, "level": user.level}
            result["data"].append(user_rank)
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})


def nowRank(request):
    if request.method == 'POST':
        pid = request.POST.get('id')
        result = {"message": 'success', "data": []}
        records = Record.objects.filter(pid=pid).order_by('nowLevel')
        for record in records:
            user_rank = {}
            user = Player.objects.get(id=record.uid_id)
            user_rank["name"] = user.name
            user_rank['level'] = record.nowLevel
            result["data"].append(user_rank)
        return JsonResponse(result)
    return JsonResponse({"message": 'wrong'})

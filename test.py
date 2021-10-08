import json

import requests

host = "http://37446r369t.zicp.vip"
POST = "POST"
GET = "GET"
DELETE = "DELETE"
PUT = "PUT"
headers = {'content-Type': 'application/json', 'Accept': '*/*'}


def test(method, url, Files=None, data=None):
    url = host + url
    if method == GET:
        response_data = requests.get(url, headers=headers)
    else:
        if files:
            response_data = requests.post(url, files=Files, data=data, headers=headers)
        else:
            response_data = requests.post(url, data=data, headers=headers)
    response_data = response_data.content.decode("utf-8")
    if response_data.find("\"message\": \"success\"") != -1:
        print(url + " 成功！")
    else:
        print(url + " 失败！ " + response_data)


# Player相关接口
files = {'photo': ('rule.png', open('rule.png', 'rb'), 'image/png', {})}
# allPlayer
test(GET, "/usr/allPlayer")
# addPlayer
test(POST, "/usr/addPlayer", Files=files, data={'name': "admin"})
# editPlayer
test(POST, "/usr/editPlayer", Files=files, data={'new_photo': 1, 'name': "admin", 'id': 12})
# deletePlayer
test(POST, "/usr/deletePlayer", data={'id': 12})
# partPlayer
test(POST, "/usr/partPlayer", data={'str': "u"})

# judge
test(GET, "/game/judge")

# record
# addRecord
test(POST, "/record/addRecord", data={'pid': 3, 'lun': 3, 'num': 7, 'level': 12, 'uid': 11})
# allRecord
test(POST, "/record/allRecord", data={'id': 11})

# rank
# allRank
test(GET, "rank/allRank")
# nowRank
test(POST, "/rank/nowRank", data={'id': 1})
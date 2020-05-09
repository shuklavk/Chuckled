from flask import Flask, request, redirect, session, url_for, Response, json
from flask.json import jsonify
import json
import os
import random
import time
import requests
from pymongo import MongoClient
from pprint import pprint
from google.cloud import datastore
from google.cloud import vision

app = Flask(__name__)
app.config.from_object(__name__)



datastore_client = datastore.Client.from_service_account_json('gc.json')

with open('credentials.json', 'r') as f:
    creds = json.load(f)

mongostr = creds["mongostr"]
client = MongoClient(mongostr)

db = client["jokes"]

def get_top_labels(uri):
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    # imageurl = "https://storage.googleapis.com/hacklarious/testimage.jpg"
    
    client = vision.ImageAnnotatorClient.from_service_account_json('gc.json')
    image = vision.types.Image()
    image.source.image_uri = uri

    response = client.label_detection(image=image)
    labels = response.label_annotations
    # print('Labels:')

    i = 0

    keywords = []
    for label in labels:
        print(label.description)
        keywords.append(label.description)
        i = i + 1
        if i == 3:
            break


    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    if len(keywords) == 0:
        keywords.append("random")
    return keywords



@app.route("/labelanimage", methods=['POST'])
def labels():

    print(request)

    res = request.get_json()
    print (res)

    resraw = request.get_data()
    print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()
    imageurl = res["imgurl"]
    labels = get_top_labels(imageurl)

    status = {}
    status["server"] = "up"
    status["message"] = "some random message here"
    status["request"] = res 
    status["results"] = labels

    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp




@app.route("/dummyJson", methods=['GET', 'POST'])
def dummyJson():

    print(request)

    res = request.get_json()
    print (res)

    resraw = request.get_data()
    print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()
 

    status = {}
    status["server"] = "up"
    status["message"] = "some random message here"
    status["request"] = res 

    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp


@app.route("/dummy", methods=['GET', 'POST'])
def dummy():

    ##res = request.json

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(js, status=200, mimetype='text/html')
    ##resp.headers['Link'] = 'http://google.com'

    return resp

@app.route("/api", methods=["GET"])
def index():
    if request.method == "GET":
        return {"hello": "world"}
    else:
        return {"error": 400}


# if __name__ == "__main__":
#     app.run(debug=True, host = 'localhost', port = 8002)
#     # app.run(debug=True, host = '52.116.36.178', port = 8001)

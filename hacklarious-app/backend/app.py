from flask import Flask, request

app = Flask(__name__)

@app.route("/api", methods={"GET"})
def index():
    if request.method == "GET":
        return {"hello": "world"}
    else:
        return {"error": 400}
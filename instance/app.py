from flask import Flask
import requests
import subprocess
app = Flask(__name__)

# Instance needs to say "hi" to central server (Loop-Streamer-Web)
# This needs to happen when the server starts
# After handshake, Loop-Streamer-Web will send API requests, e.g. /copyConfig


def instanceSaysHi():
  domain = "https://63-250-57-43.cloud-xip.io:5000"                          # This could be .env
  url = domain + "/instance/welcome"
  hostname = subprocess.check_output("hostname")
  hostname = hostname[:-1]
  reqBody = {
    "hi": ":)",
    "name": hostname
  }
  answer = requests.post(url, json=reqBody, verify=False)
  print("Answer: ", answer.json())

# Instance will attempt to say Hi to server
instanceSaysHi()


# This is for testing Flask only
@app.route('/hello')
def hello_world():
  return 'Hello World! :)'

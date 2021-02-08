from flask import Flask, json, request
from functions import *
app = Flask(__name__)

# Instance needs to say "hi" to central server (Loop-Streamer-Web)
# This needs to happen when the server starts
# After handshake, Loop-Streamer-Web will send API requests, e.g. /copyConfig

# Instance will attempt to say Hi to server
#instanceSaysHi()
# Instance will start streaming
#startStreaming()

# Connection keep-alive route
@app.route('/are-you-here')
def are_you_still_here():
  return "yes"

# Receive config route
@app.route('/receive-config', methods=["POST"])
def receiveConfigRoute():
  success = processConfig()
  if (success):
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
  else:
    return json.dumps({'success':False}), 500, {'ContentType':'application/json'} 



# This is for testing Flask only
@app.route('/hello')
def hello_world():
  return 'Hello World! :)'

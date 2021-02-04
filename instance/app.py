from flask import Flask
from functions import *
app = Flask(__name__)

# Instance needs to say "hi" to central server (Loop-Streamer-Web)
# This needs to happen when the server starts
# After handshake, Loop-Streamer-Web will send API requests, e.g. /copyConfig

# Instance will attempt to say Hi to server
instanceSaysHi()
# Instance will start streaming
startStreaming()

# Connection keep-alive route
@app.route('/are-you-here')
def are_you_still_here():
  return "yes"

# This is for testing Flask only
@app.route('/hello')
def hello_world():
  return 'Hello World! :)'

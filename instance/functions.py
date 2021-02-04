import subprocess
import requests

def instanceSaysHi():
  domain = "https://63-250-57-43.cloud-xip.io:5000"                          # This could be .env
  url = domain + "/instance/welcome"
  hostname = subprocess.check_output("hostname")
  hostname = hostname[:-1]
  # We should say domain name somehow
  reqBody = {
    "hi": ":)",
    "name": hostname
  }
  answer = requests.post(url, json=reqBody, verify=False)
  print("Answer: ", answer.json())


def startStreaming():
  videoResult = subprocess.check_output(["service", "video", "start"])
  mainResult = subprocess.check_output(["service", "main", "start"])
  result = None
  if (len(videoResult) == 0 and len(mainResult) == 0):
    result = "OK"
  else:
    result = "ERROR" + videoResult + mainResult
  domain = "https://63-250-57-43.cloud-xip.io:5000"
  url = domain + "/instance/started-streaming"
  reqBody = {
    "startedStreaming": result
  }
  requests.post(url, json=reqBody, verify=False)

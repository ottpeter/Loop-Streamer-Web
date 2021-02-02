#!/bin/bash
# flask settings
source /root/instance/bin/activate
export FLASK_APP=/root/instance/app.py
export FLASK_DEBUG=0

flask run --host=0.0.0.0 --port=80

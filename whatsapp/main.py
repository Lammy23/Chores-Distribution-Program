from flask import Flask, request
from flask_cors import CORS
from pywhatkit import sendwhatmsg_to_group
from datetime import date, datetime

app = Flask(__name__)
CORS(app)
now = datetime.now()
group_id = 'FVF4lHsQtcQC2stmHr3gX2'
def construct_message(allChores):
    message = ''
    for chores in allChores:
        message += f"{chores['day']}\n"
        message += f"sweeping and mopping: {chores['sweepingAndMopping']}\n"
        message += f"cleaning cooker: {chores['cleaningCooker']}\n"
        message += f"washing: {chores['washing']}\n"
        message += f"rinsing: {chores['rinsing']}\n"
        message += "\n"
    return message

def increment_time(current_time):
    minute = current_time.minute
    hour = current_time.hour
    
    if minute >= 59:
        hour += 1
        minute = 0
    else:
        minute += 1
    
    return {'minute': minute, 'hour': hour}

@app.route('/')
def index():
    return 'Whatsapp Message Sender'

@app.post('/send')
def whatsapp():
    # get the object, build a string, send the string to the group chat, 
    # return a positive message if successful, else return a negative message.
    data = request.json
    constructed_message = construct_message(data)
    # Send data to the group chat using pywhatkit
    current_time = increment_time(now)
    sendwhatmsg_to_group(group_id=group_id, message=constructed_message, time_hour=current_time['hour'], time_min=current_time['minute'], wait_time=10)
    return ''

app.run()
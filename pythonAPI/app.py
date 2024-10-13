from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
import os
import io
import base64
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route('/pythonAPI/graph', methods=['POST'])
def generate_graph():
    data = request.get_json()
    # used for selection, get data only for exercises that have that title
    title = [record['title'] for record in data]

    # todo: select time, reps, and weight only from records that have the title and parse time
    time = [record['updatedAt'] for record in data]
    reps = [record['reps'] for record in data]
    weight = [record['weight'] for record in data]
    print(f"Data: {data}")
    
    # formula for one rep max used for tracking progress
    # final array for weight
    oneRepMax = weight / ( 1.0278 - 0.0278 * reps )

    # array to sync one rep max and time of workout

    workouts = np.column_stack((time, oneRepMax))

    plt.figure()
    plt.plot(x_data, oneRepMax, marker='o')
    plt.title('Line Graph')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')

    return jsonify({'title': title})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
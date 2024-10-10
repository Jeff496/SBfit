from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
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
    print(f"Data: {data}")
    sets = [record['sets'] for record in data]
    reps = [record['reps'] for record in data]
    weight = [record['weight'] for record in data]

    plt.figure()
    plt.plot(reps, weight, marker='o')
    plt.title('reps and weight')
    plt.xlabel(reps)
    plt.ylabel(weight)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    # Encode the image to base64
    graph_image = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()

    return jsonify({'graph': 'graphhhhhh'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
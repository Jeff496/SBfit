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
    

    return jsonify({'graph': 'request sent'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
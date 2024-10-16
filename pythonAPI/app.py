from flask import Flask, request, send_file
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
from datetime import datetime
import io
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
matplotlib.use('Agg')


@app.route('/pythonAPI/graph', methods=['POST'])
def generate_graph():
    data = request.get_json()

    # Get workout title for graph name
    title = f'{data[0]['title']} progress'
    
    # final time used
    isoTime = [record['updatedAt'] for record in data]
    time = [datetime.fromisoformat(record.replace("Z", "+00:00")) for record in isoTime]
    # print(f'time: {time}')

    #retrieve weight
    reps = [record['reps'] for record in data]
    weights = [record['weight'] for record in data]
    
    # formula for one rep max used for tracking progress
    # final array for weight
    oneRepMax = [weight / (1.0278 - 0.0278 * rep) for weight, rep in zip(weights, reps)]
    # print(f'orm', oneRepMax)

    plt.figure(figsize=(10, 5))
    plt.plot(time, oneRepMax, marker='o')
    plt.title(title)
    plt.xlabel('Date')
    plt.ylabel('Calculated One Rep Max')
    plt.xticks(rotation=45)
    plt.grid()

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
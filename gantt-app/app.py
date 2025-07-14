from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    with open("data.json", "w") as f:
        json.dump(data, f)
    return jsonify({"message": "Data received!"})

@app.route('/data')
def get_data():
    with open("data.json", "r") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

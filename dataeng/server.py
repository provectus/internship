from flask import Flask, request, jsonify
from processed_data.process_data import processing

processor = processing('02-src-data','processed_data')

app = Flask(__name__)
host = '127.0.0.1'
port = 5000

@app.route("/data", methods=['POST'])
def process_data():
    processor.combine()
    return jsonify("Data has been processed!")

@app.route("/data", methods=['GET'])
def filter():
    is_image = request.args.get('is_image_exists', -1)
    min_age = request.args.get('min_age', -1)
    max_age = request.args.get('max_age', -1)
    if is_image == True:
        is_image = 1
    else:
        is_image == 0
    filtered = processor.filter_data(is_image,min_age,max_age)
    return jsonify(filtered)
    

if __name__ == '__main__':
    app.run(host=host, port=port, debug=True)
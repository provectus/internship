import psycopg2
import pandas as pd
from pathlib import Path
import os
from datetime import datetime
from flask import Flask
from flask_restful import Resource, Api
import json
from flask import Blueprint, jsonify
import collections
import traceback

rsc_occupied = False
app = Flask(__name__)
# api = Api(app)
# data_processing_bp = Blueprint("post", __name__)
# get_bp = Blueprint("get", __name__)

@app.route('/', methods=['GET'])
def get():
    global rsc_occupied
    try:
        if rsc_occupied:
            return "Database is being processed\nTry again later!"

        conn = psycopg2.connect(
        host="localhost",
        database="internship",
        user="postgres",
        password="postgres", port=5432)

        cur = conn.cursor()

        cur.execute("SELECT * FROM output;")
        
        output_list = cur.fetchall()
        return jsonify(output_list)
    except Exception as e:
        return "An error occured while trying to fetch data from database:\n{}".format(str(e))

@app.route('/', methods=['POST'])
def data_processing():
    global rsc_occupied
    try:
        rsc_occupied = True    
        script_path = os.path.realpath(__file__)
        root_dir = str(Path(script_path).parent.absolute())
        csv_files = []
        png_files = []

        for root, dirs, files in os.walk(root_dir+"\\02-src-data"):
            for file in files:
                if file.endswith(".png"):
                    png_files.append(file)
                elif file.endswith(".csv"):
                    csv_files.append(file)
            break

        os.makedirs(root_dir+"\\processed_data", exist_ok=True)
        output_df = pd.DataFrame(
            columns=["user_id", "first_name", "last_name", "birthts", "img_path"])

        for i in range(len(csv_files)):
            user_raw_info = pd.read_csv(root_dir+"\\02-src-data\\"+csv_files[i])
            user_raw_info.rename(lambda str: str.replace(
                " ", ""), axis='columns', inplace=True)
            user_raw_info['last_name'] = user_raw_info['last_name'].apply(lambda str: str.replace(
                " ", ""))
            user_raw_info["img_path"] = [root_dir+"\\02-src-data\\" + png_files[i]]
            user_raw_info.insert(0, 'user_id', csv_files[i].replace(".csv", ""))
            output_df = output_df.append(user_raw_info)

        output_df.reset_index(inplace=True, drop=True)
        output_df.to_csv(root_dir+"\\processed_data\\output.csv", index=False)

        conn = psycopg2.connect(
            host="localhost",
            database="internship",
            user="postgres",
            password="postgres", port=5432)

        cur = conn.cursor()

        cur.execute("DROP TABLE IF EXISTS output")

        cur.execute("CREATE TABLE output (id SERIAL PRIMARY KEY, user_id INT NOT NULL UNIQUE, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, births TIMESTAMP NOT NULL, img_path VARCHAR(100));")

        for row in output_df.iloc:
            cur.execute("INSERT INTO output (user_id, first_name, last_name, births, img_path) VAlUES ({},\'{}\',\'{}\',\'{}\', \'{}\');".format(
                row[0], row[1], row[2], datetime.fromtimestamp(row[3]/1000.0), row[4]))

        conn.commit()
        cur.close()
        conn.close()
        rsc_occupied = False
        return "Processed data:\n\n{}".format(output_df.to_json(orient='records', lines=True))
    except Exception as e:
        rsc_occupied = False
        traceback.print_exc()
        return "An error occured while processing data\nTry again later\nError details:{}".format(str(e))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=False)


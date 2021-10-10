# Jupiter notebook was used for running the following code.

import time
from datetime import datetime

from http.server import BaseHTTPRequestHandler, HTTPServer
import time

import csv

import pandas as pd

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def process_data(self):

        def get_url(position):
            return ('https://raw.githubusercontent.com/provectus/internship/main/dataeng/02-src-data/' \
                    + str(position) + '.csv')


        def get_data():
            data = {'user_id': [], 'first_name': [], 'last_name': [], 'birthts': [], 'img_path': []}

            for position in range(1000, 1100):
                temp_df = pd.read_csv(get_url(position))

                user_id = position
                first_name = temp_df.loc[0, 'first_name']
                last_name = temp_df.loc[0, ' last_name']
                birthts = temp_df.loc[0, ' birthts']
                img_path = 'https://github.com/provectus/internship/' \
                            + 'blob/main/dataeng/02-src-data/' + str(user_id) + '.png'


                data['user_id'].append(user_id)
                data['first_name'].append(first_name)
                data['last_name'].append(last_name[1:])
                data['birthts'].append(birthts)
                data['img_path'].append(img_path)

            return data


        All_Data = pd.DataFrame(get_data(), columns=['user_id', 'first_name', 'last_name', 'birthts', 'img_path'])

        return All_Data


    def get_records(self):
        out = self.process_data()
        min_age = 10
        max_age = 60
        image_exists = True

        filtered_out = out[out['birthts'] / 1000 / 60 / 60 / 24 / 365 >= min_age]
        filtered_out = filtered_out[filtered_out['birthts'] / 1000 / 60 / 60 / 24 / 365 <= max_age]
        filtered_out = filtered_out[filtered_out['img_path'] != None]

        filtered_out = filtered_out.to_json(orient='records')

        with open('output.json', 'w') as file:
            file.write(filtered_out)



    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

        self.wfile.write(bytes("<p>Usage:</p>", "utf-8"))
        self.wfile.write(bytes("<p>1) 'GET' for getting all images in json</p>", "utf-8"))
        self.wfile.write(bytes("<p>2) 'POST' to run data processing</p></p>", "utf-8"))

        self.wfile.write(bytes("<html><head><title>https://DaraProcessing</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        self.wfile.write(bytes("<body>", "utf-8"))

        if self.path == '/GET':
            self.wfile.write(bytes("<p>Data is processing...</p>", "utf-8"))
            self.get_records()
            self.wfile.write(bytes("<p>The data was posted to output.json</p>", "utf-8"))

        elif self.path == '/POST':
            self.process_data()

        self.path = ""



def main():
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")


if __name__ == '__main__':
    main()

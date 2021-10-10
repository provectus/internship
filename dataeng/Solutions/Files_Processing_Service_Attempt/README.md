The results are implemented as a service.

The service implements web server which can:
* Update Data
* Upload Data to .json format file

process_data() is used to update data about users and return dataframe with all information

get_records() is used to filter the results and export data to output.json file

Web server has two endpoints:
/GET - to put data to .json
/POST - to manually run processing of the data.
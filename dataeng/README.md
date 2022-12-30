Name: Truong Nguyen
Innopolis University

## Level 1
level1.py

1. Find the current directory
2. Create processed_data folder (if not exist)
3. Read all png and csv files
4. Do some data preprocessing (remove " " from columns' names and data)
5. Append corresponding path of each png image to csv files
6. Aggregate all those csv files into one single output.csv
 
 
## Level 2
level2.py

1. Same as level 1
2. Encapsulate level 1 into processing_data function
3. Add new function to fetch data from database
4. Register them to flask restful api
5. Command to send POST and GET requests:

	curl -X POST http://127.0.0.1:80/
	curl -X GET http://127.0.0.1:80/
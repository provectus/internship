## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
* Mention the advantages and disadvantages of bash scripts<br />

 Advantages: <br />

1- Quick writting the scripts <br />
2- Quick start <br />
3- Interactive debugging <br /> 

 Disadvantages:<br />

1- Sensitive syntax <br />
2- Execution speed is low in most cases <br />

* What types of variables are used in bash?<br />

1- System-Defined Variables<br />
2- User-Defined Variables

* What is pipes in shell script and how to use it? <br />

The pipe character | is used to connect the output from one command to the input of another.<br />
You can make it do so by using the pipe character ‘|’. (ex: the commands in the next question)
* How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?<br />
`cat filename.csv | cut -f2 -d , | sort | uniq`

## Task
Create script which provide aggregated information about analysises and they datasets. Information about each analysis/deployment could be retrieved from `awscli.sh`:
``` bash
./awscli.sh get_analysis <analysis_name>
./awscli.sh get_dataset <dataset_id>
```
This command returns a JSON object with the required information.
``` bash
./awscli.sh get_analysis some-analysis
{
        "analysisId": "c29tZS1hbmFseXNpcwo=",
        "datasetsIds": [
                "Zmlyc3REYXRhc2V0Cg==",
                "c2Vjb25kRGF0YXNldAo="
        ]
}
```
``` bash
./awscli.sh get_dataset Zmlyc3REYXRhc2V0Cg==
{
	"datasetId": "Zmlyc3REYXRhc2V0Cg=="
	"name": "firstDataset"
	"datasetArn": "arn:us-west-2:reports:dataset/Zmlyc3REYXRhc2V0Cg=="
}
```
As a result, your script should respond with a JSON object similar to the next object:
``` json
{
        "analysises": {
                "<analysis_name>": {
                        "datasetsCount": <number-of-used-datasets>
                        "datasets": [
                                {
                                        "arn": "<arn-of-dataset>",
                                        "name": "<name-of-dataset>"
                                }
                        ]
		}
        }
}
```
### Inputs
Need to provide aggregated information for next analysis: `users, billings, usage reports`
## How to
If you use OS different than macOS/Linux need to use Docker to launch your script:
``` bash
docker run -it -rm -v <path-to-this-folder>:/src -w /src --entrypoint bash cfmanteiga/alpine-bash-curl-jq --  <your-script>
```

### Solution
The code solution is in the file `mycode.sh` you can run it using the command `./mycode.sh get_all_info` while `get_all_info` is the main function in my code<br />
the code has the input inside a list, and the output is:


``` json
{
        "analysises":{

                "users": {
                       "datasetsCount":2
                        "datasets":[
                                        {
                                                "arn": "us-west-2epotsdtset/Zmlyc3REYXRhc2V0Cg==",
                                                 "name": "firstDataset"
                                        }
                                        {
                                                "arn": "us-west-2epotsdtset/c2Vjb25kRGF0YXNldAo=",
                                                 "name": "secondDataset"
                                        }
                       		 ]
                	}

                "billings": {
                       "datasetsCount":2
                        "datasets":[
                                        {
                                                "arn": "us-west-2epotsdtset/Zmlyc3REYXRhc2V0Cg==",
                                                 "name": "firstDataset"
                                        }
                                        {
                                                "arn": "us-west-2epotsdtset/c2Vjb25kRGF0YXNldAo=",
                                                 "name": "secondDataset"
                                        }
                       		 ]
                	}

                "usage reports": {
                       "datasetsCount":2
                        "datasets":[
                                        {
                                                "arn": "us-west-2epotsdtset/Zmlyc3REYXRhc2V0Cg==",
                                                 "name": "firstDataset"
                                        }
                                        {
                                                "arn": "us-west-2epotsdtset/c2Vjb25kRGF0YXNldAo=",
                                                 "name": "secondDataset"
                                        }
                       		 ]
                	}
       	       }
}
``` 

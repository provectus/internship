## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
1. Mention the advantages and disadvantages of bash scripts

Bash scripts are easy to write and understand, they allow to automate frequently used commands. 
They may be executed in any Unix-like operating systems without any modifications.

But bash scripts are not suited for large and complex tasks, also they really syntax sensitive - any extra space may lead to the error.

2. What types of variables are used in bash?

- System-Defined Variables (BASH, BASH_VERSION, COLUMNS, LOGNAME, HOME, OSTYPE, PWD, USERNAME)
- User-Defined Variables


3. What is pipes in shell script and how to use it?

Pipe is a form of redirection; it is used to send the output of one command to another for further processing.

`command_1 | command_2 | command_3 | .... | command_N`

Output of `command_1` goes to `command_2` and so on.

4. How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?

`cat file.csv  | cut -f2 -d , | sort | uniq`

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

The code for the task is in `script.sh`

To run the code use the following command `./script.sh get_information <some-analysis>`, where `some-analysis` is one of the folowing: `users, billings, usage reports`.

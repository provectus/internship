## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
* Mention the advantages and disadvantages of bash scripts

> Advantages:
  > * To automate the frequently performed operations
  > * To run sequence of commands as a single command
  > *  Easy to use
  > *  Portable (It can be executed in any Unix-like operating systems without any modifications)
>
> Disadvantages:
   > * Slow execution speed compared to any programming languages
   > * A new process launched for almost every shell command executed

* What types of variables are used in bash?

>  Global variables and Local variables

* What is pipes in shell script and how to use it?

> Is used to connect the output from one command to the input of another

* How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?

> Smth like this `cat addresses.csv | cut -d ',' -f2 | sort -a`, sorry, I don't have some experience with these kind of things

#

### OMG, IT TAKES THE WHOLE SATURDAY

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

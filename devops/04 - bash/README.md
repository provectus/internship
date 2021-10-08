## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
* Mention the advantages and disadvantages of bash scripts
  * Pros: portable (for UNIX-like system)
  * Cons: untyped, lack of data structures, old language, few people know it, execution speed is low in most cases, need to pay extra attention because it is close to the kernel
* What types of variables are used in bash?
  1. Sytem defined variables (HOME, USERNAME, PWD,...)
  2. Users defined variables
* What is pipes in shell script and how to use it? Pipes connect two commands; It passes the output of one command as input to another command, for instance `sort record.txt | uniq`
* How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?
`sort | cat my_csv.csv | cut -d ',' -f2 | uniq`
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
```
docker run -it --rm -v /home/erklarungsnot/Git/internship/devops/04\ -\ bash:/src -w /src --entrypoint bash cfmanteiga/alpine-bash-curl-jq --  my-script.sh
```
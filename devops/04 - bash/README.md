## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
* Mention the advantages and disadvantages of bash scripts.

Answer: ***Bash shell scripting is used for automation, best to save time and if we run command as bulk. It can be run in any unix-like OS***

***The problem with the bash scripting is that is slow and a seperate process runs at each command that runs in the scrips.***
* What types of variables are used in bash?
Answer: ***there are mainly two types of the bash variables, a: system-defined and b: user-defined variables.***

***System variables are those which are pre-defiend by the OS and is used for OS and the standard convention is UPERCASE letter we can see the list with (printevn, env, set commands ). And in the other hand user variables are those where we create it during the sripting.***

* What is pipes in shell script and how to use it?

Answer: ***Pipes are very useful tools when we want to redirect the output of the a command as input of another command the symbole for pipe is (|)***

* How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?

Answer: ***we can show it using different command below is one of the examples***

```
cat path/to/the/file.csv | cut -f2 -d , | sort | uniq
```



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

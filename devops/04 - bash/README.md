## Prerequsite
* Docker on your local machine to launch testing environment

## Questions
* Mention the advantages and disadvantages of bash scripts

Advantages - high speed and ease of scripting non-difficult task.

Disadvantages - it may have low speed of script execution and hard to write difficult task.

* What types of variables are used in bash?

System and user defined variables. Also there are two data types: character and integer.

* What is pipes in shell script and how to use it?

Pipes are used to redirect stdout of command/application before pipe to stdin of command/application after pipe.
Each command/application will be executed sequentially from first to last separated by pipes.

* How to show unique values of the second column from the CSV comma-separated file and sort results with the alphabet?
``` bash
awk -F "\"*,\"*" FILE.CSV | sort | uniq
```
It won't work for eggs containing comma.
I.e. for row which equal 'substr1,"substr2,substr3",substr4' according to task we have to print 'substr2,substr3',
but this one will print only 'substr2'
In this way I can offer a little C program for print only second column according to task:
``` bash
./print2col FILE.CSV | sort | uniq
```
where print2col is program.c file compiled by gcc (`gcc program.c -o print2col`), and `program.c`:
``` C
#include <unistd.h>
#include <stdlib.h>
#include <fcntl.h>

int main (int argx, char **argy)
{
	char	buf; //buffer for 1 character
	char	sep; //separator
	int	fd; //file descriptor
	int	rd; //state of read execution
	int	notendline;

	buf = 0;
	sep = ',';
	if (argx != 2)
		return (0);
	fd = open(argy[1], O_RDONLY);
	if (fd < 0)
		return (0);
	rd = read(fd, &buf, 1);
	while (rd > 0)
	{
		notendline = 1;
		while (rd > 0 && buf != sep)
		{
			if (buf == '\n')
			{
				notendline = 0;
				break ;
			}
			rd = read(fd, &buf, 1);
		}
		if (notendline)
			rd = read(fd, &buf, 1);
		if (notendline && rd > 0 && buf == '"')
		{
			rd = read(fd, &buf, 1);
			while (rd > 0 && buf != '"')
			{
				if (buf == '\n')
				{
					notendline = 0;
					break ;
				}
				write(1, &buf, 1);
				rd = read(fd, &buf, 1);
			}
			if (rd > 0 && buf == '"')
				rd = read(fd, &buf, 1);
		}
		while (notendline && rd > 0 && buf != sep && buf != '\n')
		{
			write(1, &buf, 1);
			rd = read(fd, &buf, 1);
		}
		while (notendline && rd > 0 && buf != '\n')
			rd = read(fd, &buf, 1);
		if (rd > 0)
		{
			write(1, "\n" ,1);
			rd = read(fd, &buf, 1);
		}
	}
	close(fd);
	return (0);
}
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
docker run -it --rm -v <path-to-this-folder>:/src -w /src --entrypoint bash cfmanteiga/alpine-bash-curl-jq --  <your-script>
```
## Solution
I add `myscript.sh` (without jq) which is working this way:
``` bash
./myscript.sh users
```
And another one file `script.sh` (with jq) which is working the same way:
``` bash
.\script.sh users
```

And each files will display something like this:
``` json
{
	"analysises": {
		"users": {
			"datasetsCount":  2
			"datasets": [
				{
					"arn": "arn:us-west-2:reports:dataset/Zmlyc3REYXRhc2V0Cg==",
					"name": "firstDataset"
				}
				{
					"arn": "arn:us-west-2:reports:dataset/c2Vjb25kRGF0YXNldAo=",
					"name": "secondDataset"
				}
			]
		}
	}
}
```

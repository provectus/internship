#! /bin/bash
ID=$(echo $1 | base64)
DATASETS=$(./awscli.sh get_analysis $1 | jq '.datasetsIds' | jq length)
cat << EOF
{
	"analysises": {
		"${1}": {
			"datasetsCount":  $DATASETS
			"datasets": [
EOF
count=0
while [ $count -lt $DATASETS ]
do
	DATASETID=$(./awscli.sh get_analysis $1 | jq '.datasetsIds['$count']'|xargs)
	cat << EOF
				{
					"arn": $(./awscli.sh get_dataset $DATASETID | jq '.datasetArn'),
					"name": $(./awscli.sh get_dataset $DATASETID | jq '.name')
				}
EOF
	((count++))
done
cat << EOF
			]
		}
	}
}
EOF

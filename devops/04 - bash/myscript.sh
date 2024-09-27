#! /bin/bash
ID=$(echo $1 | base64)
DATASETS=$(./awscli.sh get_analysis $1 |xargs| sed 's/.*datasetsIds\: \[ \(.*\)\].*/\1/'|wc -w)
cat << EOF
{
	"analysises": {
		"${1}": {
			"datasetsCount":  $DATASETS
			"datasets": [
EOF
count=1
while [ $count -le $DATASETS ]
do
	DATASETID=$(./awscli.sh get_analysis users |xargs|\
			sed 's/.*datasetsIds\: \[\(.*\)\].*/\1/'|xargs|\
			awk '{print $('$count')}'|sed 's/,$//')
	cat << EOF
				{
					"arn": "$(./awscli.sh get_dataset $DATASETID |xargs|sed 's/.*datasetArn\: //'|sed 's/ }//')",
					"name": "$(./awscli.sh get_dataset $DATASETID |xargs|sed 's/.*name\: //'|sed 's/, datasetArn.*//')"
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

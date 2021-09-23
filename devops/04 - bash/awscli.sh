#! /bin/bash

get_analysis() {
	ID=$(echo $2 | base64)
	cat << EOF
{
	"analysisId": "${ID}",
	"datasetsIds": [
		"$( echo firstDataset | base64 )",
		"$( echo secondDataset | base64 )"
	]
}
EOF
}

get_dataset() {
        NAME=$(echo $2 | base64 -d)
        cat << EOF
{
	"datasetId": "${2}",
	"name": "${NAME}",
	"datasetArn": "arn:us-west-2:reports:dataset/${2}"
}
EOF
}

$1 $@

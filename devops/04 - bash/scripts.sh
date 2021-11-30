#!/bin/bash

ANALYSIS=$(echo $@ | tr ', ' '\n')
ANALYSIS_OUTPUT=""

for AN in $ANALYSIS;
    do
    DATASET_IDS=$(./awscli.sh get_analysis $AN | jq '.datasetsIds' | jq -r '.[]')
    DS_COUNT=0
    DS_SETS=""
    for ds in $DATASET_IDS;
        do
        ((DS_COUNT+=1))
        DS_DATA=$(./awscli.sh get_dataset $ds)
        DS_ARN=$(echo $DS_DATA | jq -r '.datasetArn')
        DS_NAME=$(echo $DS_DATA | jq -r '.name')
        DS_SETS=$DS_SETS,"{\"arn\": \"$DS_ARN\",\"name\": \"$DS_NAME\"}"
        done
        ANALYSIS_OUTPUT=$ANALYSIS_OUTPUT,"\"$AN\": {\"datasetsCount\": $DS_COUNT, \"datasets\": [$(echo $DS_SETS | cut -c2-)]}"
    done

echo "{\"analysises\": {$(echo $ANALYSIS_OUTPUT | cut -c2-)}}"
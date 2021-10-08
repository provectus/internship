#! /bin/bash

function get_result() {
        cat <<EOF
{
        "analysises": {
                "$i": {
                        "datasetsCount": "$COUNT"
                        "datasets": [
                                {
                                        "arn": "$ARN",
                                        "name": "$NAME"
                                }
                        ]
		}
        }
}
EOF
}

ANALYSIS_NAMES=("users" "billings" "usage reports")

COUNT=1
for i in "${ANALYSIS_NAMES[@]}"; do
        ID=$(./awscli.sh get_analysis $i | jq '.analysisId' | tr -d '"')
        NAME=$(./awscli.sh get_dataset $ID | jq '.name' | tr -d '"')
        ARN=$(bash ./awscli.sh get_dataset $ID | jq '.datasetArn' | tr -d '"')
        echo $(get_result "$i")
        COUNT=$((COUNT + 1))
done

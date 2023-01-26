#! /bin/bash

get_analysis() {
        ID=$(echo $2 | base64)
        cat << EOF
{
        "analysisId": "${ID}",
        "datasetsIds":["$( echo firstDataset | base64 )","$( echo secondDataset | base64 )"]
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

get_all_info() {
	cat << EOF
{
        "analysises":{
EOF
        ANALYSIS_NAMES=("users" "billings" "usage reports")
        for i in "${ANALYSIS_NAMES[@]}"; do
                count=$(get_analysis $i | jq '.datasetsIds | length')
                ID=$(get_analysis $i | jq '.datasetsIds' | tr '[]' ' '  | tr '","' ' ')
                IDS=(${ID// / })
		cat << EOF

                "$i": {
                       "datasetsCount":$count
                        "datasets":[
EOF
j=0

		while [ $j -le $((count-1)) ]
	       	do
			ID1="${IDS[j]}"
			datasetnam1=$(./awscli.sh get_dataset $ID1 | jq '.name' | tr -d '"')
               		ARN1=$(bash ./awscli.sh get_dataset $ID1 | jq '.datasetArn' | tr -d '"' | tr -d '"arn:')
                	datasetnam2=$(./awscli.sh get_dataset $ID2 | jq '.name' | tr -d '"')
       			cat << EOF
                                        {
                                                "arn": "$ARN1",
                                                 "name": "$datasetnam1"
                                        }
EOF
			j=$(( $j + 1 ))
done
		cat << EOF
                       		 ]
                	}
EOF
done
cat << EOF
       	       }
}
EOF
}

$1 $@

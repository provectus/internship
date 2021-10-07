#! /bin/bash

get_information() {
        datasetID=$(./awscli.sh get_analysis $2 | jq '.datasetsIds' | tr '[]' ' '  | tr '","' ' ')
  IDS=(${datasetID// / })
  count=$(./awscli.sh get_analysis $1 |xargs| sed 's/.*datasetsIds\: \[ \(.*\)\].*/\1/'|wc -w)
  cat << EOF

{
        "analysises": {
                "$2": {
                        "datasetsCount": $count
                        "datasets": [
EOF
i=0

    while [ $i -le $((count-1)) ]
           do
      singleID="${IDS[i]}"
             cat << EOF
                                {
                                        "arn": "$(bash ./awscli.sh get_dataset $singleID | jq '.datasetArn' | tr -d '"' | tr -d '"arn:')",
                                        "name": "$(./awscli.sh get_dataset $singleID | jq '.name' | tr -d '"')"
                                }
EOF
      i=$(( $i + 1 ))
done
    cat << EOF
      ]
    }
        }
}
EOF
}
$1 $@
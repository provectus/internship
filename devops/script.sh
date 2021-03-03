#!/bin/bash
# Bash Menu Script Example

PS3='Please enter your choice: '
options=("Encrypt answers" "Decrypt answers" "Bite the tail" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Encrypt answers")
            for f in *\ *; do mv "$f" "${f// /_}"; done
            for file in $(find ./ -type f -name *.answers); do zip -m --password $1 $file.zip $file; done
            for f in *\_*; do mv "$f" "${f//_/ }"; done
            break
            ;;
        "Decrypt answers")
            for f in *\ *; do mv "$f" "${f// /_}"; done
            for file in $(find ./ -type f -name *.zip); do unzip -P $1 $file; done
            for f in *\_*; do mv "$f" "${f//_/ }"; done
            break
            ;;
        "Bite the tail")
            echo "Are you Ouroboros?"
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

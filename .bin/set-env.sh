#!/bin/bash
# Sets environment vars on localhost

ENV_FILE="$(pwd)/.env"

if [ ! -f ${ENV_FILE} ] ; then
	echo "No environment file found"
	exit 1
fi

echo "Setting environment variables:"
echo "====="

content=`cat ${ENV_FILE}`
match='='
repl=' '
q="'"
while read -r line; do
	IFS=' ' read -a lines <<< "${line}"
	for v in ${lines[@]}; do
		newline=${v/$match/$repl}
		IFS=' ' read -a varr <<< "${newline}"
		val=${varr[1]}
		env -i ${varr[0]}="${val//$q/}"
	done
done <<< $content

# while read -r line; do
# 	echo "$line"
# 	# IFS='=' read -a line_array <<< "${line}"
# 	# echo ${line_array[0]}
# 	# echo ${line_array[1]}
# 	echo ''
# 	# env ${line_array[0]}=${line_array[1]}
# done <<< `cat ${ENV_FILE}`

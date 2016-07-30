#!/bin/bash
# Executes a new release of the site

# Get current project version
PACKAGE_FILE="$(pwd)/package.json"
PACKAGE_VERSION=$(cat ${PACKAGE_FILE} \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

read -p "Enter a commit message: " answer
if [ "$answer" = '' ] ; then
	answer="New release"
fi
git add -A;
git commit -m "$answer";
git tag -a $PACKAGE_VERSION -m "v$PACKAGE_VERSION";
git push origin master;
git push origin --tags;
# git push heroku master;

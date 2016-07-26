#!/bin/bash
# Executes a new release of the site

read -p "Enter a commit message: " answer
if [ "$answer" = '' ] ; then
	answer="New release"
fi
git add -A;
git commit -m "$answer";
git push origin master;
git push heroku master;

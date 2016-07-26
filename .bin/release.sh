#!/bin/bash
# Executes a new release of the site

read -p "Enter a commit message: " answer
if [ "$answer" = '' ] ; then
	answer="New release"
fi
git add -A && git commit -m "$answer";

# read year

# if (( ("$year" % 400) == "0" )) || (( ("$year" % 4 == "0") && ("$year" % 100 !=
# "0") )); then
#   echo "$year is a leap year."
# else
#   echo "This is not a leap year."
# fi

# michel ~/test> leaptest.sh
# Type the year that you want to check (4 digits), followed by [ENTER]:
# 2000
# 2000 is a leap year.

#!/bin/bash
# Sets environment vars on localhost

ENV_VARS=`heroku config -s`
ENV_FILE="$(pwd)/.env"

echo "$ENV_VARS" > $ENV_FILE
echo ON_LOCAL=true >> $ENV_FILE

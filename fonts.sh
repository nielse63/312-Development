#!/bin/bash

for f in $(pwd)/assets/fonts/*.ttf
do
	# vars
	BASENAME=${f##*[/|\\]}
	NO_EXTENSION=${BASENAME%.ttf}
	DIR=$(dirname $f)
	EOT_NAME="$DIR/$NO_EXTENSION.eot"
	WOFF_NAME="$DIR/$NO_EXTENSION.woff"
	WOFF2_NAME="$DIR/$NO_EXTENSION.woff2"

	# convert to compressed woff
	if [ ! -f ${WOFF_NAME} ] ; then
		sfnt2woff-zopfli ${f};
	fi

	# convert to compressed woff2
	if [ ! -f ${WOFF2_NAME} ] ; then
		woff2_compress ${f};
	fi

	# convert to compressed eot
	if [ ! -f ${EOT_NAME} ] ; then
		ttf2eot < ${f} > ${EOT_NAME};
	fi

	# notify
	echo "Done converting ${BASENAME}";
done

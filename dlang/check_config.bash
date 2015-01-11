#!/bin/bash

set -e

export PATH=`pwd`/.env/bin:$PATH

command_exists () {
    type "$1" &> /dev/null ;
}

if ! command_exists dub; then
    ./setup.bash
fi

if [ "$(uname)" == "Darwin" ]; then
    COMPILER=dmd
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    COMPILER=dmd
else
    echo Your OS is not supported.
    exit 1
fi

if ! command_exists $COMPILER; then
    ./setup.bash
fi


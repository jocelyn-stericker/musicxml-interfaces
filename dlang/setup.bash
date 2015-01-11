#!/bin/bash

mkdir -p .env
cd .env
rm -rf *

command_exists () {
    type "$1" &> /dev/null ;
}

if [ "$(uname)" == "Darwin" ]; then
    wget http://code.dlang.org/files/dub-0.9.22-osx-x86_64.tar.gz
    wget http://downloads.dlang.org/releases/2014/dmd.2.066.1.osx.zip
    unzip ./dmd*
    tar -xf ./dub*.tar.gz
    rm *.tar.gz *.zip
    ln -s ./dmd2/osx/bin/ .
    mv ./dub ./bin
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    wget http://code.dlang.org/files/dub-0.9.22-linux-x86_64.tar.gz
    tar -xf ./dub*.tar.gz
    mkdir bin
    mv ./dub ./bin

    if ! command_exists dmd; then
        echo ================================
        echo = FAILURE! Could not find dmd! =
        echo ================================
        echo
        echo Please install the D programming language.
        echo On Ubuntu, the magic command is
        echo -e "  sudo apt-get install dmd-bin libphobos2-dev"
        echo
        exit 1
    fi
else
    echo Your OS is not supported.
    exit 1
fi


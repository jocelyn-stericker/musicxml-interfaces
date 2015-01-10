#!/bin/bash
set -e

source ./check_config.bash
./bind_libxml2.bash

cd jsonify
dub build --build=release --compiler=$COMPILER
cd ..
dub build --build=release --compiler=$COMPILER
echo Build succeeded.

#!/bin/bash

# '>' removes the contents from the specified file
RUN > ./src/baseUrl.js

echo "export const baseUrl = \"" + $JSON_SERVER_URL + "\";" >> ./src/baseUrl.js
#!/bin/bash

if [ ! -d 'node_modules' ]; then
  npm install
fi
npm run dev-start

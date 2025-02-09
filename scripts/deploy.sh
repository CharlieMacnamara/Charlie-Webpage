#!/bin/bash

# Clear previous builds
rm -rf .next out

# Install dependencies
npm install

# Build static site
npm run build

# Deploy to seedbox
rsync -azP out/ charlieseedbox@nexus.usbx.me:/home/charlieseedbox/hosting/Charlie-Webpage/
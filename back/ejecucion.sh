#!/bin/bash

# Define the repositories to work on
repositories=("CarbonFootprint" "OpenStreetMap" "Productos" "Pujas" "Usuarios" "Cloudinary")

# Get the absolute path to the script directory
script_dir="$(cd "$(dirname "$0")" && pwd)"

# Loop through the repositories
for r in "${repositories[@]}"; do
    # Construct the absolute path to the repository directory
    repo_dir="$script_dir/$r"

    # Change to the repository directory
    cd "$repo_dir"

    # Run npm install
    npm install

    # Start nodemon app in a separate Terminal window
    osascript -e "tell app \"Terminal\" to do script \"cd '$repo_dir' && npm start\""
done

echo "All processes have been started."

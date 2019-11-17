#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh -v $DROPLET_USER@$DROPLET_IP -o StrictHostKeyChecking=no <<-EOF
    cd $SSH_PROJECT_FOLDER
    git pull
    docker-compose pull
    docker-compose stop
    docker-compose rm -f
    docker-compose up -d
EOF
)
#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh -v $DROPLET_USER@$DROPLET_IP -o StrictHostKeyChecking=no <<-EOF
    export POSTGRES_DB=$POSTGRES_DB
    export POSTGRES_USER=$POSTGRES_USER
    export POSTGRES_PWD=$POSTGRES_PWD
    export PGADMIN_PORT=$PGADMIN_PORT
    export PGADMIN_LOGIN=$PGADMIN_LOGIN
    export PGADMIN_PWD=$PGADMIN_PWD
    cd $SSH_PROJECT_FOLDER
    git pull
    docker-compose pull
    docker-compose stop
    docker-compose rm -f
    docker-compose up -d
EOF
)
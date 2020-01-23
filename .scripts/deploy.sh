#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh -v $DROPLET_USER@$DROPLET_IP -o StrictHostKeyChecking=no <<-EOF
    cd $SSH_PROJECT_FOLDER
    git pull
    echo "export POSTGRES_DB=$POSTGRES_DB"
    echo "export POSTGRES_USER=$POSTGRES_USER"
    echo "export POSTGRES_PWD=$POSTGRES_PWD"
    echo "export PGADMIN_PORT=$PGADMIN_PORT"
    echo "export PGADMIN_LOGIN=$PGADMIN_LOGIN"
    echo "export PGADMIN_PWD=$PGADMIN_PWD"
    echo "export JWT_SECRET_KEY=$JWT_SECRET_KEY"
    echo "export POSTGRES_PORT=5432"
    echo "export POSTGRES_HOST=postgres"
    docker-compose pull && docker-compose stop && docker-compose rm -f && docker-compose up -d
EOF
)
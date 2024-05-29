#!/bin/sh

echo "Packaging application"
./mvnw package -DskipTests -P dev

echo "Copying application to server"
sudo scp target/spring-boot-backend-0.0.1-SNAPSHOT.jar $VM_USER@$VM_IP:/opt/adatanam-backend/
#!/bin/sh

echo "Allowing permissions to the project folder..."
sudo chmod -R 777 .

echo "Building the project..."
mvn package -DskipTests

echo "Running the project..."
nohup java -jar target/spring-boot-backend-0.0.1-SNAPSHOT.jar &
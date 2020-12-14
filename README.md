## "build-json-server"
"docker build -t khuramzahid1991/json-server-image -f Dockerfile.server ."
### This step is not necessary because the image has been uploaded on Docker Hub
- Build the image from the specified Dockerfile using -f
- Provide the image a tag using -t

## "build-react-client"
"docker build -t khuramzahid1991/react-client-image -f Dockerfile.client ."
### This step is not necessary because the image has been uploaded on Docker Hub
- Build the image from the specified Dockerfile using -f
- Provide the image a tag using -t

## "docker-build"
"npm run build-json-server && npm run build-react-client"
- Runs 'build-json-server' to build the image on local
- Runs 'build-react-client' to build the image on local

## "docker-push"
"docker push khuramzahid1991/json-server-image && docker push khuramzahid1991/react-client-image"
- Pushes the built images from local to Docker Hub
- Only layers that are not cached (either new or updated) on the Docker Hub are pushed

## "docker-reset"
"docker rmi khuramzahid1991/json-server-image && docker rmi khuramzahid1991/react-client-image"
- Deletes the images from local

## "run-json-server"
"docker run -d --name json-server --network=host khuramzahid1991/json-server-image"
- Pull the image if not present in the local image repo
- Run the image in detached mode (not engaging the terminal screen) using -d
- Provide the running container a name using --name
- Make sure that the container is accessible on localhost using --network 

## "run-react-client"
"docker run -d --name react-client -p 3000:3000 -t -e JSON_SERVER_URL=\"http://localhost:3001\" khuramzahid1991/react-client-image"
- Run the image in detached mode (not engaging the terminal screen) using -d
- Provide the running container a name using --name
- Make sure that the container is accessible on localhost at port 3000
- Make sure the container stays running using -t
- Pass in the environment variable to specify JSON server URL

## "docker-start"
"npm run run-json-server && npm run run-react-client"
### Make sure images exist on Docker Hub if not on local
### Can be executed first
- Runs 'run-json-server' to start the 'json-server' container
- Runs 'run-react-client' to start the 'react-client' container
    
## "docker-stop"
"docker stop json-server && docker rm json-server && docker stop react-client && docker rm react-client"
### Execute this last
- Stops and remove the running 'json-server' container
- Stops and remove the running 'react-client' container

## "start-sonarqube"
"docker run -d --name sonarqube --stop-timeout 3600 -p 9000:9000 -p 9092:9092 sonarqube"
### Execute as needed
- Run the SonarQube server and create a new project
- Follow the instructions, download the Sonar Scanner from the provided source (if not already downloaded), and run the command after navigating to the right directory

## "minikube-start"
"minikube start && kubectl apply -f deployment.yaml"

## "minikube-step2"
"minikube service react-client-service"

## "minikube-stop"
"kubectl delete -f deployment.yaml && minikube stop"
### "build-json-server"
"docker build -t khuramzahid1991/json-server-confusion -f Dockerfile.server ."
*** This step is not necessary because the image has been uploaded on Docker Hub ***
- Build the image from the specified Dockerfile using -f
- Provide the image a tag using -t

### "build-react-nginx"
"npm run build && docker build -t khuramzahid1991/react-nginx-image -f Dockerfile.client ."
*** This step is not necessary because the image has been uploaded on Docker Hub ***
- Generate build artifacts using 'npm run build'
- Build the image from the specified Dockerfile using -f
- Provide the image a tag using -t

### "run-json-server"
"docker run -d --name json-server --network=host khuramzahid1991/json-server-confusion"
- Pull the image if not present in the local image repo
- Run the image in detached mode (not engaging the terminal screen) using -d
- Provide the running container a name using --name
- Make sure that the container is accessible on localhost using --network 

### "run-react-nginx"
"docker run --name react-nginx -d -p 3000:80 khuramzahid1991/react-nginx-image"
- Pull the image if not present in the local image repo
- Run the image in detached mode (not engaging the terminal screen) using -d
- Provide the running container a name using --name
- Make sure that the container is accessible on localhost at port 3000

### "go"
*** EXECUTE THIS FIRST ***
"npm run-json-server && npm run-react-nginx"
- Runs 'run-json-server' to start the 'json-server' container
- Runs 'confusion-nginx' to start the 'react-nginx' container
    
### "stop"
"docker rm -f json-server && docker rm -f react-nginx"
*** EXECUTE THIS LAST ***
- Stops and remove the running 'json-server' container
- Stops and remove the running 'react-nginx' container

### "start-sonarqube"
"docker run -d --name sonarqube --stop-timeout 3600 -p 9000:9000 -p 9092:9092 sonarqube"
*** Execute as needed ***
- Run the SonarQube server and create a new project
- Follow the instructions, download the Sonar Scanner from the provided source (if not already downloaded), and run the command after navigating to the right directory
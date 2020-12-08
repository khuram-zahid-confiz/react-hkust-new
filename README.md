### "build-json-server"
"docker build -t khuramzahid1991/json-server-confusion -f Dockerfile.server ."
*** This step is not necessary because the image has been uploaded on Docker Hub ***
- Build the image from the specified Dockerfile using -f
- Provide the image a tag using -t

### "run-json-server"
"docker run -d --name json-server --network=host khuramzahid1991/json-server-confusion"
- Run the image in detached mode (not engaging the terminal screen) using -d
- Provide the running container a name using --name
- Make sure that the container is accessible on localhost using --network 

### "confusion-nginx"
"npm run build && docker run --name react-nginx -v /home/khuramzahid/Documents/react-hkust-new/build:/usr/share/nginx/html -d -p 3000:80 nginx:alpine"
- Generate build artifacts using 'npm run build'
- Run a container with the specified name in detached mode and mapped to the port 3000 of the host
- Map the build artifacts folder as volume for the container. Whatever is the content of the build artifact folder will be the content for the nginx html folder

### "go"
*** EXECUTE THIS FIRST ***
"docker pull khuramzahid1991/json-server-confusion && npm run run-json-server && npm run confusion-nginx"
- Pulls the image from Docker Hub (Not a necessary step as the run command automatically checks if the image is present in the local repo or not, and needs to be pulled or not)
- Runs 'run-json-server' to start the 'json-server' container
- Runs 'confusion-nginx' to start the 'react-nginx' container
    
### "stop"
"docker stop json-server && docker rm json-server && docker stop react-nginx && docker rm react-nginx"
*** EXECUTE THIS LAST ***
- Stops and remove the running 'json-server' container
- Stops and remove the running 'react-nginx' container

### "start-sonarqube"
"docker run -d --name sonarqube --stop-timeout 3600 -p 9000:9000 -p 9092:9092 sonarqube"
*** Execute as needed ***
- Run the SonarQube server and create a new project
- Follow the instructions, download the Sonar Scanner from the provided source (if not already downloaded), and run the command after navigating to the right directory
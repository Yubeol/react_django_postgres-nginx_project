1. docker build --no-cache -t my-jenkins .

2. docker run -d \
  --name jenkins \
  --user root \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart unless-stopped \
  my-jenkins


3. docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

초기비번: 9ee4ee18a4f54c4ab95418597cfb3fc2
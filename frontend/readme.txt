docker build -t my-jenkins .

docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock my-jenkins

docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  my-jenkins

  초기 비밀번호 확인:docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    초기 비밀번호: 35034001974749c8bab4a298e649d78f
docker stop jenkins      # 중지
docker start jenkins     # 재시작
docker logs jenkins      # 로그 확인
docker rm -f jenkins     # 컨테이너 삭제

계정명: Ryu
비밀번호: 1114

  http://localhost:8080

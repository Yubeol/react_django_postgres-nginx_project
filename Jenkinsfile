pipeline {

    // Jenkins 실행 에이전트
    agent any

    stages {

        // Docker 이미지 빌드 (frontend는 Dockerfile 내부에서 npm ci/build 수행)
        stage('Docker Build') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        // 기존 컨테이너 종료 후 재배포 (볼륨은 유지되어 DB 데이터 보존됨)
        stage('Deploy') {
            steps {
                sh '''
                    docker compose down || true
                    docker compose up -d
                '''
            }
        }

        // DB가 완전히 뜰 때까지 잠시 대기
        stage('Wait for DB') {
            steps {
                sh '''
                    sleep 5
                '''
            }
        }

        // Django 마이그레이션 자동 적용
        stage('Django Migrate') {
            steps {
                sh '''
                    docker compose exec -T backend python manage.py migrate
                '''
            }
        }

    }

    // 빌드 결과 처리
    post {

        success {
            echo '배포 완료'
        }

        failure {
            echo '배포 실패'
        }

        always {
            echo 'Pipeline 종료'
        }
    }
}
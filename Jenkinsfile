pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t weekly-chores-frontend:1.0 frontend/.'
                sh 'docker run --name weekly-chores-frontend -p 3000:3000 -d weekly-chores-frontend:1.0'
            }
        }
    }
}

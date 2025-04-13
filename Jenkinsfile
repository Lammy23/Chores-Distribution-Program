pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                // Shutdown server
                sh '(docker stop weekly-chores-frontend && docker rm weekly-chores-frontend) || true'
            }            
        }
        stage('Build') {
            // Will eventually build all folders individually
            steps {
                sh 'docker build -t weekly-chores-frontend:1.0 frontend/.'
                sh 'docker run --name weekly-chores-frontend -p 3000:3000 -d weekly-chores-frontend:1.0'
            }
        }
    }
}
// Testing integration
// Testing #2
// Testing #3
// Testing #4
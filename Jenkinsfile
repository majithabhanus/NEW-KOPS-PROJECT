pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "majithas/todo-frontend"
        BACKEND_IMAGE  = "majithas/go-todo"
        K8S_DIR        = "server/k8s"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/majithabhanus/NEW-KOPS-PROJECT.git',
                    credentialsId: 'github-cred'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t ${FRONTEND_IMAGE}:latest ./ui/src'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t ${BACKEND_IMAGE}:latest ./server/k8s'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred-id',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                docker push ${FRONTEND_IMAGE}:latest
                docker push ${BACKEND_IMAGE}:latest
                '''
            }
        }

        stage('Deploy Kubernetes Manifests') {
            steps {
                sh 'kubectl apply -f ${K8S_DIR}/'
            }
        }

        stage('Update Kubernetes Deployments') {
            steps {
                sh '''
                kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:latest --record || true
                kubectl set image deployment/backend backend=${BACKEND_IMAGE}:latest --record || true
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl get pods -o wide
                kubectl get svc
                kubectl get ingress
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Application successfully deployed to Kubernetes"
        }
        failure {
            echo "❌ Pipeline failed. Check logs."
        }
        always {
            echo "Pipeline execution finished."
        }
    }
}

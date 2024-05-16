pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_HUB_USERNAME = 'vikastiwari'
        SSH_CREDENTIALS_ID = 'admin'
        K8S_SERVER_HOST = '192.168.1.11'
        K8S_SERVER_USER = 'root'
        K8S_SERVER_PASSWORD = 'redhat'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the Git repository
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                          userRemoteConfigs: [[url: 'https://github.com/vtywari/sr-devops.git',
                          credentialsId: 'github']]])
            }
        }

        stage("Build and Push Backend Image") {
            steps {
                // Build the Docker image for the backend
                script {
                    sh "docker build -t ${DOCKER_HUB_USERNAME}/backend:latest backend"
                }

                // Push the backend Docker image to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker push ${DOCKER_HUB_USERNAME}/backend:latest"
                }
            }
        }

        stage("Build and Push Frontend Image") {
            steps {
                // Build the Docker image for the frontend
                script {
                    sh "docker build -t ${DOCKER_HUB_USERNAME}/frontend:latest frontend"
                }

                // Push the frontend Docker image to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker push ${DOCKER_HUB_USERNAME}/frontend:latest"
                }
            }
        }

        stage("Deploy to Kubernetes") {
            steps {
                // SSH into the Kubernetes server and deploy manifests
                script {
                    def remote = [
                        name: 'K8S master',
                        host: "${K8S_SERVER_HOST}",
                        user: "${K8S_SERVER_USER}",
                        password: "${K8S_SERVER_PASSWORD}",
                        allowAnyHosts: true
                    ]

                    sshPut remote: remote, from: 'k8s/backend-deployment.yaml', into: '.'
                    sshPut remote: remote, from: 'k8s/frontend-deployment.yaml', into: '.'

                    sshCommand remote: remote, command: 'kubectl apply -f backend-deployment.yaml'
                    sshCommand remote: remote, command: 'kubectl apply -f frontend-deployment.yaml'
                }
            }
        }
    }
}

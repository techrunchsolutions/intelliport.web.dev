pipeline {
    agent {
       label "ach-runner"
       }
    environment {
        VERSION = "${env.BUILD_ID}"
        AWS_ACCOUNT_ID="962441259158"
        AWS_DEFAULT_REGION="eu-west-1"
        IMAGE_REPO_NAME="ach-admin-console"
        IMAGE_TAG= "${env.BUILD_ID}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }
    stages {
        stage('Git checkout') {
            steps {
                git branch: 'main', credentialsId: 'GitHub_Access', url: 'https://github.com/RedtechLTD/redtech.ach.ui.web.git'
            }
        }
      
          stage('Building image') {
            steps{
              script {
                dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                 }
            }
        }
        
        stage('Pushing to ECR') {
                 environment {
                        AWS_ACCESS_KEY_ID = credentials('aws_secret_ach')
                        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_access_ach')
                         }
          steps{  
            script {
                withAWS(role: "tf_rd_role", roleAccount: '962441259158') {
                sh """aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                sh """docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"""
                sh """docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"""
                 }
               }
             }
         }
         
        stage('Remove Unused docker image') {
          steps{
            script {
              sh "docker rmi -f  ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
              sh "docker system prune -f"
                    }
          }
        }
        stage('pull image & Deploying application on k8s cluster') {
                    environment {
                       AWS_ACCESS_KEY_ID = credentials('aws_secret_ach')
                       AWS_SECRET_ACCESS_KEY = credentials('aws_secret_access_ach')
                 }
                    steps {
                      script{
                        withAWS(role: "Jenkins", roleAccount: '962441259158') {
                          sh 'aws eks update-kubeconfig --name switch-redtech-prod-cluster --region eu-west-1'
                          sh """helm upgrade --namespace ach-console --set image.tag="${VERSION}" --install ach-admin-console ./ach-admin-console -f ./ach-admin-console/values.yaml"""
                        }
                    }
               }
        }
    }
}

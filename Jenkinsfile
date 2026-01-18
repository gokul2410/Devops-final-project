pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "gokul2410/reminder-app"
    DOCKER_TAG   = "latest"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git credentialsId: 'github-creds',
            url: 'https://github.com/gokul2410/Devops-final-project.git',
            branch: 'main'
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
        '''
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([
          usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )
        ]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
          '''
        }
      }
    }

    stage('Docker Push') {
      steps {
        sh '''
          docker push $DOCKER_IMAGE:$DOCKER_TAG
        '''
      }
    }
  }

  post {
    success {
      echo " Docker image gokul2410/reminder-app:latest pushed successfully"
    }
    failure {
      echo " Jenkins pipeline failed"
    }
  }
}

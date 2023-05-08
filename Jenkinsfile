/* groovylint-disable-next-line CompileStatic */
def JobNameSplit = env.JOB_NAME.tokenize('/') as String[]
def ActualJobName = JobNameSplit[0]
env.ActualJobName = ActualJobName
pipeline {
    agent any
    environment {
      DEPLOY_DIR = '~/applications/webuild.tecxar.io'
    }
    tools {nodejs "NodeJS18"}
    stages {
      // stage('Cloning Repo') {
      //   steps {
      //       checkout scm
      //   }
      // }
      stage('Installing dependencies') {
        steps {
            sh 'yarn --silent'
        }
      }
      stage('Building') {
        steps {
            slackSend channel: 'jenkins-ci',
            color: 'good', failOnError: true,
            message: "Build Started - ${env.JOB_NAME} ${env.BUILD_COMMIT_BY}",
            teamDomain: 'tecxar',
            tokenCredentialId: 'tecxar.slack.com'
            sh 'yarn build'
            slackSend channel: 'jenkins-ci',
            color: 'good', failOnError: true,
            message: "Build Successfully - ${env.JOB_NAME}",
            teamDomain: 'tecxar',
            tokenCredentialId: 'tecxar.slack.com'
        }
      }
      stage('Testing') {
        steps {
            echo 'Nothing to do here yet'
        }
      }
      stage('Archiving') {
          steps {
              slackSend channel: 'jenkins-ci',
              color: 'good', failOnError: true,
              message: "Archiving Started - ${env.JOB_NAME}",
              teamDomain: 'tecxar',
              tokenCredentialId: 'tecxar.slack.com'
              archiveArtifacts artifacts: 'dist/**/*',
              excludes: '',
              followSymlinks: false,
              onlyIfSuccessful: true
              slackSend channel: 'jenkins-ci',
              color: 'good', failOnError: true,
              message: "Archiving Successfully - ${env.JOB_NAME}",
              teamDomain: 'tecxar',
              tokenCredentialId: 'tecxar.slack.com'
          }
      }
      stage('Zipping') {
        steps {
          
          sh '''
            cd $JENKINS_HOME/jobs/webuild-app/branches/${BRANCH_NAME}/builds/$BUILD_ID/archive/dist
            zip -r webuild_app_build_$BUILD_ID .
            '''
        }
      }
      stage('Uploading') {
        steps {
          sh '''
            cd $JENKINS_HOME/jobs/webuild-app/branches/${BRANCH_NAME}/builds/$BUILD_ID/archive/dist
            scp -i $JENKINS_HOME/.ssh/id_rsa webuild_app_build_$BUILD_ID.zip  root@139.84.165.89:~/uploads
            '''
        }
      }
      stage('Deploying') {
        steps {
          sh '''
            ssh -i $JENKINS_HOME/.ssh/id_rsa root@139.84.165.89 <<EOF
            pm2 stop we-build
            rm -rf ${DEPLOY_DIR}/
            unzip ~/uploads/inservice_website_build_$BUILD_ID -d ${DEPLOY_DIR}
            cd ${DEPLOY_DIR}
            yarn --production 
            pm2 restart we-build
            pm2 save
            rm -rf ~/uploads/inservice_website_build_$BUILD_ID.zip
            exit
            EOF
            '''
        }
      }
      stage('Slack Notification'){
        steps{
          slackSend channel: 'jenkins-ci', 
          color: 'good', failOnError: true, 
          message: "Build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", 
          teamDomain: 'tecxar', 
          tokenCredentialId: 'tecxar.slack.com'
        }
      }
      stage('Cleanup'){
        steps{
          echo "cleaning upload artifact"
          sh '''
            cd $JENKINS_HOME/jobs/webuild-app/branches/${BRANCH_NAME}/builds/$BUILD_ID/archive/dist
            rm -f webuild_app_build_$BUILD_ID.zip
            '''
        }
      }
    }  
    post {
      // Clean after build
      always {
        cleanWs(cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true)
      }
    }
}

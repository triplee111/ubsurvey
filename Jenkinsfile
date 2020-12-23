pipeline {
  agent any
  environment {
    ANSIBLE_PATH = '${JENKINS_HOME}/pipeline/ansible'
    DEV_ROOM_ID = 'Wd3LJahhYPvB2oMzB' // 活動前後端群組
  }
  stages {
    stage('Load env') {
      steps {
        script {
          loadEnvVariables("${WORKSPACE}/./.env")
        }
      }
    }
    stage('Build') {
      agent {
        docker {
          image "registry.gitlab-ce.cyadmk.com:5000/docker/vact-nest:${VACT_NEST_VERSION}"
          args "-v ${WORKSPACE}:/vact-nest/src --env APP_NAME=${APP_NAME} --env APP_PLATFORM=${APP_PLATFORM}"
        }
      }
      steps {
        script {
          if (fileExists('app/package.json')) {
            sh '''
              cd /vact-nest/src/app
              npm install --production
            '''
          }

          if (env.TAG_NAME) {
            sh '''
              cd /vact-nest
              ./entrypoint.sh
              npm run build:production
              '''
          } else {
            if (env.BRANCH_NAME == 'master') {
              sh '''
                cd /vact-nest
                ./entrypoint.sh
                npm run build:staging
                '''
            } else {
              sh '''
                cd /vact-nest
                ./entrypoint.sh
                npm run build
                '''
            }
          }
        }
      }
    }
    stage('Merge request') {
      when {
        allOf {
          environment name: 'GITLAB_OBJECT_KIND', value: 'merge_request'
          expression { env.GITLAB_OA_SOURCE_BRANCH != 'master' }
          expression { env.GITLAB_OA_AUTHOR_ID != '12' }
          expression { env.GITLAB_OA_AUTHOR_ID != env.GITLAB_OA_ASSIGNEE_ID }
        }
      }
      environment {
        ASSIGNEE_ID = "${env.GITLAB_OA_ASSIGNEE_ID ?: '12'}"
      }
      steps {
        ansiblePlaybook(
          inventory: '${ANSIBLE_PATH}/hosts',
          playbook: '${ANSIBLE_PATH}/notify.rocketchat.yml',
          colorized: true,
          tags: 'mrNotify',
          extraVars: [
            userId: ASSIGNEE_ID,
            roomId: DEV_ROOM_ID,
            alias: '開發通知',
            message: '[$GITLAB_PROJECT_NAME]($GITLAB_PROJECT_GIT_HTTP_URL) 分支 **$GITLAB_OA_SOURCE_BRANCH**'
          ])
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh '${JENKINS_HOME}/pipeline/script/sysevt/app.deploy.sh'
      }
    }
    stage('Release') {
      when {
        tag pattern: 'v[0-9]*.[0-9]*.[0-9]*', comparator: 'REGEXP'
      }
      steps {
        sh '${JENKINS_HOME}/pipeline/script/sysevt/app.release.sh'
      }
    }
  }
  post {
    failure {
      ansiblePlaybook(
        inventory: '${ANSIBLE_PATH}/hosts',
        playbook: '${ANSIBLE_PATH}/notify.rocketchat.yml',
        tags: 'failure',
        extraVars: [
          userId: GITLAB_USER_ID,
          alias: '開發通知',
          message: '$JOB_NAME #$BUILD_NUMBER build failed, see [logs]($RUN_DISPLAY_URL)'
        ])
    }
    cleanup {
      deleteDir()
      dir("${WORKSPACE}@tmp") {
          deleteDir()
      }
      dir("${WORKSPACE}@2") {
          deleteDir()
      }
      dir("${WORKSPACE}@2@tmp") {
          deleteDir()
      }
    }
  }
}

def loadEnvVariables(path) {
  def props = readProperties file: path
  keys = props.keySet()
  for (key in keys) {
    value = props["${key}"]
    env."${key}" = "${value}"
  }
}

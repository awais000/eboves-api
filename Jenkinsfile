pipeline {
  agent any

  parameters {
    choice(name: 'node_env', choices: ['stage', 'pro', 'dev'], description: 'Server envrinoment')
  }

  stages {
    stage('Prepare Workspace') {
      steps {
        sh 'yarn'
      }
    }

    stage('build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('deploy') {
      steps {
        when {
           expression {
              return params.node_env != 'stage';
             }
        }
        echo 'deploying'
      }
    }

  }

}
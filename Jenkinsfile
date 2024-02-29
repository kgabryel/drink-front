pipeline {
    agent any
    stages {
        stage('install') {
            steps {
                sh 'cd src && yarn install'
            }
        }
        stage('build'){
            steps {
                sh 'cd src && yarn build'
            }
        }
        stage('deploy') {
            steps {
                sh 'sudo rm -rf /var/www/html/drink-front'
                sh 'cp -r src/dist /var/www/html/drink-front'
                sh 'sudo chmod 755 -R /var/www/html/drink-front'
                sh 'sudo chown www-data -R /var/www/html/drink-front'
            }
        }
    }
    post {
        always {
           cleanWs()
        }
    }
}

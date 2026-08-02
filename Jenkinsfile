pipeline {
    agent any
    stages {
        stage('install') {
            steps {
                dir('src') {
                    sh 'npm ci'
                }
            }
        }
        stage('build'){
            steps {
                dir('src') {
                    sh 'npm run build'
                }
            }
        }
        stage('deploy') {
            steps {
                sh 'sudo rsync -a --delete src/dist/ /var/www/html/drink-front/'
                sh 'sudo chown -R www-data:www-data /var/www/html/drink-front'
                sh 'sudo find /var/www/html/drink-front -type d -exec chmod 755 {} \\;'
                sh 'sudo find /var/www/html/drink-front -type f -exec chmod 644 {} \\;'
            }
        }
    }
    post {
        always {
           cleanWs()
        }
    }
}

def project = 'people-service-web-app'
def appName = 'people-web-app'
def tenancy='redtrial'
def ocir='fra.ocir.io'
def imageTag = "${ocir}/${tenancy}/oracleimc/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

pipeline {
	  agent {
    kubernetes {
      label 'people-service-web-app'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: kubectl
    image: allokubs/kubectl
    command:
    - cat
    tty: true
  - name: node
    image: node:10.14.1-alpine
    command:
    - cat
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
  - name: docker
    image: docker:18.05-dind
    securityContext:
      privileged: true
    volumeMounts:
      - name: dind-storage
        mountPath: /var/lib/docker
  volumes:
  - name: dind-storage
    emptyDir: {}
    command:
    - cat
    tty: true
"""
}
  }
	stages {
		stage('Build React Application'){
			steps {
				container('node') {
		    		sh """
              npm install
              npm run build --production
              """
	    		}

			}
		}
		stage('Build Image and push'){
			steps {
				container('docker') {
		    		withDockerRegistry(credentialsId: 'ocir-credentials', url: "https://${ocir}") {
					      sh """
				            docker build -t ${imageTag} .
				            docker push ${imageTag}
				            """
					}
	    		}

			}
		}
		stage('Deploy To Kubernetes'){
			environment {
        KUBECONFIG = credentials('oci-kubernetes')
      }
			steps {
				container('kubectl') {
		    		sh 'kubectl get pods'
		    		sh("sed -i.bak 's#iad.ocir.io/gse00013828/oracleimc/people-web-app:1.0#${imageTag}#' ./people-service-web-app-deployment.yaml")
		    		sh("kubectl apply -f people-service-web-app-deployment.yaml")
	    		}

			}
		}

	}
}

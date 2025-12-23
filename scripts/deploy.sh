#!/bin/bash
set e

APP_DIR = "/opt/notes-app"
REPO_URL = "https://github.com/FaizanQureshi1220/Notes-Application-End-to-End-Devops.git" 
BRANCH = "main"

echo " Starting deployment of Notes App..."

sudo mkdir -p $APP_DIR
sudo chown -R ubuntu:ubuntu $APP_DIR
cd $APP_DIR

if [ ! -d ".git" ]; 
    then
        echo "Cloning repository..."
        git clone -b $BRANCH $REPO_URL .
    else
        echo "Pulling latest changes..."
        git pull origin $BRANCH
fi

if ! command -v kubectl &> /dev/null
then
    echo "kubectl could not be found, installing..."
    curl -sfl https://get.k3s.io | sh -
    sleep 10
fi

export kubeconfig=/etc/rancher/k3s/k3s.yaml

echo "Applying Kubernetes manifests..."
kubectl apply -f "Kubernetes Manifests"

echo "Restarting deployments..."
kubectl rollout restart deployment notes-server -n notes-app
kubectl rollout restart deployment notes-client -n notes-app


echo "Verifying rollout..."
kubectl rollout status deployment notes-server -n notes-app
kubectl rollout status deployment notes-client -n notes-app

echo "Deployment successful!"
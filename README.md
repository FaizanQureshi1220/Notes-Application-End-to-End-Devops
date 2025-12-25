# Notes-Application-End-to-End-Devops
A **production-style End-to-End DevOps project** that demonstrates how a full-stack application can be built, deployed, monitored, and maintained using modern DevOps tools and best practices.

Every push to the `main` branch triggers a **fully automated CI/CD pipeline**, resulting in a live, accessible application running on **Kubernetes (k3s) on AWS EC2**, with **local Prometheus & Grafana monitoring**.

---

## Project Overview

This project showcases a **real-world DevOps workflow**, covering:

- Infrastructure provisioning using **Terraform**
- Server configuration using **Ansible**
- Containerization with **Docker**
- Orchestration using **Kubernetes (k3s)**
- Automated deployments using **GitHub Actions**
- Centralized monitoring using **Prometheus & Grafana**

The entire setup is **reproducible**, **cost-efficient**, and **destroy-and-rebuild safe**.

---

## Tech Stack

### Application
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MySQL

### Containerization
- Docker
- Docker Hub (Image Registry)

### Orchestration
- Kubernetes (k3s)
- Traefik Ingress Controller

### Cloud & Infrastructure
- AWS EC2
  - Application Server (k3s)
  - Database Server (MySQL)
- AWS VPC, Subnets, Security Groups
- Terraform (Infrastructure as Code)

### Configuration Management
- Ansible
  - App server setup
  - Database server configuration
  - MySQL automation & hardening

### CI/CD
- GitHub Actions
- Docker Buildx
- SSH-based deployment

### Monitoring
- Prometheus (Local)
- Grafana (Local)
- Node Exporter
- kube-state-metrics

---

## 🔄 CI/CD Pipeline

### 📌 Pipeline Trigger
- Runs automatically on every push to the `main` branch

---

### 📜 Pipeline Responsibilities

- Build frontend & backend Docker images
- Push images with commit SHA tags
- Deploy Kubernetes resources:
  - Namespace
  - ConfigMaps & Secrets
  - Deployments & Services
  - Ingress (Traefik)
- Apply monitoring manifests
- Perform rolling updates without downtime

---

## 🗄️ Database Automation

Using **Ansible**, the database setup is fully automated:

- MySQL installation
- Remote connectivity configuration
- Database creation
- User creation with least-privilege access
- No manual SQL steps required

---

## 📊 Monitoring & Observability

### Metrics Collected
- Node CPU, memory, disk, network (Node Exporter)
- Pod, deployment, replica, and cluster metrics (kube-state-metrics)

### Monitoring Architecture
- Prometheus runs on local machine
- Grafana runs on local machine
- Metrics scraped securely from EC2

### Grafana Dashboards
- **Node Exporter Full** (ID: 1860)
- **Kubernetes Cluster Monitoring** (ID: 15757)
- **Kubernetes Pods & Containers** (ID: 6417)

---

## ♻️ Reproducibility

The entire setup supports:

```bash
terraform destroy
terraform apply
ansible-playbook
git push
```

Application becomes live without manual debugging

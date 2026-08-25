README.md
🚀   Apna College DevOps Project  🚀

A full-stack Node.js and MongoDB application demonstrating modern DevOps practices using Docker, Kubernetes, Kustomize, and GitOps.

---

## Project Overview

This project showcases the complete application deployment lifecycle:

```text
Node.js Application
        ↓
Docker Container
        ↓
Kubernetes Deployment
        ↓
Kustomize Environments
        ↓
GitOps (ArgoCD)
        ↓
AWS EKS🚀

Branch Strategy
 main --- Docker file 
 pro -----k8s file for ECS



Contains application source code and containerization.

Features:

Node.js Application
MongoDB Integration
Dockerfile
Docker Build Configuration
Health Check Endpoint (/health)

Purpose:

Application Development
Docker Image Creation
Feature Development

pro

Contains production-ready Kubernetes implementation.

Features:

Namespace
Deployment
Service
Ingress
ConfigMap
Secret
HPA (Horizontal Pod Autoscaler)
PDB (PodDisruptionBudget)
Readiness & Liveness Probes
Metrics Server Integration

Purpose:

Kubernetes Learning
Production Deployment
Cluster Operations

eks-gitops

AWS-focused infrastructure and GitOps implementation.

Features:

AWS EKS Deployment
ArgoCD
Kustomize Overlays
GitOps Workflow
Future AWS Integrations

Planned Integrations:

AWS Load Balancer Controller
Route53
AWS Secrets Manager
ExternalDNS
Prometheus
Grafana

Purpose:

AWS Cloud Deployment
GitOps Automation
Production Infrastructure

Project Structure
apna-collage
│
├── app/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
│
├── k8s/
│   ├── base/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   ├── hpa.yaml
│   │   ├── pdb.yaml
│   │   └── kustomization.yaml
│   │
│   ├── overlays/
│   │   ├── dev/
│   │   └── stage/
│   │
│   ├── argocd/
│   └── aws/
│
└── README.md

Kubernetes Features Implemented

✅ Deployment

✅ Service

✅ Ingress

✅ ConfigMap

✅ Secret

✅ Readiness Probe

✅ Liveness Probe

✅ Metrics Server

✅ Horizontal Pod Autoscaler (HPA)

✅ PodDisruptionBudget (PDB)

✅ Kustomize Base

✅ Kustomize Overlays

✅ Environment Separation

Environment Configuration
Development
Namespace: dev
Host: dev.myapp.local
Replicas: 1

Stage
Namespace: stage
Host: stage.myapp.local
Replicas: 2

Health Check

Application health endpoint:

GET /health


Response:

{
  "status": "UP"
}

Autoscaling

Configured using Kubernetes HPA.

Minimum Replicas: 1
Maximum Replicas: 3
Target CPU: 50%

Learning Journey

Completed:

Docker
✅

Kubernetes Basics
✅

Services & Ingress
✅

ConfigMaps & Secrets
✅

Health Probes
✅

Metrics Server
✅

Autoscaling (HPA)
✅

PodDisruptionBudget
✅

Kustomize
✅


Next:

ArgoCD
⬜

AWS EKS
⬜

GitOps
⬜

Monitoring
⬜

Production Cloud Deployment
⬜

Future Roadmap
GitHub
   ↓
ArgoCD
   ↓
AWS EKS
   ↓
AWS ALB
   ↓
Application Pods


Additional Integrations:

AWS Secrets Manager
Route53
ExternalDNS
Prometheus
Grafana
CI/CD Automation
Author

Pankaj Kumar Roy

Staff Engineer | DevOps & Cloud Learning Journey

Building practical experience with:

Docker
Kubernetes
GitOps
AWS EKS
ArgoCD
Cloud Native Technologies

🚀 Continuous Learning • Continuous Improvement


Commit and push it:

```powershell
git add README.md
git commit -m "docs: add project README"
git push
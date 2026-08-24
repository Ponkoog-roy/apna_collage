Apna College DevOps Project

A full-stack Node.js application demonstrating modern DevOps, Docker, Kubernetes, Kustomize, and GitOps practices.

Branch Strategy
main

Application source code and containerization.

Contains:

Node.js application
MongoDB integration
Dockerfile
Docker image build configuration
Health check endpoint (/health)
Source code for local development

Purpose:

Application Development
Docker Builds
Feature Development

pro

Production-ready Kubernetes deployment branch.

Contains:

Kubernetes manifests
Namespace configuration
Deployment
Service
Ingress
ConfigMap
Secret
HPA (Horizontal Pod Autoscaler)
PodDisruptionBudget
Readiness & Liveness Probes
Metrics Server integration

Purpose:

Production Kubernetes Deployment
Cluster Operations
Infrastructure Validation

eks-gitops

AWS-focused GitOps branch.

Contains:

EKS-specific configurations
Kustomize overlays
ArgoCD manifests
AWS Load Balancer Controller configuration
Future Route53 integration
Future AWS Secrets Manager integration
GitOps deployment workflows

Purpose:

AWS EKS
ArgoCD
GitOps
Cloud Native Deployments

Kubernetes Architecture
GitHub
   │
   ▼
ArgoCD
   │
   ▼
Amazon EKS
   │
   ├── Namespace: dev
   ├── Namespace: stage
   ├── HPA
   ├── Ingress
   ├── Services
   ├── Deployments
   └── Pods

Kustomize Structure
k8s/
├── base
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── hpa.yaml
│   └── pdb.yaml
│
└── overlays
    ├── dev
    │   ├── kustomization.yaml
    │   ├── patch.yaml
    │   └── ingress-patch.yaml
    │
    └── stage
        ├── kustomization.yaml
        ├── patch.yaml
        └── ingress-patch.yaml

Features Implemented

✅ Docker Containerization
 ✅ Kubernetes Deployments
 ✅ Services & Ingress
 ✅ ConfigMaps & Secrets
 ✅ Readiness & Liveness Probes
 ✅ Horizontal Pod Autoscaling (HPA)
 ✅ Metrics Server Integration
 ✅ Pod Disruption Budget (PDB)
 ✅ Kustomize Base & Overlays
 ✅ Environment Isolation (Dev / Stage)
 ✅ GitOps Ready Structure
 ✅ AWS EKS Ready Architecture

Learning Roadmap
Docker
   ↓
Kubernetes
   ↓
Kustomize
   ↓
ArgoCD
   ↓
AWS EKS
   ↓
GitOps


Current Status: Kubernetes + Kustomize completed, progressing toward AWS EKS and ArgoCD GitOps deployment. 🚀
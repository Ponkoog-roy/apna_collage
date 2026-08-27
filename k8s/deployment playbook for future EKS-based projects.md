Built a complete EKS + ArgoCD + MongoDB Atlas GitOps Platform.

EKS GitOps Deployment Runbook
Final Architecture
GitHub (eks-gitops)
          ↓
       ArgoCD
          ↓
        EKS
          ↓
AWS Load Balancer
          ↓
      Node.js App
          ↓
    MongoDB Atlas

Phase 1: Create EKS Cluster
Install Tools
aws --version
kubectl version --client
helm version
eksctl version

Create Cluster

eks-cluster.yaml

apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: fabulous-metal-pumpkin
  region: ap-southeast-2

managedNodeGroups:
  - name: workers
    instanceType: t3.small
    desiredCapacity: 1
    minSize: 1
    maxSize: 2


Create:

eksctl create cluster -f eks-cluster.yaml

Connect Kubectl
aws eks update-kubeconfig `
  --region ap-southeast-2 `
  --name fabulous-metal-pumpkin


Verify:

kubectl get nodes

Phase 2: Deploy Application
Create Namespaces
kubectl create namespace dev
kubectl create namespace stage

Deploy Using Kustomize
kubectl apply -k .\k8s\overlays\dev
kubectl apply -k .\k8s\overlays\stage


Verify:

kubectl get all -n dev
kubectl get all -n stage

Phase 3: Install Metrics Server

Verify:

kubectl top nodes
kubectl top pods -n dev

Phase 4: Install ALB Controller
Associate OIDC
eksctl utils associate-iam-oidc-provider `
  --region ap-southeast-2 `
  --cluster fabulous-metal-pumpkin `
  --approve

Download IAM Policy
curl.exe -Lo iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json

Create Policy
aws iam create-policy `
  --policy-name AWSLoadBalancerControllerIAMPolicy `
  --policy-document file://iam_policy.json

Create IAM Service Account
eksctl create iamserviceaccount `
  --cluster=fabulous-metal-pumpkin `
  --region=ap-southeast-2 `
  --namespace=kube-system `
  --name=aws-load-balancer-controller `
  --attach-policy-arn=arn:aws:iam::<ACCOUNT-ID>:policy/AWSLoadBalancerControllerIAMPolicy `
  --override-existing-serviceaccounts `
  --approve

Get VPC ID
aws eks describe-cluster `
  --region ap-southeast-2 `
  --name fabulous-metal-pumpkin `
  --query "cluster.resourcesVpcConfig.vpcId" `
  --output text


Output:

vpc-036eb34ad7bc957e7

Install Controller
helm repo add eks https://aws.github.io/eks-charts

helm repo update

helm install aws-load-balancer-controller eks/aws-load-balancer-controller `
  -n kube-system `
  --set clusterName=fabulous-metal-pumpkin `
  --set serviceAccount.create=false `
  --set serviceAccount.name=aws-load-balancer-controller `
  --set region=ap-southeast-2 `
  --set vpcId=vpc-036eb34ad7bc957e7


Verify:

kubectl get pods -n kube-system

Phase 5: Create ALB Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: myapp-alb

  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip

spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80


Apply:

kubectl apply -f .\k8s\aws\alb-ingress-dev.yaml -n dev


Verify:

kubectl get ingress -n dev


Output:

k8s-dev-myappalb-xxxxx.ap-southeast-2.elb.amazonaws.com

Phase 6: MongoDB Atlas
Create Atlas Cluster
Cluster Name:
fabulous-metal-pumpkin

Create User
Username:
admin

Network Access
0.0.0.0/0

Secret

k8s/base/secret.yaml

apiVersion: v1
kind: Secret

metadata:
  name: myapp-secret

type: Opaque

stringData:
  MONGO_URL: "mongodb+srv://<username>:<password>@cluster.mongodb.net/apna_collage"


Commit and push.

Verify:

curl http://localhost:5000/getUsers


Expected:

[]


or user records.

Phase 7: Install ArgoCD
Namespace
kubectl create namespace argocd

Install
kubectl apply -n argocd `
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


Verify:

kubectl get pods -n argocd

Access UI
kubectl port-forward svc/argocd-server -n argocd 8080:80


Open:

http://localhost:8080

Get Password
kubectl get secret argocd-initial-admin-secret `
-n argocd `
-o jsonpath="{.data.password}"


Decode:

[System.Text.Encoding]::UTF8.GetString(
[System.Convert]::FromBase64String(
(kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}")
))

Phase 8: ArgoCD Project

project.yaml

apiVersion: argoproj.io/v1alpha1
kind: AppProject

metadata:
  name: apna-project
  namespace: argocd

spec:
  sourceRepos:
    - '*'

  destinations:
    - namespace: dev
      server: https://kubernetes.default.svc

    - namespace: stage
      server: https://kubernetes.default.svc


Apply:

kubectl apply -f project.yaml

Phase 9: ArgoCD Application

dev-application.yaml

apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: myapp-dev
  namespace: argocd

spec:
  project: apna-project

  source:
    repoURL: https://github.com/Ponkoog-roy/apna_collage.git
    targetRevision: eks-gitops
    path: k8s/overlays/dev

  destination:
    server: https://kubernetes.default.svc
    namespace: dev

  syncPolicy:
    automated:
      prune: true
      selfHeal: true


Apply:

kubectl apply -f dev-application.yaml


Verify:

kubectl get applications -n argocd


Expected:

Synced
Healthy

Phase 10: GitOps Release Process
Build New Image
docker build -t ponkoog/myapp:t43 .

Push
docker push ponkoog/myapp:t43

Update Deployment
image: ponkoog/myapp:t43

Commit
git add .
git commit -m "release: t43"
git push origin eks-gitops

Verify ArgoCD
kubectl get applications -n argocd


Expected:

myapp-dev     Synced     Healthy
myapp-stage   Synced     Healthy

Daily Operations Commands
Nodes
kubectl get nodes

Pods
kubectl get pods -A

Dev Logs
kubectl logs deployment/myapp -n dev -f

Restart Deployment
kubectl rollout restart deployment/myapp -n dev

Check ArgoCD
kubectl get applications -n argocd

Check ALB
kubectl get ingress -n dev

Check MongoDB Connectivity
curl http://localhost:5000/getUsers

Final Result

You now have a reusable blueprint for:

AWS EKS
   ↓
ALB
   ↓
Node.js Application
   ↓
MongoDB Atlas
   ↓
ArgoCD GitOps
   ↓
GitHub (eks-gitops branch)


This is your complete deployment playbook for future EKS-based projects. 🚀

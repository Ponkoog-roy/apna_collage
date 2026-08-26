apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress

spec:
  ingressClassName: nginx

  rules:
  - host: myapp.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
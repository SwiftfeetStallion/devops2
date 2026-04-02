kubectl apply -f config.yaml
kubectl apply -f clusterip.yaml

kubectl apply -f pod.yaml
kubectl apply -f deployment.yaml

kubectl wait pod --all --for=condition=Ready

kubectl apply -f daemon.yaml
kubectl apply -f cronjob.yaml

echo done
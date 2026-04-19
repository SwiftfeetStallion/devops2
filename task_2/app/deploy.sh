istioctl install --set profile=demo --set "values.global.proxy.resources.requests.cpu=10m" --set "values.global.proxy.resources.requests.memory=100Mi" -y

kubectl apply -f main/config.yaml
kubectl apply -f main/clusterip.yaml

kubectl apply -f main/deployment.yaml

kubectl wait pod --all --for=condition=Ready

kubectl label namespace default istio-injection=enabled

kubectl apply -f istio/

kubectl wait pod --all --for=condition=Ready

kubectl apply -f main/daemon.yaml
kubectl apply -f main/cronjob.yaml

echo done
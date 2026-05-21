Устанавливаем prometheus и настраиваем возможность использовать ServiceMonitor из разных пространств имён:

```sh

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues=false

```
Проверяем установку:

![](img/1.png)

Делаем несколько запросов в приложение командой `curl localhost` и смотрим на метрики istio:

![](img/3.png)

![](img/4.png)

Настраиваем ServiceMonitor, затем добавляем несколько записей в logs: `curl -H "Content-Type: application/json" -X POST http://localhost/log -d "{\"message\": \"test\"}"`.

![](img/5.png)

Проверяем наличие пользовательских метрик, определённых в файле `backend/index.js`.

![](img/6.png)
![](img/7.png)
![](img/8.png)
![](img/9.png)


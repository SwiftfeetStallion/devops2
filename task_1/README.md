После создания deployment и выполнения команды `kubectl port-forward service/app-service 80` проверяем работу приложения через `curl`.

![](img/curl%20example.png)  


Также можно зайти на web-страницу:
![](img/web.png)

Поменяем приветственное сообщение в <i>config.yaml</i> и перезапустим deployment: `kubectl rollout restart deployment/app-deployment`.

![](img/deployment%20restart.png)

Приветственное сообщение изменилось. Теперь проверим работу daemon после добавления нескольких сообщений в <i>app.log</i>.

![](img/daemon.png)

Также можно посмотреть, выполняются ли `cronjobs`:
![](img/cronjob.png)


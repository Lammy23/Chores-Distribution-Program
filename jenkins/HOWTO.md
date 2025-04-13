
### Command syntax for CLI
```
java -jar jenkins-cli.jar -s http://localhost:8080/ -auth '@.\secret.key' [commands]
```

e.g.

```
java -jar jenkins-cli.jar -s http://localhost:8080/ -auth '@.\secret.key' help
```

```
java -jar jenkins-cli.jar -s http://localhost:8080/ -auth '@.\secret.key' version
```
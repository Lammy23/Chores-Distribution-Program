# Frontend

## Imports

| Package                          | How to install                                                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'react'`                        | `npm install`                                                                                                                                                                                                                                                |
| `'react-router-dom'`             | `npm install react-router-dom`                                                                                                                                                                                                                               |
| `@fortawesome/react-fontawesome` | `npm i --save @fortawesome/fontawesome-svg-core` `npm i --save @fortawesome/free-solid-svg-icons` `npm i --save @fortawesome/free-regular-svg-icons` ` npm i --save @fortawesome/free-brands-svg-icons``npm i --save @fortawesome/react-fontawesome@latest ` |
| `react-loader-spinner`           | `npm install react-loader-spinner --save`                                                                                                                                                                                                                    |

## Note
If you are using a pc change the following files

dbConfig.js
```javascript
host: 'localhost'
```

apiService.js
```javascript
const API_URL = "http://localhost:8000";
```

## How to run
```bash
docker-compose up
```

problems:
i probed with date command and found that docker containers were in a different timezone. crons schedules no work.
solution:
```yml
services:
  your-service:
    environment:
      - TZ=America/Edmonton
```

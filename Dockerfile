FROM node:12-alpine

LABEL "version"="0.0.1"
LABEL "repository"="https://github.com/ShaunLWM/action-steammessage"
LABEL "maintainer"="ShaunLWM"

LABEL "com.github.actions.name"="Steam Notification"
LABEL "com.github.actions.description"="Send a message to Steam."
LABEL "com.github.actions.icon"="smartphone"
LABEL "com.github.actions.color"="blue"

COPY index.js /index.js
COPY package.json /package.json
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
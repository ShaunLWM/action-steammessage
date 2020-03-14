FROM mhart/alpine-node:12

LABEL "version"="0.0.1"
LABEL "repository"="https://github.com/ShaunLWM/action-steammessage"
LABEL "maintainer"="ShaunLWM"

LABEL "com.github.actions.name"="Steam Notification"
LABEL "com.github.actions.description"="Send a message to Steam."
LABEL "com.github.actions.icon"="smartphone"
LABEL "com.github.actions.color"="blue"

COPY package.json index.js yarn.lock /
RUN yarn install
ENTRYPOINT ["node", "/index.js"]
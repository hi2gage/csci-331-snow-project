FROM node:latest


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copying rest of the application to app directory
COPY . /app

# Expose the port and start the application
EXPOSE $PORT

RUN rm /bin/sh \
 && ln -s /bin/bash /bin/sh \
 && mkdir -p /app/.profile.d/ \
 && printf '#!/usr/bin/env bash\n\nset +o posix\n\n[ -z "$SSH_CLIENT" ] && source <(curl --fail --retry 7 -sSL "$HEROKU_EXEC_URL")\n' > /app/.profile.d/heroku-exec.sh \
 && chmod +x /app/.profile.d/heroku-exec.sh \
 && ln -s /usr/bin/python3 /usr/bin/python

ENV LOCAL_OR_HEROKU: heroku

CMD ["npm","start"]

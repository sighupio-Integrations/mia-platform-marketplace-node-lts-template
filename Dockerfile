# Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
# Use of this source code is governed by a proprietary
# license that can be found in the LICENSE file.

FROM reg.sighup.io/r/library/node:18.18-rootless

LABEL maintainer="%CUSTOM_PLUGIN_CREATOR_USERNAME%" \
      name="mia_template_service_name_placeholder" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.1.0"

ARG COMMIT_SHA=<not-specified>

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000

WORKDIR /app

COPY --chown=cloud:SIGHUP package.json /app/package.json
COPY --chown=cloud:SIGHUP package-lock.json /app/package-lock.json

RUN npm install

COPY --chown=cloud:SIGHUP index.js /app/index.js
COPY --chown=cloud:SIGHUP src/ /app/src

RUN echo "mia_template_service_name_placeholder: ${COMMIT_SHA}" >> ./commit.sha

CMD ["node", "index.js"]

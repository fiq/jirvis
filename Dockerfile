FROM node:16 AS nodebuilder
RUN mkdir -p /build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --force

COPY . .
RUN yarn build

FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y nodejs
WORKDIR /myapp
#COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
COPY --from=nodebuilder  /build /myapp
RUN bundle install

# TODO - move into multistage
# RUN nvm use && yarn build

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]

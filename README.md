# Jirvis - A Jarvis like Lean Coach for Jira

A hackday project which attempts to put an Audio interface, utilising the WebSpeech API in front of Jir.
The Avengers use Jira for tracking their heroics and really can't work with its interface. Even Jarvis doesn't want to work directly with Jira, 
so Jirvis is born.

# Building Jirvis

## Docker

`docker build -t jirvis .`


# Running

## Setup a Jira API Token

- Follow this process and Obtain an API token for the backend: 
  - [See Atlassian Docs](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
- Note that the token will have all scopes associated with the Atlassian user.
- Run `rails credentials:edit` and add the following:
```
secret_key_base: XXX_PROVIDED_BY_RAILS_XXX
jira:
  user: The email used to sign up with Jira
  api_key: Your Jira API Key 
  site: https://your_jira_site.atlassian.net/

```

# Run Docker image locally

Start the container by port forwarding from port 3000 to a port you're comfortable with; we'll forward to 1234:

```
docker run -e RAILS_MASTER_KEY=`cat ./config/master.key` -p 3333:3000 jirvis

```

For firefox see https://hacks.mozilla.org/2016/01/firefox-and-the-web-speech-api/

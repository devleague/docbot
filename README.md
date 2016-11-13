# docbot

A service built to utilize IBM's Watson AI to help curate resources for students learning JavaScript.

Teachers send resource candidates to our Node.js (ExpressJS) server which relays the resource to Watson's Alchemy Language service.
Watson returns back an analysis of the resource with high-level semantic information, such as concept tagging and relevance ranking.
We then store that data into our Document Store Database (MongoDB).

Students can retrieve resources via our Slack Channel with the command `/docbot [topic]`, *topic* can be things such as `module pattern`, `Object-Oriented Programming`, `best practices`, or `ORM` for example.

# Developing

**prerequities**

- mongoDB somewhere in the tubes [try mLab](https://mlab.com/)
- ibm watson developer api key [ugh, trial](https://www.ibm.com/watson/developercloud/)
- deployed on public facing server. This is due to how Slack's slask command works
- [slack slash command documentation](https://api.slack.com/slash-commands)

**important**: must have a `.env` file located at the project's root directory. The file should look like:

```
API_KEY={{KEY HERE}}
MONGO_URL='{{mongodb://user:passowrd!@mongourl:51697/docbot}}'
```

## server
see the [README.md][1]

## chrome extension
see the [README.md][2]

# who made this?

Brought to you by **JUST GIT REKT SON** from the middle of the Pacific Ocean.

- Jason
- Gina
- Ray
- Sean

[1]: server/README.md
[2]: chrome-ext/README.md

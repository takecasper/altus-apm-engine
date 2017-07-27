# Kadira Engine

This is the core service where we accept metrics from the client. This app's URL is the Kadira Endpoint we set in `meteorhacks:kadira` package.

This app connects to multiple databases. They are:

* App MongoDB (MONGO_URL) - Which has the user/app info
* Data MongoDB Shard (MONGO_SHARD_URL_<shard-name>) - Accept any number of replica sets as the shard

It's safe to run multiple instance of this for horizontal scaling.


## Setup

### Dependencies

`npm install`

### MongoDB Indexes

Make sure to create the necessary indexes in the DB by running the `indexes.js` file using the Mongo Shell:

`mongo <MONGO_URL> indexes.js`

## Running

Add correct configurations to `../init-shell.sh`. Then apply these commands:

```sh
. ../init-shell
sh run.sh
```

// Run this using the mongo shell
// `mongo <MONGO_URL> indexes.js`

db.systemMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.methodsMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.pubMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.errorMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});

db.rawSystemMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.rawMethodsMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.rawPubMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});
db.rawErrorMetrics.createIndex({"value.startTime": 1, "value.appId": 1, "value.res": 1}, {background: true});

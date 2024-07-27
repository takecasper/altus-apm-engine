var tracerParser = require("./parsers/tracer");
var methodMetricsParser = require("./parsers/methodMetrics");
var pubMetricsParser = require("./parsers/pubMetrics");
var stateManager = require("./stateManager");

var persisters = {
  collection: require("./persisters/collection"),
  trace: require("./persisters/trace"),
};

module.exports = function (app, appDb, appDb) {
  var parsers = [
    {
      type: "appStats",
      parser: require("./parsers/appStats"),
      persister: persisters.collection("appStats", appDb),
    },
    {
      type: "methodRequests",
      parser: tracerParser("methodRequests"),
      persister: persisters.trace("methodTraces", appDb),
    },
    {
      type: "pubRequests",
      parser: tracerParser("pubRequests"),
      persister: persisters.trace("pubTraces", appDb),
    },
    {
      type: "errors",
      parser: require("./parsers/errorTraces"),
      persister: persisters.trace("errorTraces", appDb),
    },
    {
      type: "methodMetrics",
      parser: require("./parsers/methodMetrics"),
      persister: persisters.collection("rawMethodsMetrics", appDb),
    },
    {
      type: "pubMetrics",
      parser: require("./parsers/pubMetrics"),
      persister: persisters.collection("rawPubMetrics", appDb),
    },
    {
      type: "hotSubs",
      parser: require("./parsers/hotSubs"),
      persister: persisters.collection("rawHotSubs", appDb),
    },
    {
      type: "systemMetrics",
      parser: require("./parsers/systemMetrics"),
      persister: persisters.collection("rawSystemMetrics", appDb),
    },
    {
      type: "errorMetrics",
      parser: require("./parsers/errorMetrics"),
      persister: persisters.collection("rawErrorMetrics", appDb),
    },
  ];

  app.use(function (req, res) {
    if (req.method == "POST") {
      parsers.forEach(function (parserInfo) {
        var parsedData = parserInfo.parser(req.body);
        if (parsedData && parsedData.length > 0) {
          parserInfo.persister(req.app, parsedData);

          if (parserInfo.type == "errors") {
            // track initial state for errors;
            stateManager.setState(appDb, req.app, "initialErrorsReceived");
          }
        }
      });

      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(400);
      res.end("cannot get  \n");
    }
  });
};

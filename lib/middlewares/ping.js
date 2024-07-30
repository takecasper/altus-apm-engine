module.exports = function () {
  return function (req, res, next) {
    if (req.url == "/ping") {
      console.log("ping request");
      res.writeHead(200);
      res.end(new Date().getTime().toString());
    } else {
      next();
    }
  };
};

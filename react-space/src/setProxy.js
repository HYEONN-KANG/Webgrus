const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/", {
      target: "http://localhost:3001/",
    }),
    proxy("/notice/create_process", {
      target: "http://localhost:3001/notice/create_process",
    })
  );
};

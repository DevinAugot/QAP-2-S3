const http = require("http");
const routes = require("./routes.js");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
// This is the information feed module
const { news } = require("./news.js");
global.DEBUG = true;
const server = http.createServer(async (request, response) => {
  let path = "./views/";
  let newsPromise = await news();
  // console.logged all routes and they working perfectly

  switch (request.url) {
    case "/":
      path += "index.html";

      response.statusCode = 200;
      // console.log("Home page working");
      routes.indexPage(path, request.url, response);
      break;
    case "/about":
      path += "about.html";
      response.statusCode = 200;
      // console.log("about page working");
      routes.aboutPage(path, request.url, response);
      break;
    case "/contact":
      path += "contact.html";
      response.statusCode = 200;
      // console.log("contact page working");
      routes.contactPage(path, request.url, response);
      break;
    case "/subscribe":
      path += "subscribe.html";
      // console.log("sub page working");
      response.setHeader("Set-cookie", "subscription=New");
      routes.subscribePage(path, request.url, response);
      break;
    case "/news":
      if (DEBUG) console.info(request.url);
      myEmitter.emit("log", request.url, "INFO", "news site was visited");
      response.statusCode = 200;
      response.writeHead(response.statusCode, {
        "Content-Type": "application/json",
      });
      response.write(newsPromise);
      response.end();
      break;
    case "/infoMe":
      path += "infoMe.html";
      response.statusCode = 200;
      // console.log("infoMe page working");
      routes.infoMePage(path, request.url, response);
      break;
    case "/products":
      path += "products.html";
      response.statusCode = 200;
      // console.log("prod page working");
      routes.prodPage(path, request.url, response);

      break;
    case "/about-me":
      // this is a redirect
      response.statusCode = 301;
      response.setHeader("Location", "/about");
      // console.log("Re-directed");
      response.end();
      break;

    default:
      path += "404.html";
      response.statusCode = 404;
      // console.log("404 fired!");
      routes.fourOfourPage(path, request.url, response);

      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});

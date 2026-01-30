const http = require("http");

const MAIL = "/galymzhan_bekseit_gmail_com";

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

http
  .createServer(function (request, response) {
    if (request.url.includes(MAIL)) {
      const myURL = new URL(request.url, "http://localhost:8080");

      const params = myURL.searchParams;

      const x = params.get("x").split(/\{([^}]+)\}/g)[1];
      const y = params.get("y").split(/\{([^}]+)\}/g)[1];

      if (Number.isFinite(Number(x)) && Number.isFinite(Number(y))) {
        response.end(lcm(x, y).toString());
      } else {
        response.end("incorrect");
      }
    } else {
      response.end("incorrect");
    }
  })
  .listen(3000, function () {
    console.log("Сервер запущен по адресу http://localhost:3000");
  });

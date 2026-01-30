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

function isNumberInt(value) {
  return typeof value === "number" && Number.isInteger(value);
}

http
  .createServer(function (request, response) {
    if (request.url.includes(MAIL)) {
      const myURL = new URL(request.url, "http://localhost:8080");

      const params = myURL.searchParams;

      const x = Number(params.get("x").split(/\{([^}]+)\}/g)[1]);
      const y = Number(params.get("y").split(/\{([^}]+)\}/g)[1]);

      if (isNumberInt(x) && isNumberInt(y) && x > 0 && y > 0) {
        response.end(lcm(x, y).toString());
      } else {
        response.end("NaN");
      }
    } else {
      response.end("NaN");
    }
  })
  .listen(3000, function () {
    console.log("Сервер запущен");
  });

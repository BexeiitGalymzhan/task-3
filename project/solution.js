const http = require("http");

const MAIL = "/galymzhan_bekseit_gmail_com";

function gcd(a, b) {
  while (b !== 0n) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function isNaturalString(value) {
  return /^[1-9]\d*$/.test(value);
}

http
  .createServer(function (request, response) {
    response.statusCode = 200;

    if (!request.url.includes(MAIL)) {
      response.end("NaN");
      return;
    }

    const myURL = new URL(request.url, "http://localhost:8080");
    const params = myURL.searchParams;

    const xStr = params.get("x");
    const yStr = params.get("y");

    if (!isNaturalString(xStr) || !isNaturalString(yStr)) {
      response.end("NaN");
      return;
    }

    const x = BigInt(xStr);
    const y = BigInt(yStr);

    response.end(lcm(x, y).toString());
  })
  .listen(3000, function () {
    console.log("Сервер запущен");
  });

const https = require("https");
const http = require("http");

//creating http server that will be called in frontend using axios
http
  .createServer((req, res) => {
    //checking the path to products and run https reqest to shopify server
    if (req.url == "/products") {
      https
        .get(
          {
            hostname: "humourbaba1.myshopify.com",
            path: "/admin/api/2022-04/products.json",
            headers: {
              "X-Shopify-Access-Token":
                "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 ",
            },
          },
          (response) => {
            let data = "";
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              res.write(data);
              res.end();
            });
          }
        )
        .on("error", (err) => {
          res.write(err.message);
        });
    } else if (req.url == "/orders") {
      https
        .get(
          {
            hostname: "humourbaba1.myshopify.com",
            path: "/admin/api/2022-04/orders.json",
            headers: {
              "X-Shopify-Access-Token":
                "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 ",
            },
          },
          (response) => {
            let data = "";
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              res.write(data);
              res.end();
            });
          }
        )
        .on("error", (err) => {
          res.write(err.message);
        });
    }
    //if path is not /products showing error message
    else {
      res.write(`Server Not Found ${req.url}`);
      res.end();
    }
  })
  .listen(5000);

console.log("Starting server on port http://localhost:5000 .....");

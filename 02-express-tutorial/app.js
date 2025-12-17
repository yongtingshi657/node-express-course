const express = require("express");
const app = express();

const { products } = require("./data");

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It Worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((product) => product.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  let sortedProducts = [...products];
  

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

//     if (search) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.name.includes(search);
//     });
//   }

  if(limit){
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  if(price){
    sortedProducts = sortedProducts.filter(product => {
        return product.price < price
    })
  }

  if(sortedProducts.length < 1){
    return res.status(200).json({message:true, data:[]})
  }
  res.json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(3000, () => {
  console.log("server running on Port 3000");
});

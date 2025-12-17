const express = require("express");
const app = express();

const { products, people } = require("./data");

const peopleRouter = require("./routes/people");
const cookieParser = require("cookie-parser");


app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// middleware function
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

app.use(logger);
// app.get("/", logger, (req, res) => {
//   res.end("Hi");
// });

app.use("/api/v1/people", peopleRouter);

// app.get('/api/v1/people', (req, res)=> {
//   res.json(people)
// })

// app.post('/api/v1/people', (req, res)=> {
//   if(!req.body.name){
//     return res.status(400).json({success:false, message:"Please provide a name"})
//   }

//   people.push({id:people.length + 1, name:req.body.name})

//   res.status(201).json({success:true, name:req.body.name})
// })

// login and log off
app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: `This is an Error - name is Needed` });
  }
  res
    .cookie("name", name)
    .status(201)
    .json({ success: true, message: `Hello ${name}`});
});

app.delete("/logoff", (req, res) => {
  res
    .clearCookie("name")
    .status(200)
    .json({ success: true, message: `Successfully Log Off` });
});

app.get('/test', auth, (req, res)=> {
  res
    .status(200)
    .json({ success: true, message: `Hello ${req.user}` });
})

// week 3
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

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (price) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.price < price;
    });
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ message: true, data: [] });
  }
  res.json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(3000, () => {
  console.log("server running on Port 3000");
});

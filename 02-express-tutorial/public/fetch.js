const btn = document.getElementById("btn");
const div = document.getElementById("div");

btn.addEventListener("click", () => {
  renderProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch("/api/v1/products");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function renderProducts() {
  const productdata = await fetchProducts();
  let htmlContent =''
  if (productdata) {
    productdata.forEach((item) => {
      htmlContent += `
            <div>
              <h2>Product Name:${item.name}</h2>
              <p>Price:${item.price}</p>
              <p>Desc:${item.desc}</p>
            </div>
          `;
    });
  }

  div.innerHTML = htmlContent;
}

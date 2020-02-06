document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const getProduct = () => {
    return fetch("https://demo5070043.mockable.io/confidant").then(resp =>
      resp.json()
    );
  };

  const renderProduct = product => {
    const productObj = product.products[0];
    console.log(productObj);

    const sizeOptions = productObj.sizes.map(size => {
      return `<option value="${size}">${size}</option>`;
    });

    const colorOptions = productObj.colors.map(color => {
      return `<option value="${color}">${color}</option>`;
    });

    const paperOptions = productObj.paper_types.map(paper => {
      return `<option value="${paper}">${paper}</option>`;
    });

    const featureTitle = productObj.title
      .split(" ")
      .splice(0, 1)
      .join("")
      .toUpperCase();

    let productPrice = `${productObj.price}`;

    if (productPrice.length === 4) {
      const newPrice = productPrice
        .split("")
        .splice(0, 2)
        .join("");

      productPrice = newPrice;
    }

    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="breadcrumb-container">
                <p class="breadcrumb">Notebooks > ${productObj.title}</p>
          </div>

            <div class="product-container">
                <div class="product-image-container">
                    <img alt="img" class="product-image-block" src="${
                      productObj.carousel_images[0]
                    }">

                </div>

                <div class="product-details-container">
                    <h1 class="product-details-header">${productObj.title}</h1>
                    <p class="product-details-price">$${productPrice}</p>
                    <p class="product-details-summary">${
                      productObj.description
                    }</p>
                    <form>
                        <div class="dropdown-container">
                            <label class="dropdown-label">Size</label>
                            <select class="dropdown">
                                ${sizeOptions}
                            </select>
                        </div>
                        <div class="dropdown-container">
                            <label class="dropdown-label">Color</label>
                            <select class="dropdown">
                                ${colorOptions}
                            </select>
                        </div>
                        <div class="dropdown-container">
                            <label class="dropdown-label">Paper Type</label>
                            <select class="dropdown">
                                ${paperOptions}
                            </select>
                        </div>
                        <button id="${productObj.title
                          .split(" ")
                          .join(
                            "-"
                          )}" class="add-to-cart-button">Add to Cart</button>
                    </form>
                </div>
            </div>
            <div class="product-features-container">
                <div class="product-features-text-block">
                    <h5 class="features-copy-product">${featureTitle}</h5>
                    <h1 class="features-copy-header">The book for ideas.</h1>
                    <p class="features-copy-paragraph">Small enough to go everywhere you go and big enough to work with all day long, whether at home, work, or in transit.</p>
                    <ul class="features-copy-list">
                        <li>Opens Flat</li>
                        <li>Acid-free Paper</li>
                        <li>192 Pages</li>
                    </ul>

                </div>

                <div class="product-features-image-block">
                <img alt="img" class="product-features-image" src="assets/images/confidant_hires_gallery_02@2x.png">
                <p class="product-features-image-title">Signature Clothbound Cover</p>
                </div>
            </div> 

            
    `
    );
  };

  getProduct().then(product => {
    renderProduct(product);
  });
});

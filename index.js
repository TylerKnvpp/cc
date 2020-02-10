document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const nav = document.getElementById("nav-bar");

  const getProduct = () => {
    return fetch("https://demo5070043.mockable.io/confidant").then(resp =>
      resp.json()
    );
  };

  const renderProduct = product => {
    const productObj = product.products[0];

    const sizeOptions = productObj.sizes.map(size => {
      return `<option value="${size}">${size}</option>`;
    });

    const colorOptions = productObj.colors.map(color => {
      return `<option value="${color}">${color}</option>`;
    });

    const paperOptions = productObj.paper_types.map(paper => {
      return `<option value="${paper}">${paper}</option>`;
    });

    // PRODUCT IMAGES
    let carouselImages = [];
    let indexPos = 0;

    const productImages = productObj.carousel_images.map(image => {
      carouselImages.push(
        `<img src="${image}" id="product-image" data-id="product-image" class="product-image-block" alt="${productObj.title}" />`
      );
      return carouselImages;
    });

    document.addEventListener("keydown", function(e) {
      const image = document.getElementById("product-image");

      var code = e.which || e.keyCode;

      if (code == "37") {
        e.preventDefault();
        if (indexPos === 0) {
          indexPos = 4;
          image.src = productObj.carousel_images[indexPos];
        } else {
          indexPos -= 1;
          image.src = productObj.carousel_images[indexPos];
        }
      }

      if (code == "39") {
        e.preventDefault();
        if (indexPos === 4) {
          indexPos = 0;
          image.src = productObj.carousel_images[indexPos];
        } else {
          indexPos += 1;
          image.src = productObj.carousel_images[indexPos];
        }
      }
    });

    document.addEventListener("click", e => {
      const image = document.getElementById("product-image");

      if (e.target.dataset.id === "product-image") {
        if (indexPos === 0) {
          indexPos = 4;
          image.src = productObj.carousel_images[indexPos];
        } else {
          indexPos -= 1;
          image.src = productObj.carousel_images[indexPos];
        }
      }

      if (e.target.dataset.id === "add-to-cart") {
        e.preventDefault();

        const modal = `
        <div id="modal" class="cart-modal">
          <h2 class="modal-header">Added to Cart</h2>
            <div class="modal-product-container">
             <img class="modal-image" src="${productObj.carousel_images[0]}" alt="product" />
             <div class="modal-details-container">
               <p class="modal-product-title">${productObj.title}</p>
                <p class="modal-product-price">$${productPrice}</p>
                </div>
             </div>

             <button class="modal-button">Proceed to checkout</button>
             <a data-action="close-modal" class="modal-link" href="#">Keep Shopping</a>
         </div>
        <div data-action="close-overlay" id="overlay" class="overlay">
          </div>
        `;

        document.body.insertAdjacentHTML("afterbegin", modal);
      }

      if (e.target.dataset.action === "slide-left") {
        if (indexPos === 0) {
          indexPos = 4;
          image.src = productObj.carousel_images[indexPos];
        } else {
          indexPos -= 1;
          image.src = productObj.carousel_images[indexPos];
        }
      }

      if (e.target.dataset.action === "slide-right") {
        if (indexPos === 4) {
          indexPos = 0;
          image.src = productObj.carousel_images[indexPos];
        } else {
          indexPos += 1;
          image.src = productObj.carousel_images[indexPos];
        }
      }

      if (e.target.dataset.action === "close-modal") {
        e.preventDefault();
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("overlay");
        overlay.remove();
        modal.remove();
      }

      if (e.target.dataset.action === "close-overlay") {
        e.preventDefault();
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("overlay");
        overlay.remove();
        modal.remove();
      }
    });

    // FEATURES TITLE
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

    const productToRender = `
        <div class="breadcrumb-container">
                <p class="breadcrumb">Notebooks > ${productObj.title}</p>
          </div>

            <div class="product-container">
                <div class="product-image-container">
                   <img src="http://plug.nyc/wp-content/uploads/2020/02/Path-1510.svg" alt="previous image" class="chevron-left" data-action="slide-left"  />
                    ${carouselImages[indexPos]}
                   <img src="http://plug.nyc/wp-content/uploads/2020/02/Path-1510.svg" alt="previous image" class="chevron-right" data-action="slide-right" />
                </div>

                <div class="product-details-container">
                <div class="product-details-title-price-container">
                    <h1 class="product-details-header">${productObj.title}</h1>
                    <p class="product-details-price">$${productPrice}</p>
                    </div>
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
                        <button data-id="add-to-cart" id="${productObj.title
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
                        <li class="list-item">Opens Flat</li>
                        <li class="list-item">Acid-free Paper</li>
                        <li class="list-item">192 Pages</li>
                    </ul>

                </div>

                <div class="product-features-image-block">
                <img alt="img" class="product-features-image" src="assets/images/confidant_hires_gallery_02@2x.png">
                <p class="product-features-image-title">Signature Clothbound Cover</p>
                </div>
            </div>

    `;

    nav.insertAdjacentHTML("afterend", productToRender);
  };

  getProduct().then(product => {
    renderProduct(product);
  });
});

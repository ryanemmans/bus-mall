
// 1. Display 3 products to pick a favorite

// Create constructor function that creates object for each product
// Has following properties: name, image file path, times image has been shown

// Randomly generate 3 unique product images displayed side-by-side

// Increment # of times it has been shown

// Attach event listener to HTML where images will be displayed

// Once user clicks a product, display 3 new products

// 2. Define property for # of times a product has been clicked in constructor
// Update this property after each selection

// 3. Limit # of rounds user can click to 25, keep in a variable

// 4. Report of all results should be viewable after voting has concluded
// Attach property to constructor that keeps track of all products
// Remove event listener after all rounds have completed

// ADD A BUTTON with the text "View Results" which will display all products, votes, and # of times seen
// Example: banana had 3 votes, and was seen 5 times.

'use strict';
// console.log('hello world');

// ------------------------------------- Global Variables -------------------------------------  //
const ulElem = document.getElementById('results');
const voteSectionElem = document.getElementById('all_products');
const productAImgElem = document.getElementById('product_A_img');
const productBImgElem = document.getElementById('product_B_img');
const productCImgElem = document.getElementById('product_C_img');
const productAH2Elem = document.getElementById('product_A_h2');
const productBH2Elem = document.getElementById('product_B_h2');
const productCH2Elem = document.getElementById('product_C_h2');

let productA = null;
let productB = null;
let productC = null;

let clickCounter = 25;

// ------------------------------------- Constructor -------------------------------------  //
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.views = 0;
  this.votes = 0;
  // Technically this function should not do external processes. It is made to define features of a 'product'
}

Product.allProducts = [];

// ------------------------------------- Prototype Methods -------------------------------------  //

Product.prototype.renderProduct = function (img, h2) {
  img.src = this.imgPath;
  img.alt = this.name;
  h2.textContent = this.name;
  this.views++;
};

// ------------------------------------- Standard Global Functions -------------------------------------  //
function getThreeProducts() {
  const doNotUse = [productA, productB, productC];
  while (doNotUse.includes(productA)) {
    let indexA = Math.floor(Math.random() * Product.allProducts.length);
    productA = Product.allProducts[indexA];
  }
  doNotUse.push(productA);

  while (doNotUse.includes(productB)) {
    let indexB = Math.floor(Math.random() * Product.allProducts.length);
    productB = Product.allProducts[indexB];
  }
  doNotUse.push(productB);

  while (doNotUse.includes(productC)) {
    let indexC = Math.floor(Math.random() * Product.allProducts.length);
    productC = Product.allProducts[indexC];
  }
  doNotUse.push(productC);
  console.log(doNotUse);
}

function renderAllProducts() {
  productA.renderProduct(productAImgElem, productAH2Elem);
  productB.renderProduct(productBImgElem, productBH2Elem);
  productC.renderProduct(productCImgElem, productCH2Elem);
}

function renderResults() {
  ulElem.textContent = '';
  for (let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes} Votes, ${product.views} Views`;
    ulElem.appendChild(liElem);
  }
}

function makeProductChart() {
  let ctx = document.getElementById('productChart').getContext('2d');
  let productNames = [];
  let productViews = [];
  let productVotes = [];
  // let colorArray = [];
  for (let product of Product.allProducts) {
    productNames.push(product.name);
    productViews.push(product.views);
    productVotes.push(product.votes);
  }

  let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        borderColor: 'rgba(0, 0, 0)',
        borderWidth: 1,
        borderRadius: 3,
        hoverBackgroundColor: 'rgba(200, 200, 200, 0.8)',
        HoverBorderRadius: 3,
      }, {
        label: 'Votes',
        data: productVotes,
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        borderColor: 'rgba(0, 0, 0',
        borderWidth: 1,
        borderRadius: 3,
        hoverBackgroundColor: 'rgba(255, 0, 0, 1.0)',
        HoverBorderRadius: 3,
      }]
    },
    options: {
      // indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          stacked: false
        },
        y: {
          beginAtZero: true,
          stacked: false
        }
      }
    }
  });
}

function handleClick(e) {
  const imageClicked = e.target.id;
  if (imageClicked === 'product_A_img' || imageClicked === 'product_B_img' || imageClicked === 'product_C_img') {
    clickCounter--;
    if (imageClicked === 'product_A_img') {
      productA.votes++;
    }
    if (imageClicked === 'product_B_img') {
      productB.votes++;
    }
    if (imageClicked === 'product_C_img') {
      productC.votes++;
    }
    getThreeProducts();
    renderAllProducts();
  }
  if (clickCounter === 0) {
    voteSectionElem.removeEventListener('click', handleClick);
    alert('View Results');
    renderResults();
    makeProductChart();
  }
}

// BUTTON possibilities: hidden visibility, css class attribute, listener turn button on

// ------------------------------------- Listener -------------------------------------  //

voteSectionElem.addEventListener('click', handleClick);

// ------------------------------------- Call Functions -------------------------------------  //

Product.allProducts.push(new Product('Bag', './img/bag.jpg'));
Product.allProducts.push(new Product('Banana', './img/banana.jpg'));
Product.allProducts.push(new Product('Bathroom', './img/bathroom.jpg'));
Product.allProducts.push(new Product('Boots', './img/boots.jpg'));
Product.allProducts.push(new Product('Breakfast', './img/breakfast.jpg'));
Product.allProducts.push(new Product('Bubblegum', './img/bubblegum.jpg'));
Product.allProducts.push(new Product('Chair', './img/chair.jpg'));
Product.allProducts.push(new Product('Cthulhu', './img/cthulhu.jpg'));
Product.allProducts.push(new Product('Dog-Duck', './img/dog-duck.jpg'));
Product.allProducts.push(new Product('Dragon', './img/dragon.jpg'));
Product.allProducts.push(new Product('Pen', './img/pen.jpg'));
Product.allProducts.push(new Product('Pet-Sweep', './img/pet-sweep.jpg'));
Product.allProducts.push(new Product('Scissors', './img/scissors.jpg'));
Product.allProducts.push(new Product('Shark', './img/shark.jpg'));
Product.allProducts.push(new Product('Sweep', './img/sweep.png'));
Product.allProducts.push(new Product('Tauntaun', './img/tauntaun.jpg'));
Product.allProducts.push(new Product('Unicorn', './img/unicorn.jpg'));
Product.allProducts.push(new Product('Water-Can', './img/water-can.jpg'));
Product.allProducts.push(new Product('Wine-Glass', './img/wine-glass.jpg'));

getThreeProducts();
renderAllProducts();

// console.log(Product.allProducts);

// ------------------------------------- Old Code -------------------------------------  //


// let indexB = Math.floor(Math.random() * Product.allProducts.length);
// productB = Product.allProducts[indexB];
// let indexC = Math.floor(Math.random() * Product.allProducts.length);
// productC = Product.allProducts[indexC];
// while (productB === null || productB === productA || productB === productC) {
//   indexB = Math.floor(Math.random() * Product.allProducts.length);
//   productB = Product.allProducts[indexB];
// }
// while (productC === null || productC === productA || productC === productB) {
//   indexC = Math.floor(Math.random() * Product.allProducts.length);
//   productC = Product.allProducts[indexC];
// }
// Product.allProducts[indexA].views++;
// Product.allProducts[indexB].views++;
// Product.allProducts[indexC].views++;

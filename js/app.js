
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
debugger;

// ------------------------------------- Global Variables -------------------------------------  //
let clickCounter = 0;
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

// ------------------------------------- Constructor -------------------------------------  //
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  // this.views = 0;
  this.votes = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];


// ------------------------------------- Prototype Methods -------------------------------------  //
// I will tell the function which img elem and h2 elem I should use
Product.prototype.renderProduct = function (img, h2) {
  img.src = this.imgPath;
  h2.textContent = this.name;
};

// ------------------------------------- Standard Global Functions -------------------------------------  //
function getThreeProducts() {
  // picks 3 products at random from an array of products
  let indexA = Math.floor(Math.random() * Product.allProducts.length);
  productA = Product.allProducts[indexA];
  let indexB = Math.floor(Math.random() * Product.allProducts.length);
  productB = Product.allProducts[indexB];
  let indexC = Math.floor(Math.random() * Product.allProducts.length);
  productC = Product.allProducts[indexC];
  // while (productA === null || productA === productB || productA === productC) {
  //   productA = Math.floor(Math.random() * Product.allProducts.length);
  //   productA = Product.allProducts[indexA];
  // }
  while (productB === null || productB === productA || productB === productC) {
    productB = Math.floor(Math.random() * Product.allProducts.length);
    productB = Product.allProducts[indexB];
  }
  while (productC === null || productC === productA || productC === productB) {
    productC = Math.floor(Math.random() * Product.allProducts.length);
    productC = Product.allProducts[indexC];
  }
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
    liElem.textContent = `${product.name}: ${product.votes}`;
    ulElem.appendChild(liElem);
  }
}

function handleClick(e) {
  let imageClicked = e.target.id;
  if (imageClicked === 'product_A_img' || imageClicked === 'product_B_img' || imageClicked === 'product_C_img') {
    clickCounter++;
    if (imageClicked === 'product_A_img') {
      productA.votes++;
      // console.log(productA);
    }
    if (imageClicked === 'product_B_img') {
      productB.votes++;
      // console.log(productB);
    }
    if (imageClicked === 'product_C_img') {
      productC.votes++;
      // console.log(productC);
    }
    getThreeProducts();
    renderAllProducts();
  }
  if (clickCounter === 5) { // Change to 25 once everything works
    // alert('show the product totals');
    renderResults();
    voteSectionElem.removeEventListener('click', handleClick);
  }
}

// ------------------------------------- Listener -------------------------------------  //

voteSectionElem.addEventListener('click', handleClick);

// ------------------------------------- Call Functions -------------------------------------  //

new Product('R2D2 Suitcase', './img/bag.jpg');
new Product('Banana Slicer', './img/banana.jpg');
new Product('Tablet Toilet Mount', './img/bathroom.jpg');
new Product('Rain Boots', './img/boots.jpg');
new Product('Breakfast Machine', './img/breakfast.jpg');
new Product('Meatball Bubble Gum', './img/bubblegum.jpg');
new Product('Chair', './img/chair.jpg');
new Product('Cthulhu Toy', './img/cthulhu.jpg');
new Product('Dog Duck', './img/dog-duck.jpg');
new Product('R2D2 Suitcase', './img/bag.jpg');
new Product('Dragon Meat', './img/dragon.jpg');
new Product('Pen Utensils', './img/pen.jpg');
new Product('Pet Sweep', './img/pet-sweep.jpg');
new Product('Pizza Scissors', './img/scissors.jpg');
new Product('Shark Sleeping Bag', './img/shark.jpg');
new Product('Tauntaun Sleeping Bag', './img/tauntaun.jpg');
new Product('Unicorn Meat', './img/unicorn.jpg');
new Product('Water Can', './img/water-can.jpg');
new Product('Wine Glass', './img/wine-glass.jpg');
new Product('Baby Sweep', './img/sweep.png');

getThreeProducts();
renderAllProducts();

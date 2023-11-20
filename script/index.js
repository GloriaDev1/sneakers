

const sneaker_tag = document.querySelector(".main-right-section h2");


function createInfoComponent(company_name, edition, description, old_price, discount) {
   // get the info details div
   let info_detail_div = document.querySelector('.main-right-section #info-detail');

   //clear existing element already existing in the info details in preparation
   //for adding newly created element
   info_detail_div.innerHTML = "";
    
    
    // How to create elemnet 
    const h2 = document.createElement("h2")     //ie<h2></h2>
    
    //How to add properties to that element
    h2.innerText = company_name;
    h2.style.color = "blue";
    h2.className = "title_header";

    //Another way of specifying attribute 
    h2.setAttribute('class', "title_header");

    const h1 = document.createElement("h1")    
    h1.innerText = edition;

    const p = document.createElement("p")    
    p.id= "product-description"
    p.innerText = description;

    // His own Method  //string templating method add +=
    let html_price_bundle = `<div class="price-bundle">
    <span id="product-price"> $${(old_price - (old_price*(discount/100))).toFixed(2)} </span>
    <span id="discount-rate">${discount}%</span>
  </div>
  <span id="old-price">$${old_price.toFixed(2)}</span>`

  //ADDING ELEMENTS TO THE PAGE
  info_detail_div.appendChild(h2);
  info_detail_div.appendChild(h1);
  info_detail_div.appendChild(p);         
  // if the element is created using the string template method
  info_detail_div.innerHTML += html_price_bundle; 
}


//Working on counter
//selecting all the element involved in the counter
let counter_parent_div = document.querySelector('.left-side');
let remove_span = counter_parent_div.querySelector('#remove');
let add_span = counter_parent_div.querySelector('#add');
let counter = counter_parent_div.querySelector('#count-panel');

// adding event listener
remove_span.addEventListener('click', increaseOrDecreaseCounter);
add_span.addEventListener('click', increaseOrDecreaseCounter);


// Creating the main funtion that increase or Decrease the counter
function increaseOrDecreaseCounter(event){
  let element = event.target;
  let present_qty = Number(counter.innerText);
  if(element.id == 'remove' || element.id == 'minus'){
    //check the current value if it is less than or equal to zero
    if(present_qty <=0){
      present_qty = 0;
    }else {
      present_qty--;   
    }
  }else if(element.id == 'add' || element.id =='plus'){
    //checking the current value if it is less than or equal to zero
    present_qty++;
  }
  counter.innerText = present_qty;
  
}


const mainProductImage = document.getElementById('product-main-img');
const productThumbnails = document.querySelectorAll('.thumbnail');

const iconLeft = document.getElementById('icon-left');
const iconRight = document.getElementById('icon-right');

//used to keep track of active thumbnail imag
let activeThumbnailIndex =0;

//Function to display the active thumbnail image in the main product image 
function displayActiveThumbnail() {
  // retrieve the active thumbnail image
  let thumbnail = productThumbnails[activeThumbnailIndex]

  // set the main product image src to be equal to the thumbnail source image
  mainProductImage.src = thumbnail.src;

  // update the product info component
  retrieveProductClickedFromDatabase(thumbnail)
  
  //Add the animation class to the main product image
  mainProductImage.classList.add('animate-pop-out');


  setTimeout(() => {
    mainProductImage.classList.remove('animate-pop-out');
  },
  300);  // The same duration as the popOut animation (0.3s)
}

// Function to update the active thumbnail and display it 
function updateActiveThumbnail(index) {
  activeThumbnailIndex = index;
  displayActiveThumbnail();
  updateActiveThumbnailBorder();
}

//Function to add active border to the active thumbnail
function updateActiveThumbnailBorder() {
  productThumbnails.forEach((thumbnail, index) => {
    if (index === activeThumbnailIndex) {
      thumbnail.classList.add('active-thumbnail');
    } else {
      thumbnail.classList.remove('active-thumbnail');
    }
  });
}

//Function to handle clicking on the left icon 
function handleLeftIconClick() {
  if (activeThumbnailIndex > 0) {
    updateActiveThumbnail(activeThumbnailIndex -1);
    autoScrollToThumbnailImage()
  }
}

// Function to handle clicking on the right icon
function handleRightIconClick() {
  if (activeThumbnailIndex < productThumbnails.length -1) {
    updateActiveThumbnail(activeThumbnailIndex + 1);
    autoScrollToThumbnailImage()
  }
};

function autoScrollToThumbnailImage(){
  // get the position of the active thumbnail image so as to enable auto scroll
  const thumbnail_cordinate = productThumbnails[activeThumbnailIndex].getBoundingClientRect()
  const x_cordinate = thumbnail_cordinate.x;
  const width_cordinate = thumbnail_cordinate.width
  position = activeThumbnailIndex == 0 ? 0 : x_cordinate-width_cordinate
  document.querySelector('.main-left-section .product-thumbnail').scrollTo(position,0)
}

//Adding event listeners for left and right icon clicks
iconLeft.addEventListener('click', handleLeftIconClick);
iconRight.addEventListener('click', handleRightIconClick);

// Add event listeners for thumbnail click 
productThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () =>{
    updateActiveThumbnail(index);
  });
});

function retrieveProductClickedFromDatabase(thumbnail){
    const id = thumbnail.dataset.productId;
    // retrieve the product from the database

    let product_found = PRODUCTCATALOGUE.find(prod => prod.product_id == id);

    if (product_found){
      // UTILZING OBJECT DESTRUCTURING to bring out relevant details about a variable
      let {companyName, productName, description, oldPrice, discountRate} = product_found;
      // clean the data such as oldPrice,discountRate
      discountRate = Number(discountRate.replace("%",''));
      oldPrice = Number(oldPrice.replace('$',''));

      // now update the productInfo to the HTML
      createInfoComponent(companyName,productName, description, oldPrice, discountRate)
    }

    // now update the product id as a data attribute to the info detail div
    let info_detail_div = document.querySelector('.main-right-section #info-detail');
    info_detail_div.dataset.productId = id;
}


// Display the initial active thumbnail image
displayActiveThumbnail();


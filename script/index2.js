
const cart_icon = document.querySelector('#icon-cart');
const cart_main_div = document.querySelector('#inside-cart')
const cart_items = cart_main_div.querySelector('#cart-is-fill');
const checkout_button = cart_main_div.querySelector('#inside-cart-checkout');

const delete_all_cart_item = document.querySelector('#icon-delete-all');

const main_right_section = document.querySelector('.main-right-section');
const add_to_cart_btn = main_right_section.querySelector('#add-to-cart');


//CART ITEMS REP PRODUCT ADDED TO CART BY THE USER
let CARTITEMS = [];
let QUANTITYINCART = {};

add_to_cart_btn.addEventListener('click',evt =>{
    //STEPS 
    /**
     * - GET ID of active product
     * - retrieve the product detail from the product catalogue
     * - automatically set quantity to 1 if quantity is zero
     * - store items into an array aka cart_items
     * - add item to cart 
     **/
    let id = document.querySelector('#info-detail').dataset.productId;

    // checking if item is already in cart before proceeding further
    const should_not_proceed = isItemInCart(id);
    
    if(!should_not_proceed){
        let product_found = PRODUCTCATALOGUE.find(prod => prod.product_id == id);
        
        // quantity etc
        let quantity_span = main_right_section.querySelector('#count-panel');
        let quantity = Number(quantity_span.innerText);
        
        if(quantity <= 0 ){
            quantity = 1;
            quantity_span.innerText = quantity;
        }

        let {productName, src} = product_found;
        let price = main_right_section.querySelector('#info-detail #product-price').innerText;
        price = Number(price.replace("$",""))
        let amount = price * quantity;
        CARTITEMS.push({
            id,productName,src,price,quantity,amount
        })

        // adding element now to cart html item
        const str_element = createAddedToCartComponent(id,productName,src,price,quantity);
        addCartElementToHTMLDOM(str_element)
        
        // TRACKING QUTY OF A PARTICULAR PRODUCT ADDED TO CART
        QUANTITYINCART[id] = quantity

        // call this function to update the cart icon number
        updateCartIconNumber();
        alert('item just added to cart')
    }else{
        alert('item already in cart')
    }
    
})

// CHECKS IF ITEM BASED ON IT ID IS ALREADY IN CARTITEMS VARIABLE
function isItemInCart(id){
    // check if product has already been added to cart 
    const is_in_cart = CARTITEMS.find(item => item.id == id);
    if(is_in_cart){
        return true;
    }else{
        return false;
    }
}

// THIS TAKES THE HTML STRING TEMPLATE RETURNED FROM THE creatrAddedToCartComponent AND THEN PARSE IT INTO THE CART HTML DOM 
function addCartElementToHTMLDOM(element_string){
    let div = document.createElement('div');
    div.innerHTML =element_string;
    const real_element =  div.firstElementChild
    cart_items.insertBefore(real_element,cart_items.querySelector("#cart-total"));

    // reupdate the price
    calculateCartTotalPrice();
}

function createAddedToCartComponent(id,product_name,img_src,price,quantity){
    let element = `<div id="cart-fill-container" data-product-id=${id}>
          <img
            id="inside-cart-product-img"
            src=${img_src}
            alt=""
          />
          <div id="inside-cart-product-details">
            <p id="inside-cart-product-name" class="inside-text">
             ${product_name}
            </p>
            <div id="calculate">
              <p id="inside-cart-product-price" class="inside-text">$${price.toFixed(2)}</p>
              <p id="inside-cart-product-howmany" class="inside-text">x ${quantity}</p>
              <p id="inside-cart-product-calculated-price">$${(price * quantity).toFixed(2)}</p>
            </div>
          </div>
          <img id="icon-delete" src="images/icon-delete.svg" alt="" onclick="deleteCartItem(event)" />
        </div>`
        return element;
}
// ENABLING the cart icon to display the products in cart when clicked
cart_icon.addEventListener('click',evt =>{
    let display = cart_main_div.style.display
    if(display == 'none'){
        cart_main_div.style.display = 'block';
        
        //Add the animation class
        cart_main_div.classList.add('animate-pop-out');
        setTimeout(() => {
            cart_main_div.classList.remove('animate-pop-out');
            },
        300);

    }else{
        //animate-pop-in
        cart_main_div.classList.add('animate-pop-in');
        setTimeout(() => {
            cart_main_div.classList.remove('animate-pop-in');
            cart_main_div.style.display = 'none';
            },
        150);
        
    }   
});

// THIS EVENT LISTENER DELETES ALL ITEM FROM CART
delete_all_cart_item.addEventListener('click',evt =>{
    let carts = Array.from(cart_items.children);
    
    carts.forEach(element =>{
        if(element.id == 'cart-fill-container'){
            element.remove();
        }
    })

   CARTITEMS = []
   // call this function to update the cart icon number
   updateCartIconNumber();

   calculateCartTotalPrice();

});

// woriking on deleting each cart item individually using onclick defined in html
function deleteCartItem(event){
    // first get the element that was clicked
    const btn_delete = event.target;
    // select it parent Element
    const parent = btn_delete.parentElement;
    
    parent.remove();

    // UPDATE THE CART TOTAL WHEN AN ITEM IS BEEN DELETED FROM CART
    calculateCartTotalPrice()

    // removing product from array cartitems variable 
    let product_id = parent.dataset.productId
    removeProductBasedOnIdFromCartItems(product_id);    

    // call this function to update the cart icon number
    updateCartIconNumber()
}

// working on cacluating the total price of all items in the cart

function calculateCartTotalPrice(){
    const cart_prices = cart_items.querySelectorAll('#inside-cart-product-calculated-price');
    // next step is looping over each of the cart price
    let total_price = 0;
    cart_prices.forEach(element=>{
        price = Number(element.innerText.replace('$',''));
        total_price += price;
    })
    cart_items.querySelector('#cart-total p').innerText = `$${total_price.toFixed(2)}`
}

// REMOVE ITEM FROM CARTITEMS
function removeProductBasedOnIdFromCartItems(id){
    CARTITEMS = CARTITEMS.filter(item => item.id != id);
}

// UPDATE PRODUCT QUANTITY OF A PARTICULAR CARTITEMS. THIS TAKES IN ID OF PRODUCT AND THE NEW QUANTITY VALUE
function updateParticularCartItemQuantity(id, new_quantity){
    CARTITEMS.forEach(item =>{
        if(item.id == id){
            item.quantity = new_quantity;
           return;
        }
    })
}

//ADDING EVENTLISTENER TO productThumbnails nodelist variables already in our former index.js file 
productThumbnails.forEach(thumbnail =>{
    thumbnail.addEventListener('click',evt =>{
        id = thumbnail.dataset.productId
        setCounterPanelQuantity(id)
    })
})

iconLeft.addEventListener('click', evt =>{
    const id= productThumbnails[activeThumbnailIndex].dataset.productId;
    setCounterPanelQuantity(id)
});

iconRight.addEventListener('click', evt =>{
    const id= productThumbnails[activeThumbnailIndex].dataset.productId;
    setCounterPanelQuantity(id)
});

// A FUNCTION THAT SETS THE COUNTER PANEL QUANTITY BASED ON THE ACTIVE THUMBNAIL data-product-id 
function setCounterPanelQuantity(id){
    let quantity = 0;
    const already_in_cart = QUANTITYINCART.hasOwnProperty(id);
    if(already_in_cart){
        quantity = QUANTITYINCART[id]
    }
    document.querySelector('.main-right-section #counter #count-panel').innerText=quantity;
}

// ADDING EVENT LISTENER TO add_span AND remove_span SO AS TO UPDATE PRODUCT PRICE IN CART IF ITEM ALREADY IN CART
add_span.addEventListener('click', eventHandlerForUpdatingProductInCart);
remove_span.addEventListener('click', evt =>{
    let active_product_id = document.querySelector('.main-right-section #info-detail').dataset.productId;
    if(Number(counter.innerText) <= 0 && QUANTITYINCART.hasOwnProperty(active_product_id)){
        
        // REMOVE THE HTML PRODUCT REPRESENTATION FROM THE DOM
        document.querySelector(`#cart-is-fill [data-product-id="${active_product_id}"]`).remove();
        
        // REMOVE IT FROM THE QUANTITYINCART TRACKER
        removeProductIdFromQuantityInCart(active_product_id);

        // ALSO REMOVE IT IN CARTITEM ARRAY VARIABLE
        removeProductBasedOnIdFromCartItems(active_product_id);

        // call this function to update the cart icon number
        updateCartIconNumber()

        // recalculate total amount of products in cart item  
        calculateCartTotalPrice();
        alert(`product with id ${active_product_id} has been removed from cart`)

    }else{
        eventHandlerForUpdatingProductInCart(evt)
    }
    
});

//THIS FUNCTION WILL ENABLE THE PRODUCT CART HTML ELEMENT QUANTTITY AND AMOUNT TO PAY FOR THAT PRODUCT TO BE UPDATED
function eventHandlerForUpdatingProductInCart(event){
    let active_product_id = document.querySelector('.main-right-section #info-detail').dataset.productId;
   if(QUANTITYINCART.hasOwnProperty(active_product_id)){

        // NOW SELECT THAT PRODUCT IN THE HTML CART 
    let html_product = document.querySelector(`#cart-is-fill [data-product-id="${active_product_id}"]`);
    // get the price of the product 
    const price_of_product = Number(html_product.querySelector("#calculate #inside-cart-product-price").innerText.replace("$",''));
    
    // select element that needs too be updated
    const quantity_element = html_product.querySelector("#calculate #inside-cart-product-howmany");
    const total_amount_element = html_product.querySelector("#calculate #inside-cart-product-calculated-price");

    // perform the updates
    // counter has already been defined in the index.js where it represent the count value of product the user is inputing

    const new_quantity = Number(counter.innerText);
    quantity_element.innerText = `x ${new_quantity}`
    total_amount_element.innerText = `$${(new_quantity * price_of_product).toFixed(2)}`

    // now update quantity in cart variable tracker
    QUANTITYINCART[active_product_id] = new_quantity

    // ALSO UPDATE THE QUANTITY VALUE OF THIS PARTICULAR PRODUCT IN THE CART ITEM ARRAY VARIABLES
    updateParticularCartItemQuantity(active_product_id, new_quantity)
    
    // recalculate the total cart item prices
    calculateCartTotalPrice();
   }
   else{
    console.log('Item not in cart')
   }
}

// a function that removes a key from QUANTITYINCART 
const removeProductIdFromQuantityInCart = (id) =>{
    let new_object = {}
    for (key in QUANTITYINCART){
        if(key != id){
            new_object[key] = QUANTITYINCART[key]
        }
    }

    // now set the QUANTITYINCART TO NOW BE THIS NEW OBJECT 
    QUANTITYINCART =new_object;

}

// A FUNCTION THAT IS MEANT TO UPDATE THE CART ICON NUMBER REPRESENTING TOTAL NUMBER OF  DIFFERENT PRODUCT IN CART
function updateCartIconNumber(){
    document.querySelector('.top-right-cart-container #icon-cart-number').innerText = CARTITEMS.length;
}
// this will auto calculate cart item prices if items are in cart
calculateCartTotalPrice();


//WORKING ON CHECKOUT BUTTON 

checkout_button.addEventListener('click',evt =>{
    if(CARTITEMS.length < 1){
        alert('You can not check out on an empty cart');
    }else{
        alert('Checking out');
        sessionStorage.setItem('ecom-footwear-checkout-item', JSON.stringify(CARTITEMS));
        window.location.href = './checkout.html';
    }
})
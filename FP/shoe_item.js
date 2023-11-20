

class ShoeItem {

    constructor(id, imageLink, title,companyName, summary, description,category,collection,oldPrice,discount) {
        this.id = id;
        this.imageLink = imageLink;
        this.companyName = companyName;
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.price = this.calculateDiscountPrice(oldPrice,discount);
        this.category = category;
        this.collection = collection;
        this.oldPrice = oldPrice;
        this.discount = discount;
        this.quantity = 0;
        this.addedToCart = false;
        this.element = this.createShoeElement();
        this.setupEventListeners();
    }

    calculateDiscountPrice(oldPrice,discount){
    	let decimal_value = Number(discount.replaceAll("%",""))/100;
    	let old_price = Number(oldPrice.replace("$",""))
    	let new_price = old_price - (decimal_value * old_price);
    	return new_price;
    }

    createShoeElement() {
        let shoe = `
            <div class="shoe-item">
                <span class="added">${this.addedToCart ? 'added' : ''}</span>
                <img class="shoe-image" src="${this.imageLink}">
                <div class="shoe-title">${this.title}</div>
                <div class="shoe-description">${this.summary} 
                    <a href="#" data-link-id=${this.id}>more detail</a>
                </div>
                <div class="price-bundle">
                    <span id="product-price">$${this.price.toFixed(2)}</span>
                    
                    <span id="discount-rate">${this.discount}</span>
                </div>
                <svg class="svg-icon-cart ${this.addedToCart ? 'icon-added-state' : 'icon-unadded-state'}" width="22" height="20">
                    <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#FFFFFF" fill-rule="nonzero"></path>
                </svg>
            </div>
        `;

        let tempContainer = document.createElement('div');
        tempContainer.innerHTML = shoe;

        return tempContainer.firstElementChild;
    }

    setupEventListeners() {
        let cartIcon = this.element.querySelector('.svg-icon-cart');
        cartIcon.addEventListener('click', () => {
            if (!this.addedToCart) {
                this.addedToCart = true;
                this.quantity = 1;
            } else {
                this.quantity = 0;
                this.addedToCart = false;
            }

            this.updateShoeElement();
        });
    }

    updateShoeElement() {
        let addedSpan = this.element.querySelector('.added');
        addedSpan.textContent = this.addedToCart ? 'added' : '';

        // let quantitySpan = this.element.querySelector('.quantity');
        // quantitySpan.textContent = this.quantity;

        let cartIcon = this.element.querySelector('.svg-icon-cart');
        cartIcon.classList.toggle('icon-unadded-state');
        cartIcon.classList.toggle('icon-added-state');
    }
}


class ShoeWarehouse{

    constructor(product_catalogue){
        /**
         * product_catalogue is an array of products containing an object having keys such as
         *  product_id: number;
            companyName: string;
            productName: string;
            summary: string;
            description: string;
            price: string;
            discountRate: string;
            oldPrice: string;
            src: string;
            collection: string;
            category: string;
         */
        // running this method so as to initialize all the different categories of shoe collections and category
        this.createShoeProduct(product_catalogue);
    }

    createShoeProduct(product_catalogue){
        this.all_shoe = [];
        this.men_collection = [];
        this.women_collection = [];
        this.unisex_collection = []
        product_catalogue.forEach(product => {

            // destructuring key value from an object
            let {product_id,companyName,productName,summary,description,discountRate,oldPrice,src,collection,category} = product;
    
            const shoe = new ShoeItem(product_id,src,productName,companyName,summary,description,category,collection,oldPrice,discountRate);

            // first add this shoe object created to the all_shoe variable
            this.all_shoe.push(shoe);

            // split the shoe into different collection
            if(collection.toLowerCase() === 'men'){
                this.men_collection.push(shoe);
            }
            else if(collection.toLowerCase() === 'women'){
                this.women_collection.push(shoe);
            }
            else if(collection.toLowerCase() === 'unisex'){
                this.unisex_collection.push(shoe);
            }
        });
    }
} 
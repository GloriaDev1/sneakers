
// first step load the product catalogue into the ware house
const shoe_factory = new ShoeWarehouse(PRODUCTCATALOGUE);

//creating a function that will load selected wear collections into our html page
// id : h1-collection-selected
//class : shoe-collection
function loadShoeItemToPage(collection_to_display){
    const h1_title = document.querySelector('#h1-collection-selected');
    const shoe_collection_div = document.querySelector('.shoe-collection');

    // clearing previous items inside the collection div
    shoe_collection_div.innerHTML = '';
    
    if(collection_to_display === 'men'){
        h1_title.innerText = 'Men Collection';

        // looping over the men shoe object inside the shoe factory 
        shoe_factory.men_collection.forEach(shoe =>{
            let {element} = shoe;
            addZeroOpacity(element);
            shoe_collection_div.appendChild(element);
            removeOpacity(element)
        }

        )
    }
    else if(collection_to_display === 'women'){
        h1_title.innerText = 'Women Collection';

        // looping over the women shoe object inside the shoe factory 
        shoe_factory.women_collection.forEach(shoe =>{
            let {element} = shoe;
            addZeroOpacity(element);
            shoe_collection_div.appendChild(element);
            removeOpacity(element);

        }

        )
    }
    else if(collection_to_display === 'unisex'){
        h1_title.innerText = 'Unisex Collection';

        // looping over the men shoe object inside the shoe factory 
        shoe_factory.unisex_collection.forEach(shoe =>{
            let {element} = shoe;
            addZeroOpacity(element);
            shoe_collection_div.appendChild(element);
            removeOpacity(element);
        }

        )
    }
}

function addZeroOpacity(element){
    element.classList.add('hide-opacity');
}

function removeOpacity(element){
    setTimeout(()=>{
        element.classList.toggle('hide-opacity');
    }, 50)
}

// adding event listener to select tag so that the right shoe element will be displayed

const select_tag = document.querySelector('#collection-select');
select_tag.addEventListener('change', evt =>{
    loadShoeItemToPage(select_tag.value);
})

// auto run the loadShoeItemToPage on start of the page 
loadShoeItemToPage('unisex');

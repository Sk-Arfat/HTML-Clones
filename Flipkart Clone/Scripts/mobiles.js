let cartItems;
onLoad();

function onLoad(){
    let cartItemsStr = localStorage.getItem('cartItems');
    cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
    displayItemOnHomePage();
    displayCartIcon();

}

function displayItemOnHomePage(){
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement){
        return;
    }
    let innerHTML = '';
    items.forEach(item => {
        innerHTML += `
                <div class="item-container">
                    <img class="item-img" src="${item.image}" alt="">
                    <div class="rigth-part">
                        <h3>${item.item_name}</h3>
                        <span class="rating">${item.rating.stars}<i class="ri-star-line"></i></span>
                        <ul>
                            <li>8 GB RAM | 256 GB ROM</li>
                            <li>17.02 cm (6.7inch)</li>
                            <li>50MP + 8MP +32MP | 16MP Front Camera</li>
                            <li>5000 mAh Battery</li>
                            <li>Snapdragon 6 Gen 1 Processor</li>
                        </ul>
                        
                    </div>
                    <div class="price-container">
                        <h2>₹${item.current_price}</h2>
                        <span class="original-price">₹${item.original_price}</span> <span class="discount">${item.discount_percentage}% off</span>
                        <p style="font-size: 12px; color: green;margin-top:10px">Save extra with combo offers</p>
                        <p>Upto <b>₹12,900</b> Off on Exchange</p>
                        <button  onclick="addToCart(${item.id})" class="cart-btn"><i class="ri-shopping-cart-line"></i>Add to Cart</button>
                    </div>
                    
                </div>
                `;
    });
 itemsContainerElement.innerHTML = innerHTML;
};

function addToCart(itemId){
    cartItems.push(itemId);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    alert ('Item Added To Cart Successfully!!');
    displayCartIcon();
}

function displayCartIcon(){
    let cartItemCountElement = document.querySelector('.cart-item-count');
    if(cartItems.length > 0){
        cartItemCountElement.style.visibility = 'visible';
        cartItemCountElement.innerHTML = cartItems.length;
    }else{
        cartItemCountElement.style.visibility = 'hidden';
    }
    
}
// localStorage.clear();

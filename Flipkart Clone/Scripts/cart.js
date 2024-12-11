const CONVENIENCE_FEE = 99;

let cartItemObjects;
onLoad();
function onLoad(){
    loadBagItemObjects();
    displayCartItems();
    displayCartSummary();

}

function loadBagItemObjects(){
    cartItemObjects = cartItems.map(itemId => {
        for (let i = 0; i < items.length ; i++ ){
            if (itemId == items[i].id){
                return items[i];
            }
        }
    });
    
}

function removeBtn(itemId){
    cartItems = cartItems.filter(cartItemId => cartItemId != itemId);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    loadBagItemObjects();
    displayCartItems();
    displayCartSummary();
    displayCartIcon();

}

function displayCartSummary(){
    let cartSummaryElement = document.querySelector('.cart-summary');
    totalItem = cartItemObjects.length;
    totalMRP = 0;
    totalDiscount = 0;

    cartItemObjects.forEach(cartItem =>{
        totalMRP += cartItem.original_price;
        totalDiscount += cartItem.original_price - cartItem.current_price;
    })
    let finalAmount = totalMRP - totalDiscount + CONVENIENCE_FEE;
    if(totalMRP == 0 && totalDiscount == 0 ){
        finalAmount = 0;
    }
    cartSummaryElement.innerHTML = `
    
  <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹99</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalAmount}</span>
      </div>
    </div>
    <a href="order.html">
      <button class="btn-place-order" >
                  <div class="css-xjhrni">PLACE ORDER</div>
                </button>
    </a>
            </div>`;
}


function displayCartItems(){
    let cartContainerElement = document.querySelector('.cart-items-container');
    let innerHTML = '';
    cartItemObjects.forEach(cartItem => {
        innerHTML+= generateItemHtml(cartItem);
    })
    if(cartItemObjects.length === 0 || cartItemObjects === undefined){
        alert ('Your Cart is Empty');
        cartContainerElement.innerText = 'Your cart is Empty';
        
    }else{
        cartContainerElement.innerHTML = innerHTML;
    }
}

function generateItemHtml(item){
    return `
    <div class="cart-item-container">
                <div class="item-left-part">
                  <img class="cart-item-img" src=${item.image}>
                </div>
                <div class="item-right-part">
                  <div class="item-name">${item.item_name}</div>
                  <div class="price-container1">
                    <span class="current-price">₹${item.current_price}</span>
                    <span class="original-price">₹${item.original_price}</span>
                    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                  </div>
                  <div class="return-period">
                    <span class="return-period-days">${item.return_period} days</span> return available
                  </div>
                  <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${item.delivery_date}</span>
                  </div>
                </div>
    
                <div class="remove-from-cart" onclick="removeBtn(${item.id});">X</div>

                <!-- <button id="minus" onclick="minusItem()">-</button>
                 <input type="number" id="quantity" readonly >
                 <button id="plus" onclick="plusItem"()>+</button>-->
              </div>
    `
}
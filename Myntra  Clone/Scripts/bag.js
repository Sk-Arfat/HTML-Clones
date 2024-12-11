const CONVENIENCE_FEE = 99;
let bagItemObjects;
let quantity = document.querySelector("#quantity");
quantity = 0;
onload();

function onload() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let finalAmount = totalMRP - totalDiscount + CONVENIENCE_FEE;
  if (totalMRP == 0 && totalDiscount == 0) {
    finalAmount = 0;
  }
  bagSummaryElement.innerHTML = `
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

function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHtml(bagItem);
  });
  if (bagItemObjects === undefined || bagItemObjects.length === 0) {
    containerElement.innerText = `your bag is empty`;
  } else {
    containerElement.innerHTML = innerHTML;
  }
}

function remove(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}
// function minusItem(itemId){
//   let mBtn = documetn.querySelector('#minus');
//   mBtn.addEventListner('click', Event => {
//     item
//   })
// }

function generateItemHtml(item) {
  return `
            <div class="bag-item-container">
                <div class="item-left-part">
                  <img class="bag-item-img" src=${item.image}>
                </div>
                <div class="item-right-part">
                  <div class="company">${item.company}</div>
                  <div class="item-name">${item.item_name}</div>
                  <div class="price-container">
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
    
                <div class="remove-from-cart" onclick="remove(${item.id});">X</div>

                 <button id="minus" onclick="minusItem()">-</button>
                 <input type="number" id="quantity" readonly >
                 <button id="plus" onclick="plusItem"()>+</button>
              </div>`;
}

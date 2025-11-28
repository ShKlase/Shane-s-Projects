let productImages = document.querySelectorAll(".product-images"); 
let cartbtn = document.querySelector(".cart-access")  
let cartWhenClicked = document.querySelector(".cart-when-clicked-container") 
let counterButtons = document.querySelectorAll(".plus-minus-buttons")  
let counter = document.querySelector(".counter")
let selectedImage = document.querySelector(".product-1-img")
let selectedImageTwo = document.querySelector(".product-1-img-2")
let addToCartBtn = document.querySelector(".add-to-cart-container")
let cartItems = document.querySelector(".items-in-cart");
let emptyOrNot = document.querySelector(".empty-container");
let modal = document.querySelector(".modal")
let modalClose = document.querySelector(".modal-close")
let lightbox = document.querySelector(".overlay");
let productImagesTwo = document.querySelectorAll(".product-images-two")
let arrowButtons = document.querySelectorAll(".arr-btn")
let index = 0;

// ---------- PRODUCT THUMBNAILS ----------
// Click thumbnail to update main product image
productImages.forEach(img =>{
 img.addEventListener("click", ()=>{
    productImages.forEach(i =>{i.classList.remove("orange-border", "opacity")})
  img.classList.add("orange-border", "opacity")
   changeImg(img);

    
    })
})

// Modal thumbnails
productImagesTwo.forEach(img => {
  img.addEventListener("click", () => {
    productImagesTwo.forEach(i => i.classList.remove("orange-border", "opacity"));
    img.classList.add("orange-border", "opacity");
     changeImgTwo(img);
  });
});

// ---------- QUANTITY CONTROLS ----------
counterButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
      
     if(button.classList.contains("increment")){
        counter.innerHTML++;
     }else if(button.classList.contains("decrement") && counter.innerHTML != 0){
        counter.innerHTML--;
     }
     
        
    })
})

// ---------- CART TOGGLE ----------
cartbtn.addEventListener("click", ()=>{
  cartWhenClicked.classList.toggle("hide");
})

// Close cart when clicking outside
document.addEventListener("click", (event) => {
  if (!cartWhenClicked.contains(event.target) && !cartbtn.contains(event.target)) {
    cartWhenClicked.classList.add("hide");
  }
});

// Prevent cart dropdown from closing when clicked inside
cartWhenClicked.addEventListener("click", (event) => {
  event.stopPropagation();
});

// ---------- IMAGE UPDATE FUNCTIONS ----------
function changeImg(picture){
    selectedImage.src = picture.src;
}

function changeImgTwo(picture){
selectedImageTwo.src = picture.src
}

// ---------- ADD TO CART ----------
addToCartBtn.addEventListener("click", ()=>{
if(counter.innerHTML === "0"){
cartItems.classList.add("hide")
}else{
cartItems.innerHTML = counter.innerHTML;
cartItems.classList.remove("hide");
}

showCartItems(Number(cartItems.innerHTML));

})

// Update cart content dynamically
function showCartItems(numofItems){
let totalPrice = (125.00 * numofItems).toFixed(2);

if(numofItems !== 0){
emptyOrNot.innerHTML = `
  <div class="first-container">
    <img src="images/image-product-1-thumbnail.jpg" class="small" alt="Product Image">
    <div class="annoying">
      <div class="product-info">
        <h3>Fall Limited Edition Sneakers</h3>
        <p>$125.00 x ${numofItems} <span class="bold">$${totalPrice}</span></p>
      </div>
      <button class="trash-btn"><img src="images/icon-delete.svg" alt="Delete"></button>
    </div>
  </div>
  <div class="second-container">
    <button class="checkout-btn">Checkout</button>
  </div>
`

}else{
  emptyOrNot.innerHTML = `Your cart is empty`
}
}

// Delete cart item
emptyOrNot.addEventListener("click", (event) => {
    if (event.target && event.target.closest('.trash-btn')) {
        emptyOrNot.innerHTML = 'Your cart is empty';  
        cartItems.classList.add("hide");  
        counter.innerHTML = '0';  
    }
}); 

// ---------- MODAL LIGHTBOX ----------
selectedImage.addEventListener("click", ()=>{
  modal.classList.remove("hide");
  lightbox.classList.remove("hide");

})

modalClose.addEventListener("click", ()=>{
  modal.classList.add("hide")
  lightbox.classList.add("hide");
})

// Navigate modal images with arrows
arrowButtons.forEach(button =>{
  button.addEventListener("click",()=>{
    if(button.classList.contains("previous") && index > 0){
      index--;
    }

    else if (button.classList.contains("next") && index < productImagesTwo.length - 1) {
      index++;
    }

    selectedImageTwo.src = productImagesTwo[index].src;

    productImagesTwo.forEach(btn =>{btn.classList.remove("orange-border", "opacity")})
    productImagesTwo[index].classList.add("orange-border", "opacity")
  })
})
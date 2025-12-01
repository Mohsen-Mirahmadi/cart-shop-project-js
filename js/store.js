const $ = document;
const producte = [
    {id : 1 ,title : 'Album 1' ,image : 'Images/Album 1.png' , price : 12.99 ,count : 1} ,
    {id : 2 ,title : 'Album 2' , image : 'Images/Album 2.png' , price : 14.99 ,count : 1} ,
    {id : 3 ,title : 'Album 3' , image : 'Images/Album 3.png' , price : 15.99 ,count : 1} ,
    {id : 4 ,title : 'Album 4' , image : 'Images/Album 4.png' , price : 17.99 ,count : 1} ,
    {id : 5 ,title : 'Cofee' , image : 'Images/Cofee.png' , price : 33 ,count : 1} ,
    {id : 6 ,title : 'Shirt' , image : 'Images/shirt.png' , price : 45 ,count : 1} 
]
let container = $.querySelector('.container.content-section')
let shopItems = $.querySelector('.shop-items')
let cartItem = $.querySelector('.cart-items')
let cartTotal = $.querySelector('.cart-total')
let Total = $.querySelector('.cart-total-title')
let displayPrice = $.querySelector('.cart-total-price')
let purchase = $.querySelector('.btn.btn-primary.btn-purchase')
let arryBasket = []
function createProducte(items){
    items.forEach(function(item){
        let shopItemElem = $.createElement('div')
        shopItemElem.classList.add('shop-item')
        let spanElem = $.createElement('span')
        spanElem.classList.add('shop-item-title')
        spanElem.innerHTML = item.title;
        let imgElem = $.createElement('img')
        imgElem.classList.add('shop-item-image')
        imgElem.src = item.image;
        let detailsDiv = $.createElement('div')
        detailsDiv.classList.add('shop-item-details')
        let priceSpan = $.createElement('span')
        priceSpan.classList.add('shop-item-price')
        priceSpan.innerHTML = '$' + item.price;
        let buttonElem = $.createElement('button')
        buttonElem.classList.add('btn' , 'btn-primary' , 'shop-item-button')
        buttonElem.type = 'button';
        buttonElem.innerHTML = 'ADD TO CART'
        buttonElem.addEventListener('click' , function(){
            chekProducte(item.id)
        })
        detailsDiv.append(priceSpan , buttonElem)
        shopItemElem.append(spanElem , imgElem , detailsDiv)
        shopItems.appendChild(shopItemElem)
})
}
function addBasketProducte(producteId ){
    
    let mainProducte = producte.find(function(producte){
        return producte.id === producteId
    })
    mainProducte.count = 1 ;
    arryBasket.push(mainProducte)
    generaiteBasketeProducte(arryBasket)
    totalPrice(arryBasket)
}
function generaiteBasketeProducte(userBasketArry){
    cartItem.innerHTML = ''

    userBasketArry.forEach(function(item){
        
        let divCartRow = $.createElement('div')
        divCartRow.classList.add('cart-row')
        let divItem = $.createElement('div')
        divItem.classList.add('cart-item' , 'cart-column')
        let imgElem = $.createElement('img')
        imgElem.classList.add('cart-item-image')
        imgElem.width = '100'
        imgElem.height = '100'
        imgElem.src = item.image;
        let spanElem = $.createElement('span')
        spanElem.classList.add('cart-item-title')
        spanElem.innerHTML = item.title;
        divItem.append(imgElem , spanElem)
        let spanPrice = $.createElement('span')
        spanPrice.classList.add('cart-price' , 'cart-column')
        spanPrice.innerHTML = '$' + item.price;
        let divQuantity = $.createElement('div')
        divQuantity.classList.add('cart-quantity' , 'cart-column')
        let inputElem = $.createElement('input')
        inputElem.classList.add('cart-quantity-input')
        inputElem.type = 'number'
        inputElem.value = item.count ;
        inputElem.addEventListener('change' , function(){
            updateCount(item.id , Number(inputElem.value))
        })
        let btnElem = $.createElement('button')
        btnElem.classList.add('btn' , 'btn-danger')
        btnElem.type = 'button'
        btnElem.innerHTML = 'REMOVE'
        btnElem.addEventListener('click' , function(){
            removeProducteFromBasket(item.id)
        })
        divQuantity.append(inputElem , btnElem)
        divCartRow.append(divItem , spanPrice , divQuantity)
        cartItem.appendChild(divCartRow)
    })
}
purchase.addEventListener('click' , function(){
    arryBasket = []
    generaiteBasketeProducte(arryBasket)
})
function removeProducteFromBasket(producteId){
    let newProducte = arryBasket.filter(function(producte){
        return producte.id != producteId
    })
    arryBasket = newProducte
    generaiteBasketeProducte(arryBasket)
    totalPrice(arryBasket)
}
function totalPrice(arryBasket){
    let total = 0 ;
    arryBasket.forEach(function(item){
        total += item.count * item.price
    })
    displayPrice.innerHTML = '$' + total
}
function updateCount(producteId , newCount ){
    arryBasket.forEach(function(producte){
        if(producte.id === producteId){
            producte.count = newCount
        }
        if(newCount == 0){
            removeProducteFromBasket(producteId)
        }
    })
    totalPrice(arryBasket)
}
function chekProducte(producteId){
    let findProducte = arryBasket.find(function(producte){
        return producte.id === producteId
    })
    console.log(findProducte);
    if(!findProducte){
        addBasketProducte(producteId)
        
    }else{
        let newCount = Number(findProducte.count += 1);
        updateCount(producteId , newCount)
        generaiteBasketeProducte(arryBasket)
    }
}
createProducte(producte)

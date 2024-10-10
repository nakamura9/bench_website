import axios from "axios";


const addToCart = (item, account, qty, modalController) => {
    axios({
        url: "/api/add_to_cart/",
        method: "GET",
        params: {
            item: item,
            account:account,
            qty: qty
        }
    }).then(res => {
        modalController(`Added ${qty} of item #${item} to your cart.`)
    }).catch(err => {
        modalController("Failed to add item to your cart.")
    })
}

const addToWishList = (item, account, modalController) => {
    axios({
        url:"/api/add_to_wishlist/", 
        method: "GET",
        params:{
            item: item,
            account: account
        }
    }).then(res => {
        modalController(`Added  item #${item} to your wish list.`)
    }).catch(err => {
        modalController("Failed to add item to your wish list.")
    })
}

export {addToCart, addToWishList}
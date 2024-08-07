const { expect } = require("@playwright/test");

class APIUtils {

    constructor(apiContext,loginPayload,createCartPayload,addItemToCartPayload,checkoutPayload,backboneLogin) {
       this.apiContext = apiContext;
       this.token = this.token;
       this.loginPayload = loginPayload;
       this.createCartPayload = createCartPayload;
       this.addItemToCartPayload = addItemToCartPayload;
       this.checkoutPayload = checkoutPayload;
       this.backboneLogin = {username: username, password: password}
    }

    async loginBackbone() {
        const responseBackBoneAuth = await this.apiContext.post("https://backbone.api.foxtrotco.com/v1/login",
        {
            data: this.backboneLogin
        })
        const loginBackboneResponseJson = await responseBackBoneAuth.json();
        console.log(loginBackboneResponseJson)
        let tokenBackboneLogin = await loginBackboneResponseJson.token
        expect(responseBackBoneAuth).toBeOK()
        return tokenBackboneLogin
    }

    async getToken() {
        const responseAuth = await this.apiContext.post("https://staging.api.foxtrotchicago.com/v5/login",
     {
         data: this.loginPayload
     })
    const loginResponseJson = await responseAuth.json();
    console.log(loginResponseJson)
    let tokenLogin = await loginResponseJson.user.api_token;
    console.log(tokenLogin)
    return tokenLogin
    }

    async createCart(createCartPayload) {
        const createCartResponse = await this.apiContext.post("https://staging.api.foxtrotchicago.com/v6/cart/",
        {
           data: this.createCartPayload,
           headers: 
           {
             'Authorization':  this.token(),
             'Content-type': 'application/json'
           }
        })
   
       const createCartResponseJson = await createCartResponse.json();
       console.log(createCartResponseJson)
       userCartID = await createCartResponseJson.cart.cart_id;
       console.log(userCartID)
       return createCartPayload
    }

    async addItemToCart() {
        const addAnItemToCart = await this.apiContext.post( `https://staging.api.foxtrotchicago.com/v6/cart/${userCartID}`, 
    {
        data: this.addItemToCartPayload,
        headers: 
        {
            'Authorization': this.token(),
            'Content-type': 'application/json'
        }
    })
    const addAnItemToCartResponse = await addAnItemToCart.json();
    console.log(addAnItemToCartResponse)
    }

    async loggedInCheckout() {
        let response = {};
        response.token = await this.token();
        const completeOrder = await this.apiContext.post("https://staging.api.foxtrotchicago.com/v5/orders-v2", 
        {
            data: this.checkoutPayload,
            headers: 
            {
                'Authorization': this.token(),
                'Content-type': 'application/json'
            }
        })
        const completeOrderJson = await completeOrder.json()
        console.log(completeOrderJson)
    
        orderId = await completeOrderJson.data.status.orderId;
        response.orderId = orderId;
        return orderId;
       

    }
}

module.exports = {APIUtils}; 

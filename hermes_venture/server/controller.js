require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);

module.exports = {
    dashboard: (req, res) => {
        console.log('hit dashboard')
        req.app.get('db').get_products().then(products => {
            res.json(products)
            res.status(200)
        }).catch(err => console.log('error on Dashboard', err))
    },
    getSingleProduct: (req, res) => {
        console.log('hit Single Product')
        let stuff = [];
        console.log(req.params)
        req.app.get('db').single_product(+req.params.id).then(product => {
            req.app.get('db').get_categories(req.params.category).then(products => {
                stuff.push(products)
                stuff.push(product[0])
                res.json(stuff)
            }).catch(err => console.log('error on getSingleProduct 1', err))
        }).catch(err => console.log('error on getSingleProduct 2', err))
    },
    getFeaturedProducts: (req, res) => {
        const { category } = req.params;
        req.app.get('db').get_featuredproducts(category)
        .then(image => {
            res.send(image);
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    createOrderNumber: (req, res) => {
        console.log('hit createOrderNumber')
        req.app.get('db').create_order_number(+req.params.id).then(id => {
            res.json(id)
        }).catch(err => console.log('error with createOrderNumber', err))
    },
    stripe: (req, res) => {
        console.log('hit Stripe')
        const { amount, currency, source } = req.body
        stripe.charges.create({
            amount: amount,
            currency: currency,
            source: source
        }, function(err, charge) {
            if(err) {
                console.log('error on stripe', err)
            } else if(charge) {
                res.json(charge)
                console.log("Successful Charge")
            }
        });
    },
    createOrder: (req, res) => {
        console.log('Creating Order')
        let orderNumber = req.body[0]
        let incomingCart = req.body[1]
        let productIds = [];
        let quantity = [];
        let cart = [];
        for(let i = 0; i < incomingCart.length; i++) {
            cart.push(incomingCart[i])
        }
        for(let i = 0; i <cart.length; i++) {
            productIds.push(cart[i].id)
            quantity.push(cart[i].quantity)
        }
        
        console.log('product ids', productIds)
        console.log('quantities', quantity)
        for(let i = 0; i <productIds.length; i++) {
            req.app.get('db').create_order({
                product_id: productIds[i],
                cart_id: +orderNumber,
                quantity: quantity[i]
            }).then(newOrder => {
                res.json(newOrder[0]);
            }).catch(err => console.log('error with create Order', err))
        }
    }
}
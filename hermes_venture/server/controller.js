require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);

module.exports = {
    dashboard: (req, res) => {
        req.app.get('db').get_products().then(products => {
            res.json(products)
            res.status(200)
        }).catch(err => console.log('error on Dashboard', err))
    },
    getSingleProduct: (req, res) => {
        let stuff = [];
        req.app.get('db').single_product(+req.params.id).then(product => {
            req.app.get('db').get_categories(req.params.category).then(products => {
                stuff.push(products)
                stuff.push(product[0])
                res.json(stuff)
            }).catch(err => console.log('error on getSingleProduct 1', err))
        }).catch(err => console.log('error on getSingleProduct 2', err))
    },
    getFPTibet: (req, res) => {
        req.app.get('db').get_fp_tibet()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((4 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((4 - 0) + 1) + 5);
            let indexThree = Math.floor(Math.random() * ((3 - 0) + 1) + 10);
            let indexFour = Math.floor(Math.random() * ((3 - 0) + 1) + 14)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    getFPMaldives: (req, res) => {
        req.app.get('db').get_fp_maldives()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((4 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((4 - 0) + 1) + 5);
            let indexThree = Math.floor(Math.random() * ((3 - 0) + 1) + 10);
            let indexFour = Math.floor(Math.random() * ((3 - 0) + 1) + 14)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    getFPPeru: (req, res) => {
        req.app.get('db').get_fp_peru()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((4 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((4 - 0) + 1) + 5);
            let indexThree = Math.floor(Math.random() * ((3 - 0) + 1) + 10);
            let indexFour = Math.floor(Math.random() * ((3 - 0) + 1) + 14)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
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
    },
    sortCountry: (req, res) => {
        req.app.get('db').sort_country(req.params.country).then(products => {
            res.json(products)
        }).catch(err => console.log('error with sortCountry', err))
    },
    sortProducts: (req, res) => {
        console.log('hit sort products')
        const { country, gender } = req.params
        req.app.get('db').sort_products(country,gender).then(products => {
            res.json(products)
        }).catch(err => console.log('error on sort products', err))
        
    },
    getUser: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        req.app.get('db').get_user(req.session.user.auth0id).then(users => {
            res.json(users[0])
        }).catch(err => console.log('error with getUser'))
    }
}
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
            stuff.push(product[0])
            res.status(200)
        }).catch(err => console.log('error on getSingleProduct', err))
        req.app.get('db').get_categories(req.params.category).then(products => {
           stuff.push(products)
           res.json(stuff)
            res.status(200)
        }).catch(err => console.log('error on getSingleProduct', err))
    },
    getRelated: (req, res) => {
        console.log(req.params.category)
    },
    getFeaturedProducts: (req, res) => {
        const { category } = req.params;
        req.app.get('db').get_featuredproducts(category)
        .then(image => {
            res.send(image);
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    }
}
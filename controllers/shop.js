const Product = require('../models/product');
const Cart = require('../models/cart');

// https://expressjs.com/en/guide/using-middleware.html
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products)=>{
        res.render('shop/product-list', {
            products,
            pageTitle: 'All Products',
            path: '/products',
            activeShop: true,
            productCSS: true,
            formsCss: true
        });
    });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then((product)=>{
        console.log(product,'product');
        res.render('shop/product-details', {
            product,
            pageTitle: product.title,
            path: '/products',
            activeShop: true,
            productCSS: true,
            formsCss: true
        });
    });

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
            formsCss: true
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod._id === product._id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                activeCart: true,
                productCSS: true,
                formsCss: true,
                products: cartProducts
            });
        });
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
        activeCheckout: true,
        productCSS: true,
        formsCss: true
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        activeOrders: true,
        productCSS: true,
        formsCss: true
    });
}

exports.postCart = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart')

}

exports.postCartDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
}
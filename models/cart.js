const fs = require('fs');
const path = require('path');

const P = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(P, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(p => p._id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {
                    ...existingProduct
                };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(P, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(P, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = {
                ...JSON.parse(fileContent)
            };
            const product = updatedCart.products.find(p => p._id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p._id !== id);
            updatedCart.totalPrice -= +productPrice * productQty;
            fs.writeFile(P, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }
    static getCart(callback) {
        fs.readFile(P, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                callback(null);
            } else {
                callback(cart);
            }
        });
    }
}
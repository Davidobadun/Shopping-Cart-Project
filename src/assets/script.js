/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [];

// Total paid by the customer
let totalPaid = 0;

/*
 * Create 3 or more product objects using object literal notation
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
// First object is a orange
const orange = {
    "name": "orange",
    "price": 4,
    "quantity": 0,
    "productId": 101,
    "image": "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const cherry = {
    "name": "cherry",
    "price": 2,
    "quantity": 0,
    "productId": 102,
    "image": "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const strawberry = {
    "name": "strawberry",
    "price": 6,
    "quantity": 0,
    "productId": 103,
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

};

// Put the products into the products array
products.push(
    cherry,
    orange,
    strawberry
);

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

const findAndIncrementProduct = function (productId) {

    // This function uses productID to find the product and increemnts the quantity in the product array.
    const item = products.find((fruit) => fruit.productId === productId);

    if (item) {
        item.quantity += 1;
        return item;
    }
};

const addProductToCart = function (productId) {

    const item = findAndIncrementProduct(productId);
    // Check if product is in cart
    const cartItem = cart.find((fruit) => fruit.productId === productId);

    if (cartItem) {
    // If the product is already in the cart, increase the quantity
        cartItem.quantity += 1;
    } else {
    // If the product is not in the cart, add it with quantity 1
        cart.push({...item, "quantity": 1});
    }
};

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/


const increaseQuantity = function (productId) {
    findAndIncrementProduct(productId);
    const cartItem = cart.find((fruit) => fruit.productId === productId);

    // Increase the prodcuts quantity
    if (cartItem) {
        cartItem.quantity += 1;
    }
};

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

const decreaseQuantity = function (productId) {
    const item = products.find((fruit) => fruit.productId === productId);

    if (item) {
    // Decrease quantity in prodcuts array
        item.quantity -= 1;
    }

    const cartItem = cart.find((fruit) => fruit.productId === productId);
    // Decrease the prodcuts quantity

    if (cartItem) {
        if (cartItem.quantity > 0) {
            cartItem.quantity -= 1;
        }
        if (cartItem.quantity === 0) {
            const index = cart.indexOf(cartItem);

            cart.splice(index, 1);
        }
    }
};


/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
const removeProductFromCart = function (productId) {
    const item = products.find((fruit) => fruit.productId === productId);

    // If item exist in prodcut array, update the product quantity to 0
    if (item) {
        item.quantity = 0;
    }

    // Find the item in the cart
    const cartItem = cart.find((fruit) => fruit.productId === productId);

    if (cartItem) {
    // Find index of item to be removed from cart
        const index = cart.indexOf(cartItem);

        cart.splice(index, 1);
    }
};

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/

const cartTotal = function () {
    let totalAmount = 0;

    for (let cartItem = 0; cartItem < cart.length; cartItem++) {
        totalAmount += Number(cart[cartItem].quantity) * Number(cart[cartItem].price);
    }
    return totalAmount;
};

/* Create a function called emptyCart that empties the products from the cart */
const emptyCart = function () {
    cart.splice(0, cart.length);
};

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/

const pay = function (cashReceived) {
    // Update total amount paid
    totalPaid += cashReceived;

    // Find total cost of items in cart
    const totalCost = cartTotal();

    // Calculate remaining balance
    const balance = totalCost - totalPaid;

    // Check if cash recieved is not enough
    if (balance > 0) {
    // Return negative remaining balance
        return -balance;
    } else {
    // If cash recived is more than total cost, return change
        const change = totalPaid - totalCost;

        // Reset totalPaid and empty cart for the next transaction
        totalPaid = 0;
        emptyCart();
        return change;
    }
};

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests.
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/


module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay,
    emptyCart,

    /* Uncomment the following line if completing the currency converter bonus */
    // Currency
};
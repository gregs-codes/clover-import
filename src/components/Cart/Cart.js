import React,{ useState }from 'react';
import { v4 as uuidv4 } from 'uuid';
//import FetchMakePayment from '../../common/data/FetchMakePayment';
import './Cart.scss';

  function useMakePayment(chargePrice) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const uuid4_key = uuidv4(); // Generate UUID key
    const merchantID = 'J1X5PEM4A62A1';
    const urlClover = `https://scl-sandbox.dev.clover.com/v1/charges`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer a40a964a-76c2-7283-eb15-5273f7448803',
        'idempotency-key': {uuid4_key},
      },
      body: JSON.stringify({
        ecomind: 'ecom',
        source: 'alternate_tender',
        amount: {chargePrice},
        currency: 'usd',
        tax_rate_uuid:'1'
      }),
      mode: 'cors',
      credentials: 'include'  
    };

    async function makePayment() {
      try {
        const response = await fetch(urlClover, options);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    return { data, loading, error, makePayment };
  }


function Cart(props) {
  const { cart, TAX_RATE, updateCartItemQuantity, removeFromCart, formatCurrency } = props
  const totalPrice = cart.reduce((total, item) => total + (item.price/100) * item.quantity, 0);
  const { data, loading, error, makePayment } = useMakePayment(totalPrice*100);
  // Define state variables for checkout
  const [checkoutStatus, setCheckoutStatus] = useState('idle'); // idle, processing, success, error
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    // Ensure the cart is not empty
    if (cart.length === 0) {
      return;
    }

    // Set checkout status to "processing"
    setCheckoutStatus('processing');

    // Generate a unique key for idempotency
    const uuid4_key = uuidv4();

    // Define the Clover API endpoint for creating a hosted checkout session
    const merchantID = 'J1X5PEM4A62A1';
    const urlClover = `https://sandbox.dev.clover.com/invoicingcheckoutservice/v1/checkouts`;

    // Construct the request body (customize as needed)
    const requestBody = {
      customer: {
        firstName: 'Greg',
        lastName: 'Testing',
        email: 'yegor78@gmail.com',
        phoneNumber: '123-456-7890',
        address: {
          // Include customer address details if needed
        },
        customerMetaData: {
          redirectUrls: {
            shoppingCart: 'https://example.com/shopping-cart', // Replace with your actual redirect URL
          },
        },
      },
      shoppingCart: {
        lineItems: cart.map((item) => ({
          note: item.name, // You can include item details in the note
          price: item.price, // Unit price of the item
          name: item.name, // Item name
          unitQty: item.quantity, // Item quantity
          taxRates: [
            {
              rate: TAX_RATE, // Tax rate for the item
              taxAmount: (item.price * item.quantity * TAX_RATE) / 100, // Tax amount for the item
              name: 'Sales Tax', // Tax name (customize as needed)
              id: 'tax123', // Tax Identifier (customize as needed)
            },
          ],
          itemRefUuid: item.id, // Universally unique identifier (UUID) or reference number of the item
        })),
        total: totalPrice * (1 + TAX_RATE), // Total amount for the items in the shopping cart, including tax and tip
        subtotal: totalPrice, // Subtotal amount for the items in the shopping cart
        totalTaxAmount: (totalPrice * TAX_RATE), // Total tax amount
        tipAmount: 0, // Tip amount (customize as needed)
        taxSummaries: {
          // Summary of the tax used on an object (customize as needed)
        },
      },
    };
    

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer a40a964a-76c2-7283-eb15-5273f7448803',
        'X-Clover-Merchant-Id': merchantID,
        'Idempotency-Key': uuid4_key,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      // Make the API request to create a hosted checkout session
      const response = await fetch(urlClover, requestOptions);
      if (response.ok) {
        const checkoutSession = await response.json();

        // Extract the checkout URL from the response
        const checkoutURL = checkoutSession.redirectUrls.shoppingCart;

        // Redirect the user to the checkout page
        window.location.href = checkoutURL;

        // Set checkout status to "success"
        setCheckoutStatus('success');
      } else {
        // Handle error cases
        setCheckoutStatus('error');
        setCheckoutError('Checkout request failed');
      }
    } catch (error) {
      // Handle network errors
      setCheckoutStatus('error');
      setCheckoutError('Network error occurred');
    }
  };
    for (const item of cart) {
        for (const modifierId in item.modifiers) {
          const modifier = item.modifiers[modifierId];
          //console.log(modifier.name, modifier.price);
          // Perform some operation on the modifier
        }
      }

        function getItemModifiers(item) {
            let modifiers = [];
            let itemPrice = item.price;
            for (const modifierId in item.modifiers) {
                const modifier = item.modifiers[modifierId];
                itemPrice += modifier.price;
                modifiers.push(<div className='modifierItem' key={modifier.id}>{modifier.name}&nbsp;<span className='modifierPrice'>{formatCurrency(modifier.price/100)}</span></div>);
            }
            return { modifiers, itemPrice };
        }

        function getItemModifiers(item) {
            let modifiers = [];
            for (const modifierId in item.modifiers) {
              const modifier = item.modifiers[modifierId];
              modifiers.push(
                <div className="modifierItem" key={modifier.id}>
                  {modifier.name}&nbsp;
                  <span key={modifier.id} className="modifierPrice">
                    {formatCurrency(modifier.price / 100)}
                  </span>
                </div>
              );
            }
            return modifiers;
          }        
    return (
        <div className="cart-dropdown">
            <h3 className="cart-title">Your Cart</h3>
            <div className="cart-header">
                <div className="cart-header-item">Item</div>
                <div className="cart-header-quantity">Quantity</div>
                <div className="cart-header-price">Price</div>
                <div className="cart-header-remove">Action</div>
            </div>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}
                     {getItemModifiers(item)}
                    </div>
                    <div className="cart-item-quantity">
                    <button
                        className="cart-item-quantity-button"
                        onClick={() =>
                        updateCartItemQuantity(index, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                        updateCartItemQuantity(
                            index,
                            parseInt(event.target.value)
                        )
                        }
                    />
                    <button
                        className="cart-item-quantity-button"
                        onClick={() =>
                        updateCartItemQuantity(index, item.quantity + 1)
                        }
                    >
                        +
                    </button>
                    </div>
                    <div className="cart-item-price">
                    {formatCurrency((item.price * item.quantity)/100)}
                    </div>
                    <div>
                    <button className="button btn first" onClick={() => removeFromCart(item)}>
                        Remove
                    </button>
                    </div>
                </div>
            </div>

            
          ))

        ) : (
          <p className="cart-empty-message">Your cart is empty</p>
        )}

        <div className="cart-summary">
            <p className="cart-subtotal">
            Subtotal: {formatCurrency(cart.reduce((total, item) => total + (item.price/100) * item.quantity, 0))}
            </p>
            <p className="cart-taxes">
            Taxes ({(TAX_RATE * 100).toFixed(0)}%): {formatCurrency(cart.reduce((total, item) => total + (item.price/100) * item.quantity, 0) * TAX_RATE)}
            </p>
            <p className="cart-total">
            Total: {formatCurrency(cart.reduce((total, item) => total + (item.price/100) * item.quantity, 0) * (1 + TAX_RATE))}
            </p>
         </div>
         {cart.length > 0 && (
            // <button className="button btn checkout" onClick={() => makePayment(cart.reduce((total, item) => total + (item.price/100) * item.quantity, 0) * (1 + TAX_RATE))}>
            //   Checkout
            // </button>

            <button
              className="button btn checkout"
              onClick={handleCheckout}
              disabled={cart.length === 0 || checkoutStatus === 'processing'}
              >
              Checkout
              </button>
          )}
      </div>
    )}
export default Cart;
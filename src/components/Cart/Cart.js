import React,{ useState } from 'react';

function Cart(props) {
    const { cart, TAX_RATE, formatPrice, updateCartItemQuantity, removeFromCart  } = props
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
                <div className="cart-item-name">{item.name}</div>
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
                  {formatPrice(item.price * item.quantity)}
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
            Subtotal: {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
          </p>
          <p className="cart-taxes">
            Taxes ({(TAX_RATE * 100).toFixed(0)}%): {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0) * TAX_RATE)}
          </p>
          <p className="cart-total">
            Total: {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0) * (1 + TAX_RATE))}
          </p>
        </div>
      </div>
            )}
export default Cart;
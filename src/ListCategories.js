import React,{ useState } from 'react';
import Fetch from './Fetch';
import './Kiosk.css'

function groupItemsByCategoryId(items) {
    return items.reduce((acc, item) => {
    const categoryId = item.categories.elements[0].id;
    const categoryName = item.categories.elements[0].name;

    if (!acc[categoryId, categoryName]) {
        acc[categoryId, categoryName] = [];
    }

    acc[categoryId, categoryName].push(item);
    
    return acc;
    }, {});
}

function ListCategories() {
    const TAX_RATE = 0.05;
    
    const { data, loading, error } = Fetch("items");
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const handleAddToCart = (item) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    };
    const handleShowCart = () => {
      setShowCart(!showCart);
    };
    const removeFromCart = (item) => {
      const newCart = [...cart];
      newCart.splice(item, 1);
      setCart(newCart);
    };
    const updateCartItemQuantity = (index, newQuantity) => {
      const newCart = [...cart];
      newCart[index].quantity = newQuantity;
      setCart(newCart);
    };

    function formatPrice(price) {
      let formattedPrice;

      if (price.toString().length === 3) {
        formattedPrice = (price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else if (price.toString().length === 4) {
        formattedPrice = (price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else if (price.toString().length === 5) {
        formattedPrice = (price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else {
        formattedPrice = price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }

      return formattedPrice;
    }
    if (loading === false && data != null) {
      const itemsByCategoryId = groupItemsByCategoryId(data.elements);
      console.log(itemsByCategoryId)
  
      return (
        <div className="kiosk-view">
          <header className="top-menu">
            <h1 className="logo">My Kiosk</h1>
            <div className="cart-container" onClick={handleShowCart}>
              Cart
              {cart.length > 0 && 
              <div className="cart-count"> {cart.reduce((total, item) => total + item.quantity, 0)}</div>
              }
            </div>
          </header>
          {showCart && (
            <div className="cart-dropdown">
              <h3 className="cart-title">Your Cart</h3>
              <div className="cart-header">
                <div className="cart-header-item">Item</div>
                <div className="cart-header-quantity">Quantity</div>
                <div className="cart-header-price">Price</div>
                <div className="cart-header-remove">Remove</div>
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
                        <button className="remove-btn" onClick={() => removeFromCart(item)}>
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
          {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
            <div key={categoryId} className="category">
              <h2 className="category-heading">{categoryId}</h2>
              <div className="item-grid">
                {items.map((item) => (
                  <div key={item.id} className="item">
                    {/* <img src={item.imageUrl} alt={item.name} className="item-image" /> */}
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                    <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">
                      Add to Cart
                    </button>
                </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
            
    }
    if (loading) return <h1> LOADING ... </h1>;
    if (error) console.log(error);
  }
export default ListCategories;
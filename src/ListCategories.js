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
   // const [categoryObj, setCategory] = useState();
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
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
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
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
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
                            updateCartItemQuantity(index, parseInt(event.target.value))
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
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                      <button className="remove-btn" onClick={() => removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="cart-empty-message">Your cart is empty</p>
              )}
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
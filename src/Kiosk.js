import React,{ useState } from 'react'
import Fetch from './Fetch'
import Cart from './components/Cart/Cart'
import Modifiers from './Modifiers'
import Loading from './components/loader/Loading'
import './Kiosk.scss';

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

function Kiosk() {
    const TAX_RATE = 0.05;
    
    const { data, loading, error } = Fetch("items");
    const [modifiers, setModifiers] = useState({});
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    
    const handleAddToCart = (item, modifiers) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCart(updatedCart);
      } else {
        console.log('handle cart', modifiers)
        setCart([...cart, { ...item, quantity: 1, modifiers }]);
        setModifiers({ ...modifiers, [item.id]: modifiers });
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
      //console.log(modifiers)
  
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
            <Cart 
              cart={cart}
              updateCartItemQuantity={updateCartItemQuantity}
              formatPrice={formatPrice}
              removeFromCart={removeFromCart}
              TAX_RATE={TAX_RATE}
            />
          )}
          {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
            <div key={categoryId} className="category">
              <h2 className="category-heading">{categoryId}</h2>
              <div className="item-grid">
                {items.map((item) => (
                  <div key={item.id} className="item">
                    <div>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      <img src={`https://source.unsplash.com/200x200/?${item.name}`} alt={item.name} className="item-image" />
                    </div>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    {item.modifierGroups.elements[0]?.id &&
                      <Modifiers
                        item={item}
                        modifierGroupId={item.modifierGroups?.elements[0]?.id} 
                        modifiers={modifiers}
                        setModifiers={(newModifiers) =>
                          setModifiers({ ...modifiers, [item.id]: newModifiers })
                        }
                        //onClose={() => setShowModifiers(false)}
                       />
                    }

                  {/* {showModifiers && (
                    <Modifiers
                      item={selectedItem}
                      modifiers={modifiers}
                      setModifiers={(newModifiers) =>
                        setModifiers({ ...modifiers, [selectedItem.id]: newModifiers })
                      }
                      onClose={() => setShowModifiers(false)}
                    />
                  )} */}
                    <button onClick={() => handleAddToCart(item)} className="button btn second">
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
    if (loading) return (
      <Loading />
      );
    if (error) console.log(error);
  }
export default Kiosk;
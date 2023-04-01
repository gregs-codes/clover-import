import React,{ useState } from 'react'
import Fetch from './common/data/FetchItems'
import Cart from './components/Cart/Cart'
import Item from './components/item/Item'
import Loading from './components/loader/Loading'
import { groupItemsByCategoryId, formatCurrency } from './helpers';
import './Kiosk.scss';



function Kiosk() {
  const TAX_RATE = 0.05;
  const { data, loading, error } = Fetch("items");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [modifier, setModifiers] = useState({});


  const handleAddToCart = (item, modifiers) => {
    //console.log('modifiers', modifiers) 
    const modifierArray = Object.values(modifiers);
    const modifierSum = modifierArray.reduce(
      (total, modifier) => parseFloat(total) + parseFloat(modifier.price),
      0
    );
    console.log('modifierSum', modifierSum)
    
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.modifiers) === JSON.stringify(modifiers)
    );
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      console.log('item price', item.price)
      const finalPrice = (parseFloat(item.price) + parseFloat(modifierSum));
      console.log('finalPrice', finalPrice)
      setCart([...cart, { ...item, price: finalPrice, quantity: 1, modifiers }]);
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

console.log('cart', cart)
if (loading) return (
  <Loading />
  );
if (error) console.log(error);
  if (loading === false && data != null) {
    const itemsByCategoryId = groupItemsByCategoryId(data?.elements);
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
            formatCurrency={formatCurrency}
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
            TAX_RATE={TAX_RATE}
          />
        )}
        {itemsByCategoryId && (
          <Item
            formatCurrency={formatCurrency}
            itemsByCategoryId={itemsByCategoryId}
            handleAddToCart={handleAddToCart}
            setModifiers={setModifiers}
            modifier={modifier}
          />
        )}
      </div>
    );
            
    }

  }
export default Kiosk;
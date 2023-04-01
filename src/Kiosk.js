import React,{ useState } from 'react'
import Fetch from './common/data/FetchItems'
import Cart from './components/Cart/Cart'
import Item from './components/item/Item'
import Loading from './components/loader/Loading'
import { groupItemsByCategoryId, formatPrice } from './helpers';
import './Kiosk.scss';



function Kiosk() {
  const TAX_RATE = 0.05;
  const { data, loading, error } = Fetch("items");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [modifier, setModifiers] = useState({});

  // const handleAddToCart = (item, modifiers) => {
  //   const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  //   if (existingItem) {
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
  //     );
  //     setCart(updatedCart);
  //   } else {
  //     console.log('handle cart', modifiers)
  //     setCart([...cart, { ...item, quantity: 1, modifiers }]);
  //     setModifiers({ ...modifiers, [item.id]: modifiers });
  //   }
  // };

  // const handleAddToCart = (item, modifiers) => {
  //  // console.log('modifiers', modifiers)
  //   const existingItemIndex = cart.findIndex(
  //     (cartItem) => cartItem.id === item.id && JSON.stringify(cartItem.modifiers) === JSON.stringify(modifiers)
  //   );
  //   if (existingItemIndex >= 0) {
  //     const updatedCart = [...cart];
  //     updatedCart[existingItemIndex].quantity += 1;
  //     setCart(updatedCart);
  //   } else {
  //     setCart([...cart, { ...item, quantity: 1, modifiers }]);
  //   }
  // };

  const handleAddToCart = (item, modifiers) => {
    console.log('modifiers', modifiers) 
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
      setCart([...cart, { ...item, quantity: 1, modifiers }]);
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
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            formatPrice={formatPrice}
            removeFromCart={removeFromCart}
            TAX_RATE={TAX_RATE}
          />
        )}
        {itemsByCategoryId && (
          <Item
            itemsByCategoryId={itemsByCategoryId}
            formatPrice={formatPrice}
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
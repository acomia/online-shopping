import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import { Item, CartItems } from './types';
import itemsData from './data/items.json'
import './styles.css'

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems) as CartItems[];
      setCartItems(parsedCartItems)
    }
  }, []);

  const addToCart = (item: Item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const newCartItem: CartItems = {
        ...item,
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, newCartItem]));
    }
  };

  const adjustQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cartItems.map(cartItem => {
      if (cartItem.id === itemId) {
        const adjustedQuantity = Math.max(newQuantity, 1); // Ensure the quantity is at least 1
        return { ...cartItem, quantity: adjustedQuantity };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setCartItems([])
  }

  const checkout = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };


  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ItemList products={itemsData} onAddToCart={addToCart} />
        <Cart
          cartItems={cartItems}
          onAdjustQuantity={adjustQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          checkoutClearCart={checkout}
        />
      </div>

    </div>
  );
};

export default App;

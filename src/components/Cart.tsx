import React, { useState, useEffect } from 'react';
import { CartItems } from '../types';
import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';

interface CartProps {
    cartItems: CartItems[];
    onAdjustQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    onClearCart: () => void;
    checkoutClearCart: () => void
}

const Cart: React.FC<CartProps> = ({ cartItems, onAdjustQuantity, onRemoveItem, onClearCart, checkoutClearCart }) => {
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

    const openCheckoutModal = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Add items before proceeding to checkout.');
            return;
        }
        setShowCheckoutModal(true);
        checkoutClearCart()
    };

    const closeCheckoutModal = () => {
        setShowCheckoutModal(false);
    };

    useEffect(() => {
        let itemCount = 0;
        let amount = 0;

        cartItems.forEach(item => {
            itemCount += item.quantity;
            amount += item.unitPrice * item.quantity
        });

        setTotalItems(itemCount);
        setTotalAmount(amount);
    }, [cartItems]);

    return (
        <div className="cart-container">
            <div className='cart-label'>
                <p>My Cart</p>
                <button onClick={onClearCart}>Clear Cart</button>
            </div>
            <div className='cart'>
                {cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        cartItem={item}
                        onAdjustQuantity={onAdjustQuantity}
                        onRemoveItem={onRemoveItem}
                    />
                ))}
            </div>
            <div className="cart-summary">
                <div className='summary-row'>
                    <p>Total Items:</p>
                    <p>{totalItems}</p>
                </div>
                <div className='summary-row'>
                    <p>Total Amount:</p>
                    <p>₱{totalAmount.toFixed(2)}</p>
                </div>

                <button onClick={openCheckoutModal}>Checkout</button>
            </div>
            {showCheckoutModal && <CheckoutModal onClose={closeCheckoutModal} />}
        </div>
    );
};

export default Cart;

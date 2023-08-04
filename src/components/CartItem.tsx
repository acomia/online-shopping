import React from 'react';
import { CartItems } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


interface CartItemProps {
    cartItem: CartItems;
    onAdjustQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onAdjustQuantity, onRemoveItem }) => {
    const { id, productName, imageUrl, quantity, unitPrice } = cartItem;

    return (
        <div key={id} className="cart-item">
            <div className="remove-button">
                <FontAwesomeIcon icon={faTimes} size={'sm'} onClick={() => onRemoveItem(cartItem.id)} color='#fff' />
            </div>
            <img src={imageUrl} alt={productName} className="cart-item-image" />
            <div className='cart-details'>
                <h5>{productName}</h5>
                <div className='cart-row-qty'>
                    <p>₱{unitPrice.toFixed(2)}</p>
                    <div className='plus-minus'>
                        <button onClick={() => onAdjustQuantity(id, quantity + 1)}>+</button>
                        <p>{quantity}</p>
                        <button onClick={() => onAdjustQuantity(id, quantity - 1)}>-</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CartItem;

export interface Item {
    id: string;
    productName: string;
    category: string;
    unitPrice: number;
    description: string;
    imageUrl: string;
  }
  
  export interface CartItems extends Item {
    quantity: number;
  }
  
  export interface CheckoutModalProps {
    onClose: () => void;
  }
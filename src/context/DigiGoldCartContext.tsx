import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import IProduct from '../interfaces/product.interface';
// Adjust to your toast usage in React Native

interface CartItem extends IProduct {
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

interface CartContextProps extends CartState {
  addItemToCart: (product: IProduct) => void;
  removeItemFromCart: (sku: string) => void;
  updateItemQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();

  // Load cart from AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('digiGoldCart');
      if (savedCart) {
        const cartState: CartState = JSON.parse(savedCart);
        setItems(cartState.items);
        setTotalQuantity(cartState.totalQuantity);
        setTotalPrice(cartState.totalPrice);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever items, totalQuantity, or totalPrice changes
  useEffect(() => {
    const saveCart = async () => {
      const cartState: CartState = {items, totalQuantity, totalPrice};
      await AsyncStorage.setItem('digiGoldCart', JSON.stringify(cartState));
    };
    saveCart();
  }, [items, totalQuantity, totalPrice]);

  const addItemToCart = (product: IProduct) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.sku === product.sku);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += parseFloat(product.basePrice);
        return [...prevItems];
      } else {
        // toast.show("Hello World");
        return [
          ...prevItems,
          {...product, quantity: 1, totalPrice: parseFloat(product.basePrice)},
        ];
      }
    });
    setTotalQuantity(prevQuantity => prevQuantity + 1);
    setTotalPrice(prevPrice => prevPrice + parseFloat(product.basePrice));
  };

  const removeItemFromCart = (sku: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.sku === sku);
      if (!existingItem) return prevItems;
      setTotalQuantity(prevQuantity => prevQuantity - existingItem.quantity);
      setTotalPrice(prevPrice => prevPrice - existingItem.totalPrice);
      return prevItems.filter(item => item.sku !== sku);
    });
  };

  const updateItemQuantity = (sku: string, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.sku === sku);
      if (existingItem) {
        if (quantity > 0) {
          const quantityDifference = quantity - existingItem.quantity;
          const priceDifference =
            quantityDifference * parseFloat(existingItem.basePrice);
          existingItem.quantity = quantity;
          existingItem.totalPrice =
            quantity * parseFloat(existingItem.basePrice);
          setTotalQuantity(prevQuantity => prevQuantity + quantityDifference);
          setTotalPrice(prevPrice => prevPrice + priceDifference);
          return [...prevItems];
        } else {
          // If the quantity is 0, remove the item
          setTotalQuantity(
            prevQuantity => prevQuantity - existingItem.quantity,
          );
          setTotalPrice(prevPrice => prevPrice - existingItem.totalPrice);
          return prevItems.filter(item => item.sku !== sku);
        }
      }
      return prevItems;
    });
  };

  // const updateItemQuantity = (sku: string, quantity: number) => {
  //     setItems((prevItems) => {
  //         const existingItem = prevItems.find((item) => item.sku === sku);
  //         if (existingItem && quantity > 0) {
  //             const quantityDifference = quantity - existingItem.quantity;
  //             const priceDifference = quantityDifference * parseFloat(existingItem.basePrice);
  //             existingItem.quantity = quantity;
  //             existingItem.totalPrice = quantity * parseFloat(existingItem.basePrice);
  //             setTotalQuantity((prevQuantity) => prevQuantity + quantityDifference);
  //             setTotalPrice((prevPrice) => prevPrice + priceDifference);
  //             return [...prevItems];
  //         }
  //         return prevItems;
  //     });
  // };

  const clearCart = () => {
    setItems([]);
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useDigiGoldCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  const {
    clearCart,
    updateItemQuantity,
    removeItemFromCart,
    addItemToCart,
    items,
    totalQuantity,
    totalPrice,
  } = context;

  return {
    clearCart,
    updateItemQuantity,
    removeItemFromCart,
    addItemToCart,
    items,
    totalQuantity,
    totalPrice,
  };
};

export default CartProvider;

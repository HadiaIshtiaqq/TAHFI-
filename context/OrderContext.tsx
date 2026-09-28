'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderAddress, CartItem } from '@/lib/data/types';

interface OrderContextType {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    shippingAddress: OrderAddress,
    paymentMethod: Order['paymentMethod'],
    subtotal: number,
    shippingFee: number,
    discount: number,
    total: number
  ) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']) => void;
}

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-9021',
    orderNumber: 'TF-9021',
    date: '2026-09-22',
    items: [
      {
        product: {
          id: 'prod-elan-espresso',
          slug: 'tahfie-elan-espresso',
          name: 'TAHFIÉ Élan Shoulder Bag',
          tagline: 'Structured luxury',
          price: 5490,
          category: 'Shoulder Bags',
          categorySlug: 'shoulder-bags',
          collections: ['best-sellers'],
          colors: [{ name: 'Espresso', hex: '#3B2418' }],
          images: ['/images/elan-espresso.jpg'],
          inStock: true,
          stockCount: 10,
          rating: 4.9,
          reviewCount: 38,
          sku: 'TF-ELN-ESP-01',
          material: 'Vegan Leather',
          dimensions: '26cm x 18cm',
          weight: '520g',
          closure: 'Flap Lock',
          strapLength: '50cm',
          capacity: 'iPhone, Wallet',
          description: 'Halo bag',
          features: [],
          specifications: [],
          careInstructions: [],
          reviews: []
        },
        selectedColor: { name: 'Espresso', hex: '#3B2418' },
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Saba Qamar',
      email: 'saba@example.com',
      phone: '+92 300 1234567',
      address: 'House 42, Street 10, Phase 5 DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000'
    },
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Dispatched',
    subtotal: 5490,
    shippingFee: 0,
    discount: 0,
    total: 5490,
    trackingNumber: 'TCS-88392019',
    courier: 'TCS Express Pakistan',
    estimatedDeliveryDate: '2026-09-24'
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tahfie_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        setOrders(INITIAL_DEMO_ORDERS);
      }
    } catch (e) {
      setOrders(INITIAL_DEMO_ORDERS);
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      try {
        localStorage.setItem('tahfie_orders', JSON.stringify(orders));
      } catch (e) {
        console.error(e);
      }
    }
  }, [orders]);

  const placeOrder = (
    items: CartItem[],
    shippingAddress: OrderAddress,
    paymentMethod: Order['paymentMethod'],
    subtotal: number,
    shippingFee: number,
    discount: number,
    total: number
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ord-${randomNum}`;
    const orderNumber = `TF-${randomNum}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Placed',
      subtotal,
      shippingFee,
      discount,
      total,
      trackingNumber: `CALL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: shippingAddress.city.toLowerCase() === 'karachi' ? 'Leopard Courier' : 'TCS Express Pakistan',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber.toLowerCase() === orderId.toLowerCase());
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['orderStatus'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: status,
              paymentStatus: paymentStatus || o.paymentStatus
            }
          : o
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};

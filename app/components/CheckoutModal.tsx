"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../cart/CartContext';
import StripeCardForm from './StripeCardForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  address: string;
  contactNumber: string;
  paymentMethod: 'cash' | 'card';
  cardType?: 'visa' | 'mastercard' | 'amex' | 'paypal';
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    contactNumber: '',
    paymentMethod: 'cash',
    cardType: 'visa'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.contactNumber.trim()) {
      setError('Contact number is required');
      return false;
    }
    if (formData.paymentMethod === 'card' && !formData.cardType) {
      setError('Please select a card type');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const orderData = {
        items: state.items,
        customerInfo: {
          fullName: formData.fullName,
          address: formData.address,
          contactNumber: formData.contactNumber
        },
        paymentMethod: formData.paymentMethod,
        cardType: formData.cardType,
        totalAmount: totalPrice
      };

      if (formData.paymentMethod === 'cash') {
        // Handle cash on delivery
        const response = await fetch('/api/checkout/cash', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Failed to process cash order');
        }

        const result = await response.json();
        alert(`Order confirmed! Order ID: ${result.orderId}\nTotal: $${totalPrice.toFixed(2)}\nPayment: Cash on Delivery`);
        
        // Clear cart and close modal
        dispatch({ type: 'CLEAR_CART' });
        onClose();
        
      } else if (formData.paymentMethod === 'card') {
        if (formData.cardType === 'paypal') {
          // Handle PayPal payment
          await handlePayPalPayment(orderData);
        } else {
          // For Stripe card payments, we don't submit the form here
          // The StripeCardForm component will handle the payment
          setIsProcessing(false);
          return;
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error instanceof Error ? error.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripePaymentSuccess = (paymentIntentId: string) => {
    alert(`Payment successful!\nPayment ID: ${paymentIntentId}\nTotal: $${totalPrice.toFixed(2)}`);
    
    // Clear cart and close modal
    dispatch({ type: 'CLEAR_CART' });
    onClose();
  };

  const handleStripePaymentError = (error: string) => {
    setError(error);
  };

  const handlePayPalPayment = async (orderData: any) => {
    try {
      // Create PayPal order
      const response = await fetch('/api/checkout/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal order');
      }

      const { orderId, approvalUrl } = await response.json();
      
      // For demo purposes, we'll simulate a successful payment
      // In a real implementation, you would redirect to PayPal or use PayPal SDK
      const confirmed = confirm(
        `PayPal Order Created!\n\n` +
        `Order ID: ${orderId}\n` +
        `Amount: $${totalPrice.toFixed(2)}\n\n` +
        `For testing, this will simulate a successful payment.\n` +
        `In production, you would redirect to PayPal for payment.\n\n` +
        `Click OK to confirm payment.`
      );
      
      if (confirmed) {
        alert(`PayPal payment successful!\nOrder ID: ${orderId}\nTotal: $${totalPrice.toFixed(2)}`);
        
        // Clear cart and close modal
        dispatch({ type: 'CLEAR_CART' });
        onClose();
      }
      
    } catch (error) {
      throw new Error('PayPal payment failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card border border-border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary h-20 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Card Payment</option>
              </select>
            </div>

            {formData.paymentMethod === 'card' && (
              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  Payment Method *
                </label>
                <select
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            )}

            {formData.paymentMethod === 'card' && formData.cardType !== 'paypal' && (
              <div className="border-t border-border pt-4">
                <StripeCardForm
                  totalAmount={totalPrice}
                  customerInfo={{
                    fullName: formData.fullName,
                    address: formData.address,
                    contactNumber: formData.contactNumber,
                  }}
                  items={state.items}
                  onSuccess={handleStripePaymentSuccess}
                  onError={handleStripePaymentError}
                />
              </div>
            )}

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-text-primary font-medium">Total Amount:</span>
                <span className="text-primary text-xl font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-bg-secondary border border-border text-text-primary rounded-lg hover:bg-bg-primary transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              {!(formData.paymentMethod === 'card' && formData.cardType !== 'paypal') && (
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Order'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

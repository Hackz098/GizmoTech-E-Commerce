"use client";
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCardFormProps {
  totalAmount: number;
  customerInfo: {
    fullName: string;
    address: string;
    contactNumber: string;
  };
  items: any[];
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#9ca3af',
      },
      backgroundColor: '#1f2937',
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true,
};

function CheckoutForm({ totalAmount, customerInfo, items, onSuccess, onError }: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setCardError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo,
          totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.fullName,
            address: {
              line1: customerInfo.address,
            },
            phone: customerInfo.contactNumber,
          },
        },
      });

      if (error) {
        setCardError(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      setCardError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-text-primary text-sm font-medium mb-2">
          Card Information
        </label>
        <div className="p-3 bg-bg-secondary border border-border rounded-lg">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        {cardError && (
          <div className="mt-2 text-red-400 text-sm">{cardError}</div>
        )}
      </div>

      <div className="bg-bg-secondary border border-border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-text-primary font-medium">Total Amount:</span>
          <span className="text-primary text-xl font-bold">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>

      <div className="text-xs text-text-secondary text-center">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>We accept Visa, Mastercard, and American Express</p>
      </div>
    </form>
  );
}

export default function StripeCardForm(props: StripeCardFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

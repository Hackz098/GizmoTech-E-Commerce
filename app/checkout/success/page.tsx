"use client";
import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="section-title">
            Order <span className="text-primary">Confirmed!</span>
          </h1>
          <p className="section-subtitle">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            What's Next?
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="text-primary text-lg">📧</div>
              <div>
                <div className="font-medium text-text-primary">Email Confirmation</div>
                <div className="text-text-secondary text-sm">
                  You'll receive an order confirmation email shortly.
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-primary text-lg">📦</div>
              <div>
                <div className="font-medium text-text-primary">Order Processing</div>
                <div className="text-text-secondary text-sm">
                  We'll prepare your order for shipment within 1-2 business days.
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-primary text-lg">🚚</div>
              <div>
                <div className="font-medium text-text-primary">Shipping</div>
                <div className="text-text-secondary text-sm">
                  You'll receive tracking information once your order ships.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3"
          >
            Continue Shopping
          </Link>
          <Link
            href="/admin"
            className="btn-secondary px-6 py-3"
          >
            View Orders
          </Link>
        </div>

        <div className="mt-8 text-text-secondary text-sm">
          <p>
            Need help? Contact our support team at{' '}
            <a href="mailto:support@gizmotech.com" className="text-primary hover:underline">
              support@gizmotech.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

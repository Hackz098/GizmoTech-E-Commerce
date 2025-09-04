# Payment System Testing Guide

## Setup Instructions

### 1. Install Dependencies
```bash
npm install stripe @stripe/stripe-js
```

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Get API Keys

#### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in
3. Go to "Developers" > "API keys"
4. Copy your test keys (they start with `pk_test_` and `sk_test_`)

#### PayPal
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Sign up or log in
3. Go to "My Apps & Credentials"
4. Create a new app or use existing one
5. Copy "Client ID" and "Client Secret" from sandbox

## Testing Payment Methods

### 1. Cash on Delivery
- **How to test**: Select "Cash" as payment method
- **Expected behavior**: Order should be confirmed immediately
- **What happens**: No payment processing, order is created with "confirmed" status

### 2. Stripe Card Payments
- **How to test**: Select "Card" and choose Visa/Mastercard/Amex
- **Expected behavior**: Payment intent is created
- **Test cards**:
  - **Visa**: 4242 4242 4242 4242
  - **Visa (debit)**: 4000 0566 5566 5556
  - **Mastercard**: 5555 5555 5555 4444
  - **American Express**: 3782 822463 10005
  - **Declined card**: 4000 0000 0000 0002
  - **Insufficient funds**: 4000 0000 0000 9995

### 3. PayPal
- **How to test**: Select "Card" and choose PayPal
- **Expected behavior**: PayPal order is created
- **Note**: Currently simulated - in production would redirect to PayPal

## Testing Steps

### Step 1: Add Items to Cart
1. Go to home page
2. Click "Add to Cart" on any product
3. Verify cart counter updates in navbar

### Step 2: Go to Cart Page
1. Click cart icon in navbar
2. Verify items are displayed correctly
3. Check total calculation

### Step 3: Test Checkout Process
1. Click "Proceed to Checkout"
2. Fill out the form:
   - Full Name: Test User
   - Address: 123 Test Street, Test City, TC 12345
   - Contact Number: +1-555-0123
3. Select payment method
4. Click "Complete Order"

### Step 4: Verify Results
- **Cash**: Should show order confirmation with order ID
- **Stripe**: Should show payment intent creation and confirmation
- **PayPal**: Should show PayPal order creation and confirmation
- Cart should be cleared after successful payment

## Error Testing

### Test Invalid Data
1. Try submitting form with empty fields
2. Expected: Error messages should appear

### Test Network Errors
1. Disconnect internet and try payment
2. Expected: Error message about payment processing failure

## Production Deployment

### Environment Variables for Production
```env
# Stripe (use live keys)
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key

# PayPal (use live credentials)
PAYPAL_CLIENT_ID=your_live_paypal_client_id
PAYPAL_CLIENT_SECRET=your_live_paypal_client_secret

# Application
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NODE_ENV=production
```

### Security Considerations
- Never commit `.env.local` to version control
- Use environment variables in your deployment platform
- Enable HTTPS in production
- Validate all inputs on the server side
- Use proper error handling and logging

## Troubleshooting

### Common Issues

1. **"Failed to create payment intent"**
   - Check Stripe secret key is correct
   - Verify Stripe account is active
   - Check network connectivity

2. **"PayPal configuration missing"**
   - Verify PayPal client ID and secret are set
   - Check PayPal app is in sandbox mode for testing

3. **Modal not opening**
   - Check browser console for JavaScript errors
   - Verify CheckoutModal component is imported correctly

4. **Cart not clearing after payment**
   - Check cart context dispatch is working
   - Verify CLEAR_CART action is defined

### Debug Mode
Add console.log statements in the checkout functions to debug:
```javascript
console.log('Order data:', orderData);
console.log('Response:', response);
```

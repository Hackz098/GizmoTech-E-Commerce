# Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

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

## Getting API Keys

### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Go to "Developers" > "API keys"
4. Copy your "Publishable key" and "Secret key"
5. Use test keys for development (they start with `pk_test_` and `sk_test_`)

### PayPal
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create an account or sign in
3. Go to "My Apps & Credentials"
4. Create a new app or use existing one
5. Copy "Client ID" and "Client Secret"
6. Use sandbox credentials for development

## Testing

### Stripe Test Cards
- **Visa**: 4242 4242 4242 4242
- **Visa (debit)**: 4000 0566 5566 5556
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005
- **Declined card**: 4000 0000 0000 0002
- **Insufficient funds**: 4000 0000 0000 9995

Use any future expiry date and any 3-digit CVC.

### PayPal Sandbox
- Use PayPal sandbox accounts for testing
- Create test accounts in PayPal Developer Dashboard
- Use sandbox credentials in your app

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo, totalAmount } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    if (!customerInfo || !customerInfo.fullName || !customerInfo.address) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `CASH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order object
    const order = {
      orderId,
      customerInfo,
      items,
      totalAmount,
      paymentMethod: 'cash',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    };

    // In a real application, you would save this order to a database
    // For now, we'll just log it and return success
    console.log('Cash on Delivery Order Created:', order);

    // You could also send confirmation emails, SMS, etc. here
    // await sendOrderConfirmationEmail(customerInfo.email, order);
    // await sendOrderNotificationToAdmin(order);

    return NextResponse.json({
      orderId: order.orderId,
      message: 'Order confirmed successfully',
      order,
    });

  } catch (error) {
    console.error('Cash checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process cash order' },
      { status: 500 }
    );
  }
}

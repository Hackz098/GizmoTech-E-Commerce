import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret'

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized - Admin authentication required' },
        { status: 401 }
      )
    }

    try {
      verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid admin token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, imageUrl } = body

    // Validate required fields
    if (!name || !description || !price || !imageUrl) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate price is a positive number
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { message: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    )
  }
}

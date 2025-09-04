import { NextResponse } from 'next/server'

const aiProducts = [
  {
    id: 1,
    name: "ChatGPT Plus",
    description: "GPT-5 with advanced reasoning, Expanded messaging and uploads, Expanded and faster image creation, Expanded memory and context, Expanded deep research and agent mode, Projects, tasks, custom GPTs, Sora video generation, Codex agent",
    price: 20.00,
    imageUrl: "https://images.unsplash.com/photo-1737894543924-15e1ff7adbdb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Perplexity Pro",
    description: "AI-powered search engine that provides comprehensive, accurate answers with source citations and real-time information.",
    price: 20.00,
    imageUrl: "https://iconlogovector.com/uploads/images/2025/01/lg-6792e2d75a11c-Perplexity.webp"
  },
  {
    id: 3,
    name: "SuperGrok",
    description: "xAI's conversational AI assistant with real-time knowledge access and a unique personality for engaging interactions.",
    price: 30.00,
    imageUrl: "https://play-lh.googleusercontent.com/dQRKhi30KpzG3gww3TdVLzyIAVuOAWylnAcgnEUxqfpm2A8dEt2sgApVvtKAy-DO8aI=w240-h480-rw"
  },
  {
    id: 4,
    name: "DeepSeek Pro Plan",
    description: "Advanced AI model specializing in coding, mathematics, and technical problem-solving with high accuracy.",
    price: 20.00,
    imageUrl: "https://images.unsplash.com/photo-1738107446089-5b46a3a1995e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Cursor Pro",
    description: "AI-powered code editor that understands your codebase and helps you write, edit, and debug code faster.",
    price: 15.00,
    imageUrl: "https://custom.typingmind.com/assets/models/cursor.png"
  },
  {
    id: 6,
    name: "Lovable AI",
    description: "AI-powered website builder that creates stunning, responsive websites in minutes with intelligent design suggestions.",
    price: 12.00,
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E12AQFLKtZB7ySliA/article-cover_image-shrink_720_1280/B4EZhScsI0HIAM-/0/1753729909690?e=2147483647&v=beta&t=DMJB12LkIPIrYwIymYhThhxTE2db3afVC8nY9B19rpE"
  }
]

export async function GET() {
  try {
    return NextResponse.json(aiProducts)
  } catch (error) {
    console.error('Error fetching AI products:', error)
    return NextResponse.json(
      { message: 'Failed to fetch AI products' },
      { status: 500 }
    )
  }
}

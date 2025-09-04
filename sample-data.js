// Sample product data for testing
// You can use this to populate your database with initial products

const sampleProducts = [
  {
    name: "Neon Gaming Headset",
    description: "High-quality gaming headset with neon blue LED lighting and crystal clear sound. Perfect for competitive gaming and immersive audio experiences.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    name: "Cyberpunk Keyboard",
    description: "Mechanical RGB keyboard with customizable neon blue backlighting. Features premium switches and aluminum frame for durability.",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b120d1b7b4e9?w=500&h=500&fit=crop"
  },
  {
    name: "Neon Blue Mouse",
    description: "Ergonomic gaming mouse with neon blue accent lighting. High DPI sensor and programmable buttons for ultimate control.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
  },
  {
    name: "LED Gaming Mousepad",
    description: "Extended RGB mousepad with neon blue LED border. Non-slip base and smooth surface for precise mouse movement.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  {
    name: "Neon Blue Speakers",
    description: "2.1 channel speaker system with neon blue LED accents. Deep bass and crisp highs for immersive audio.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop"
  },
  {
    name: "Gaming Monitor",
    description: "27-inch 144Hz gaming monitor with neon blue bezel accents. Ultra-fast response time and stunning visuals.",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop"
  }
];

// To add these products to your database, you can:
// 1. Use the admin panel at /admin
// 2. Or create a script to bulk insert them

console.log('Sample products ready for import:');
console.log(JSON.stringify(sampleProducts, null, 2));

module.exports = sampleProducts;

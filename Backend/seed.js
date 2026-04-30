import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    
    const admin = await User.findOne({ role: 'admin' }) || await User.findOne();
    
    if (!admin) {
      console.error('No user found to assign as seller. Please register a user first.');
      process.exit(1);
    }

    const products = [
      {
        name: 'MacBook Pro 16" M3 Max',
        description: 'The most powerful MacBook ever. Featuring the M3 Max chip, 64GB RAM, and 2TB SSD.',
        price: 3499,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
        seller: admin._id,
        stock: 10,
        badge: 'Top Rated'
      },
      {
        name: 'Herman Miller Aeron Chair',
        description: 'The gold standard of office chairs. Ergonomic design for peak productivity.',
        price: 1250,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
        seller: admin._id,
        stock: 25,
        badge: 'Premium'
      },
      {
        name: 'Sony A7IV Mirrorless Camera',
        description: 'Advanced full-frame mirrorless camera for professionals.',
        price: 2498,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
        seller: admin._id,
        stock: 5,
        badge: 'New'
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();

import Chance from 'chance';
const chance= new Chance()
import movieModel from './model/movie.js';
import './config/connectDb.js'
// import mongoose from 'mongoose';
const generateDummyData = () => {
    const dummyData = [];
  
    for (let i = 0; i < 2000; i++) {
      dummyData.push({
        title: chance.word(),
        genre: chance.word(),
        releaseYear: chance.integer({ min: 1900, max: 2022 }),
      });
    }
    return dummyData;
}  
const insertDummyData = async () => {
    const dummyData = generateDummyData();
  
    try {
      const movie= await movieModel.insertMany(dummyData);
      await movie.save();
      console.log('Dummy data inserted successfully.');
    } catch (error) {
      console.error('Error inserting dummy data:', error);
    } 
  };
  // export default insertDummyData;
  insertDummyData();
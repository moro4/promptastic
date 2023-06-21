import mongoose from 'mongoose';

let isDBConnected = false;

export async function connectToDB() {
   mongoose.set('strictQuery', true);

   if(isDBConnected) {
      console.log('MongoDB is already connected');
      return
   }

   try {
      await mongoose.connect(process.env.MONGODB_URI, {
         dbName: 'promptastic',
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      isDBConnected = true;

      console.log('MongoDB is connected');

   } catch (error) {
      console.log(error);
   }
}

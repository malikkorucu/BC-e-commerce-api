import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://malikkorucu:19981907@malikkorucu-qyi9g.mongodb.net/beauty-center?retrywrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongo db baglantısı başarılı');
    })
};

export default connectDatabase;

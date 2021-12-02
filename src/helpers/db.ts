import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://malikkorucu:19981907@malikkorucu-qyi9g.mongodb.net/travel-page?retrywrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongo db baglantısı başarılı');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;

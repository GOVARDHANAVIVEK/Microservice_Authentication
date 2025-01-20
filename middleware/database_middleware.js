const connectDB = async () => {
    try {
        console.log("connecting to mongoDB....")
      await mongoose.connect("mongodb+srv://govardhanavivek32:IamVivek32@microservices.pfp6w.mongodb.net/"||process.env.Mongo_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
  
//   mongodb+srv://govardhanavivek32:IamVivek32@microservicearchitecture.pfp6w.mongodb.net/Auth?retryWrites=true&w=majority
// connectDB()
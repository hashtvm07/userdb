import mongoose from 'mongoose';

interface ConnectResult {
  success: boolean;
  message: string;
}

const connectDB = async (): Promise<ConnectResult> => {
  try {
    console.log('Connecting to MongoDB...')
    
    // Set the strictQuery option
    mongoose.set('strictQuery', false); // or true, depending on your preference

    //dev
    // const mongodb = "mongodb+srv://adegusermgmtdev:S8vB5QHJlidy4zsW@atlpdevcluster-pl-0.limq9.mongodb.net/ADEGUserMgmt?retryWrites=true&w=majority&appName=ATLPDevCluster";
    //staging
    const mongodb = "mongodb://adegusrmgmuat:ZFUKh8Pz7qyMXQ5Q@KPDCSVDB116-UAT.sys.maqta.ae:27037,KPDCSVDB117-UAT.sys.maqta.ae:27037,KPDCSVDB118-UAT.sys.maqta.ae:27037/?replicaSet=MGmongodbUAT&authSource=AdegusermgmtUAT"
    
    const conn = await mongoose.connect(mongodb);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    return {
      success: true,
      message: `MongoDB Connected: ${conn.connection.host}`
    };
  } catch (error) {
    console.error(`MongoDB Connection Error: ${(error as Error).message}`);
    
    return {
      success: false,
      message: `Failed to connect to MongoDB: ${(error as Error).message}`
    };
  }
};

export default connectDB;
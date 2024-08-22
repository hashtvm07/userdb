import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI as string);

    //dev
    // const mongodb = "mongodb+srv://adegusermgmtdev:S8vB5QHJlidy4zsW@atlpdevcluster-pl-0.limq9.mongodb.net/ADEGUserMgmt?retryWrites=true&w=majority&appName=ATLPDevCluster";

    //staging
    const mongodb = "mongodb://rouser:8FS3N2q7JXqtAR@KPDCSVDB116-UAT.sys.maqta.ae:27037,KPDCSVDB117-UAT.sys.maqta.ae:27037,KPDCSVDB118-UAT.sys.maqta.ae:27037/?replicaSet=MGmongodbUAT&authSource=AdegusermgmtUAT"

    // const conn = await mongoose.connect(process.env.MONGO_URI as string);
    const conn = await mongoose.connect(mongodb as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    // process.exit(1);
  }
};

export default connectDB;
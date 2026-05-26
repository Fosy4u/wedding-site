import mongoose from "mongoose";

type GlobalWithMongoose = typeof globalThis & {
  mongooseConnection?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const globalForMongoose = globalThis as GlobalWithMongoose;

const cached = globalForMongoose.mongooseConnection ?? {
  conn: null,
  promise: null,
};

globalForMongoose.mongooseConnection = cached;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "wedding_website",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

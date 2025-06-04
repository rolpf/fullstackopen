const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_NAME_TEST = process.env.MONGO_NAME_TEST;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USER = process.env.MONGO_USER;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3001;

export default {
  MONGO_HOST,
  MONGO_NAME,
  MONGO_NAME_TEST,
  MONGO_PASSWORD,
  MONGO_USER,
  NODE_ENV,
  PORT,
};

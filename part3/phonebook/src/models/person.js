import mongoose from "mongoose";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_NAME = process.env.MONGO_NAME;

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME}?retryWrites=true&w=majority&appName=fullstackopen`;

mongoose.set("strictQuery", false);

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 24,
    required: true,
  },
  phone: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{2,6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Person", personSchema);

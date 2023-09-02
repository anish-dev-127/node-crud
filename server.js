import express from "express";
import mongoose from "mongoose";
const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
import userModel from "./modal.js";
import cors from 'cors';
app.use(cors());

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://anishkumar127dev:SouogBHqGCOSHd1W@cluster0.x6lggic.mongodb.net/anishbishnoi";

    const connection = await mongoose.connect(uri);

    if (connection) {
      console.log("connected successfully...");
    }
  } catch (error) {
    console.log(error);
  }
};
connectDB();
// try {

//   const conn = mongoose.createConnection(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 3000,
//   });

//   conn.once("open", () => {
//     console.log("Connected to MongoDB");
//   });

//   conn.on("error", (error) => {
//     console.error("MongoDB connection error:", error);
//   });
// } catch (error) {
//   console.log("error db", error);
// }

app.post("/store", async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    if (name && address && phone) {
      //   const user = new userModel({
      //     name,
      //     address,
      //     phone,
      //   });
      const user = new userModel(req.body);
      const responseSaved = await user.save();
      console.log(responseSaved);
      if (responseSaved) {
        return res.status(201).json({ message: "ho gya ji done" });
      } else {
        return res.status(500).json({ message: "error" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getall", async (req, res) => {
  try {
    const user = await userModel.find();

    if (user) {
      return res.status(200).json({ message: user });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getbyid/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await userModel.findById(id);

    if (user) {
      return res.status(200).json({ message: user });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/getbyid/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await userModel.findByIdAndRemove(id);

    if (user) {
      return res.status(200).json({ message: user });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/getbyid/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, phone } = req.body;
  console.log(id);
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        address,
        phone,
      },
      { new: true }
    );

    if (user) {
      return res.status(201).json({ message: user });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log("server is running.", PORT);
});

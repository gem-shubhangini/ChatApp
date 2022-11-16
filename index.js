import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
const app = express();
const port = process.env.PORT || 9000;
const connection_url = "mongodb+srv://admin1:Riya@cluster1.wgqe1yy.mongodb.net/?retryWrites=true&w=majority";

const pusher = new Pusher({
  appId: "1507651",
  key: "436e4833f50eb1ea41c2",
  secret: "d7d17275e47b8f27b4ab",
  cluster: "ap2",
  useTLS: true,
});

app.use(express.json());
app.use(cors())
mongoose.connect(connection_url);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("hello World"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log("listening on port : ", port));

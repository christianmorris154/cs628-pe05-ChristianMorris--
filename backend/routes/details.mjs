import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("details");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("details");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});

router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instruction: req.body.instruction,
  };
  let collection = await db.collection("details");
  let result = await collection.insertOne(newDocument);
  // Using 201 (Created) as the status code since we are returning a newly created document.
  res.status(201).send(result);
});

router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      ingredients: req.body.ingredients,
      instruction: req.body.instruction,
    },
  };

  let collection = await db.collection("details");
  let result = await collection.updateOne(query, updates);

  res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let collection = await db.collection("details");
  let result = await collection.deleteOne(query);

  res.status(200).send(result);
});

export default router;

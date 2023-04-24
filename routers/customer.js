const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

//end-points

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getCustomerById, async (req, res) => {
    try {
        res.status(200).json(res.customer);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getCustomerById, async (req, res) => {
    if(req.body.name != null) res.customer.name = req.body.name
    if(req.body.age != null) res.customer.age = req.body.age
    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

router.delete("/:id", getCustomerById, async (req, res) => {
  try {
    await res.customer.deleteOne()
    res.status(200).send("Successfully deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomerById(req, res, next) {
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if(customer == null) return res.status(400).json({message: "Cannot find customer"})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.customer = customer
    next()
}

module.exports = router;

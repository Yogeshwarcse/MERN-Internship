require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the app if connection fails
    });

// Mongoose Schema and Model
const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    amt: { type: String, required: true }
});

const Expense = mongoose.model("Expense", expenseSchema);

// API Endpoints

// Fetch all expenses
app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).send({ message: "Error fetching expenses", error: error.message });
    }
});

// Fetch a single expense by ID
app.get("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOne({ id });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).send({ message: "Error fetching expense", error: error.message });
    }
});

// Create a new expense
app.post("/api/expenses", async (req, res) => {
    const { title, amt } = req.body;
    const newExpense = new Expense({
        id: uuidv4(),
        title,
        amt
    });
    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).send({ message: "Error saving expense", error: error.message });
    }
});

// Delete an expense by ID
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ id });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting expense", error: error.message });
    }
});

// Update an expense by ID
app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amt } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { id },
            { title, amt },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).send({ message: "Expense not found" });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

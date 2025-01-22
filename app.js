
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');

mongoose.connect("mongodb+srv://Yogeshwar:<manimass1$>@cluster0.iaytw.mongodb.net/expenses")
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch(err => console.log("Error connecting to MongoDB:", err));

const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    amt: { type: String, required: true },  // Assuming 'amt' is meant to be a string
});

const Expense = mongoose.model("Expense", expenseSchema);


app.get("/api/expenses",(req,res)=>{
    console.log(req.query)
    res.status(200).json(expenses);
})
app.get("/api/expenses/:id",(req,res)=>{
    const {id}=req.params;
    const expense=expenses.find((expense)=>expense.id==id);
    if(!expense){
        res.status(404).json({message:"Not Found"});
        return
    }
    res.status(200).json(expense);
})

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

app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ id });
        if (!expense) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting expense", error: error.message });
    }
});

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

app.listen(3009, () => {
    console.log("server is running on port 3009");
});

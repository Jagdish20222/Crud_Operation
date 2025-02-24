const express = require('express');
const mysql = require("mysql2");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Establish the database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "J@gDISH6174",
    database: "crud",
});

db.connect(function (error) {
    if (error) {
        console.error("❌ Error Connecting to DB:", error.sqlMessage);
    } else {
        console.log("✅ Successfully Connected to DB");
    }
});

// Start the server
server.listen(8085, function (error) {
    if (error) {
        console.error("❌ Server Start Error:", error);
    } else {
        console.log("🚀 Server Started on port 8085");
    }
});

// Create Student Record
server.post("/api/student/add", (req, res) => {
    const { sname, course, fee } = req.body;
    
    if (!sname || !course || !fee) {
        return res.status(400).json({ status: false, message: "Missing required fields" });
    }

    let sql = "INSERT INTO student_crud (sname, course, fee) VALUES (?, ?, ?)";
    db.query(sql, [sname, course, fee], (error, result) => {
        if (error) {
            console.error("❌ Error inserting student:", error.sqlMessage);
            return res.status(500).json({ status: false, message: "Student creation failed", error: error.sqlMessage });
        }
        res.json({ status: true, message: "Student created successfully", id: result.insertId });
    });
});

// View All Students
server.get("/api/student", (req, res) => {
    let sql = "SELECT * FROM student_crud";
    db.query(sql, (error, result) => {
        if (error) {
            console.error("❌ Error fetching students:", error.sqlMessage);
            return res.status(500).json({ status: false, message: "Failed to fetch students", error: error.sqlMessage });
        }
        res.json({ status: true, data: result });
    });
});

// Search Student by ID
server.get("/api/student/:id", (req, res) => {
    let studentid = req.params.id;
    let sql = "SELECT * FROM student_crud WHERE id = ?";
    
    db.query(sql, [studentid], (error, result) => {
        if (error) {
            console.error("❌ Error fetching student:", error.sqlMessage);
            return res.status(500).json({ status: false, message: "Failed to fetch student", error: error.sqlMessage });
        }
        res.json({ status: true, data: result });
    });
});

// Update Student Record
server.put("/api/student/update/:id", (req, res) => {
    const { sname, course, fee } = req.body;
    let studentid = req.params.id;
    
    let sql = "UPDATE student_crud SET sname=?, course=?, fee=? WHERE id=?";
    
    db.query(sql, [sname, course, fee, studentid], (error, result) => {
        if (error) {
            console.error("❌ Error updating student:", error.sqlMessage);
            return res.status(500).json({ status: false, message: "Student update failed", error: error.sqlMessage });
        }
        res.json({ status: true, message: "Student updated successfully" });
    });
});

// Delete Student Record
server.delete("/api/student/delete/:id", (req, res) => {
    let studentid = req.params.id;
    let sql = "DELETE FROM student_crud WHERE id = ?";
    
    db.query(sql, [studentid], (error) => {
        if (error) {
            console.error("❌ Error deleting student:", error.sqlMessage);
            return res.status(500).json({ status: false, message: "Student deletion failed", error: error.sqlMessage });
        }
        res.json({ status: true, message: "Student deleted successfully" });
    });
});

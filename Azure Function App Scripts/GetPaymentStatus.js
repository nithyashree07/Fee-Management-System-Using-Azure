const sql = require("mssql");

// Azure SQL Database Configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, 
    enableArithAbort: true
  }
};

module.exports = async function (context, req) {
    try {
        const studentId = req.query.StudentID;

        if (!studentId) {
            context.res = {
                status: 400,
                body: "❌ Error: Please provide a valid StudentID."
            };
            return;
        }

        // Log that request is received
        console.log(`🔍 Fetching details for StudentID: ${studentId}`);

        // Connect to SQL Database
        await sql.connect(config);
        console.log("✅ Connected to SQL Database");

        // Execute SQL query securely
        const query = "SELECT Name, PaidAmount, TotalFee, DueDate FROM Students WHERE StudentID = @studentId";
        const request = new sql.Request();
        request.input("studentId", sql.Int, studentId);
        const result = await request.query(query);

        // Log SQL Query Execution
        console.log("📄 SQL Query Executed:", result.recordset);

        if (result.recordset.length === 0) {
            console.log("❌ No student found with this ID.");
            context.res = { status: 404, body: "Student not found." };
            return;
        }

        // Extract student data
        const student = result.recordset[0];

        const dueDate = new Date(student.DueDate);
        const today = new Date();

        let status = "Paid";
        if (student.PaidAmount < student.TotalFee) {
            status = dueDate < today ? "Overdue" : "Partially Paid";
        }

        console.log("✅ Returning payment status:", status);

        // Send the response
        context.res = {
            status: 200,
            body: {
                StudentID: studentId,
                Name: student.Name,
                PaidAmount: student.PaidAmount,
                TotalFee: student.TotalFee,
                DueDate: dueDate.toISOString().split("T")[0], 
                PaymentStatus: status
            }
        };
    } catch (error) {
        console.error("❌ Server Error:", error);
        context.res = {
            status: 500,
            body: `❌ Error: ${error.message}`
        };
    } finally {
        sql.close();
    }
};

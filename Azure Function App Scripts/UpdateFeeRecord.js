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
    const { StudentID, PaidAmount } = req.body;

    if (!StudentID || PaidAmount === undefined) {
      context.res = {
        status: 400,
        body: "StudentID and PaidAmount are required."
      };
      return;
    }

    // Connect to SQL Database
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Students 
      SET PaidAmount = ${PaidAmount} 
      WHERE StudentID = ${StudentID}`;

    if (result.rowsAffected[0] === 0) {
      context.res = {
        status: 404,
        body: "Student not found."
      };
      return;
    }

    context.res = {
      status: 200,
      body: { message: "Fee record updated successfully." }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: `Error: ${error.message}`
    };
  } finally {
    sql.close();
  }
};

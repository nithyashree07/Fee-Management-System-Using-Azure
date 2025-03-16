# Fee-Management-System-Using-Azure
The Azure Fee Management System is a cloud-based application that automates student fee tracking, notifications, and updates. It is built using Azure Functions, Azure API Management (APIM), Azure SQL Database, and Logic Apps, with a frontend hosted on Azure Storage.


# Tech Stack Used:

Frontend: HTML, CSS, JavaScript

Backend: Azure Functions (Node.js)

Database: Azure SQL Database

API Gateway: Azure API Management (APIM)

Authentication: Microsoft Entra ID (Azure AD)

Email Automation: Azure Logic Apps

Hosting: Azure Static Web Apps

# Tasks:
# Task 1: Data Storage
1. Design an Azure SQL Database with tables for:
   - Students (`StudentID`, `Name`, `Course`, `TotalFee`, `PaidAmount`, `DueDate`).
   - Administrators (`AdminID`, `Name`, `Role`).
2. Populate the database with sample data for at least 20 students.
# Task 2: Automation
1. Create a Logic App or Durable Function to:
   - Fetch records of students with overdue payments.
   - Send email reminders using SendGrid or Outlook.
# Task 3: Payment Status API
1. Build an Azure Function that:
   - Fetches fee details based on `StudentID`.
   - Returns the payment status as "Paid", "Partially Paid", or "Overdue".
2. Use Azure API Management to expose the function securely:
   - Include rate limiting and authentication via API keys.
# Task 4: Secure Updates for Administrators
1. Create an API endpoint for admins to update fee records.
2. Secure this endpoint using Azure AD with RBAC.
# Task 5: Scalability and Monitoring
1. Use Azure Application Insights to monitor the solution.
2. Add retry policies for Logic Apps .


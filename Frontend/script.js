const API_BASE_URL = "https://feepaymentapim1.azure-api.net";
const API_KEY = "4bc601d72f0d40a2af83215c3de7b9a7"; 

// Azure AD Authentication Config
const msalConfig = {
    auth: {
        clientId: "c1955194-a0a3-4e78-be94-ff94758a9e3f",  
        authority: "https://login.microsoftonline.com/e343fcd5-54a9-4674-9904-5cea1931f3f6", 
        redirectUri: "https://feepaymentstorage.z5.web.core.windows.net/" 
    }
};
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Show Student View
function showStudentView() {
    document.getElementById("roleSelection").classList.add("hidden");
    document.getElementById("studentView").classList.remove("hidden");
}

// Show Admin View
function showAdminView() {
    document.getElementById("roleSelection").classList.add("hidden");
    document.getElementById("adminView").classList.remove("hidden");
}

// Go Back to Role Selection
function goBack() {
    document.getElementById("studentView").classList.add("hidden");
    document.getElementById("adminView").classList.add("hidden");
    document.getElementById("roleSelection").classList.remove("hidden");
}


// Fetch Fee Status (For Both Student & Admin)
async function fetchFeeStatus(isAdmin = false) {
    const studentId = isAdmin 
        ? document.getElementById("adminStudentId").value // 🔹 Admin Input Field
        : document.getElementById("studentId").value;     // 🔹 Student Input Field

    if (!studentId) {
        alert("Please enter a Student ID.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/GetPayementStatus/GetPaymentStatus?StudentID=${studentId}`, {
            method: "GET",
            headers: { 
                "Ocp-Apim-Subscription-Key": API_KEY, // ✅ Ensure API Key is included
                "Authorization": isAdmin ? `Bearer ${sessionStorage.getItem("token")}` : "", // ✅ Add token if Admin
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const resultDiv = isAdmin ? "adminStatusResult" : "statusResult"; // ✅ Show result in correct section

        document.getElementById(resultDiv).innerHTML = `
            <p><strong>Name:</strong> ${data.Name}</p>
            <p><strong>Payment Status:</strong> ${data.PaymentStatus}</p>
            <p><strong>Total Fee:</strong> ₹${data.TotalFee}</p>
            <p><strong>Paid Amount:</strong> ₹${data.PaidAmount}</p>
            <p><strong>Due Date:</strong> ${data.DueDate}</p>
        `;
    } catch (error) {
        console.error("Error fetching fee status:", error);
        document.getElementById(resultDiv).innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}



// Admin Login
async function login() {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["openid", "profile", "User.Read"]
        });
        sessionStorage.setItem("token", loginResponse.accessToken);
        alert("Login successful! You can now update fee records.");
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
    }
}

// Update Fee Payment
async function updateFee() {
    const studentId = document.getElementById("updateStudentId").value;
    const paidAmount = document.getElementById("paidAmount").value;
    const token = sessionStorage.getItem("token");

    if (!token) {
        alert("You must log in as an admin to update fees.");
        return;
    }

    if (!studentId || !paidAmount) {
        alert("Please enter both Student ID and Paid Amount.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/UpdateFeeRecord/UpdateFeeRecord`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": API_KEY,
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ StudentID: studentId, PaidAmount: paidAmount })
        });

        const data = await response.json();
        document.getElementById("updateMessage").innerHTML = `<p style="color:green;">${data.message}</p>`;
    } catch (error) {
        document.getElementById("updateMessage").innerHTML = `<p style="color:red;">Error updating fee.</p>`;
    }
}

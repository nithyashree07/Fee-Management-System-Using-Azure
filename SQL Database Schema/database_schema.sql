CREATE TABLE Students ( StudentID INT PRIMARY KEY, Name NVARCHAR(100), Course NVARCHAR(100), TotalFee DECIMAL(10,2), PaidAmount DECIMAL(10,2), DueDate DATE, Email NVARCHAR(255) );
CREATE TABLE Administrators ( AdminID INT PRIMARY KEY, Name NVARCHAR(100), Role NVARCHAR(50) );
INSERT INTO Students (StudentID, Name, Course, TotalFee, PaidAmount, DueDate, Email)
VALUES
(1001, 'Ram', 'Computer Science', 5000, 2500, '2025-03-20', 'linghesh17@gmail.com'),
(1002, 'Jeyanth', 'Mathematics', 4000, 4000, '2025-04-10', '211501060@rajalakshmi.edu.in'),
(1003, 'BavaShree', 'Physics', 4500, 2000, '2025-03-25', 'nithyashreekp07@gmail.com'),
(1004, 'Haritha', 'Supply Chain', 6000, 3000, '2025-04-15', '211501060@rajalakshmi.edu.in'),
(1005, 'Nirai', 'Cybersecurity', 5500, 5500, '2025-04-05', '211501060@rajalakshmi.edu.in'),
(1006, 'Linghesh', 'Deep Learning', 4800, 2000, '2025-03-12', 'linghesh17@gmail.com'),
(1007, 'Kamalesh', 'Deep Learning', 4700, 1000, '2025-03-12', '211501040@rajalakshmi.edu.in'),
(1008, 'Thirumalaivasan', 'Accounts', 7000, 7000, '2025-04-02', 'nithyashreekp07@gmail.com'),
(1009, 'Dheva', 'Cost Management', 5300, 3000, '2025-03-15', 'nithyashreekp07@gmail.com'),
(1010, 'Marzooq', 'Machine Learning', 3900, 1500, '2025-03-15', 'nithyashreekp07@gmail.com'),
(1011, 'Monisha', 'Computer Science', 5000, 5000, '2025-03-10', 'nithyashreekp07@gmail.com'),
(1012, 'Yalini', 'Mathematics', 4000, 1000, '2025-04-08', 'nithyashreekp07@gmail.com'),
(1013, 'Nathiya', 'Physics', 4500, 2000, '2025-03-25', 'nithyashreekp07@gmail.com'),
(1014, 'Dhanasri', 'Machine Learning', 6000, 6000, '2025-04-20', 'nithyashreekp07@gmail.com'),
(1015, 'Hemapriya', 'Cybersecurity', 5500, 2500, '2025-04-15', 'shomnathp31@gmail.com'),
(1016, 'Sridevi', 'Accounts', 4800, 4800, '2025-03-18', 'shomnathp31@gmail.com'),
(1017, 'Harinath', 'Cost Management', 4700, 4700, '2025-03-22', 'shomnathp31@gmail.com'),
(1018, 'Kabilesh', 'Supply chain', 7000, 3000, '2025-04-04', 'shomnathp31@gmail.com'),
(1019, 'Nishanth', 'Data Visualization', 5300, 5300, '2025-04-14', 'shomnathp31@gmail.com'),
(1020, 'Nithish', 'Data Visualization', 3900, 1000, '2025-03-26', 'shomnathp31@gmail.com');

INSERT INTO Administrators (AdminID, Name, Role)
VALUES
(101, 'Ms. Nithya Shree', 'Head of Accounts'),
(102, 'Mrs. Saritha', 'Finance Manager'),
(103, 'Mr. Shomnath', 'Auditor'),
(104, 'Mr. Parasumuthu', 'IT Administrator');

SELECT * FROM Students;
SELECT * FROM Administrators; 

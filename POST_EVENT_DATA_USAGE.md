# 🎓 Post-Event Data Usage Guide

This guide explains how to use the data collected during your symposium events for generating certificates, reports, and analysis.

## 📥 Getting Your Data

### 1. **Export Event Attendance**
For each event (e.g., Codeathon, Paper Presentation), you can now export a list of **only the participants who attended**.

1.  Go to the **Events Attendance** tab.
2.  Select the event from the dropdown.
3.  Click the **"Export Attendance List"** button next to the event title.
4.  This downloads an Excel file (e.g., `Codeathon_Attendance_Report.xlsx`).

### 2. **What's in the Excel File?**
The file contains the following columns for every attended participant:
-   **S.No**: Serial Number
-   **Name**: Full Name
-   **Email**: Email Address
-   **Phone**: Contact Number
-   **College Type**: Outer / Intra / Dept
-   **College Name**: Name of their institution
-   **Register Number**: Their ID number
-   **Department**: Their department
-   **Year**: Year of study
-   **Section**: Section (if applicable)
-   **Attendance Status**: "Present"

---

## 🛠️ How to Use This Data

### 📜 Generating Certificates
Most certificate generation tools (like **Certify'em**, **AutoCrat**, or custom scripts) require a CSV or Excel file as input.

1.  **Use the Exported File**: The file you just downloaded is perfectly formatted for this.
2.  **Filter (Optional)**: If you only want to give certificates to winners, you can manually add a "Winner" column in Excel and mark them.
3.  **Mail Merge**: use Word's Mail Merge feature with this Excel sheet to print physical certificates.

### 📊 Reporting & Analysis
You can use the exported data to create a final report for the symposium.

-   **Total Participation**: Sum the rows in all your event export files.
-   **College Representation**: Create a pivot table in Excel to see which colleges sent the most students.
-   **Department Breakdown**: Analyze which departments were most active.

### 🏆 Prize Distribution
Use the printed or digital list to verify winners.
-   When a student claims a prize, check their name against the **"Attendance List"** to ensure they were actually present at the event.

---

## 🔒 Data Safety

-   **Where is it stored?** The attendance status (green checkmarks) is stored in your **browser's local storage**.
-   **Recommendation**: **Export your data immediately after the event ends.**
-   **Why?** If you clear your browser cache or switch computers, the "Attended" status logic might be reset (though the registration data is safe in the database).
-   **Best Practice**: Download the Excel sheet for every event at the end of the day.

---

## ❓ FAQ

**Q: Can I export data for all events at once?**
A: Currently, you export one event at a time to keep the files organized and specific to that event's coordinators.

**Q: What if I made a mistake and marked someone absent?**
A: You can toggle them back to "Attended" in the app and re-export the file. The new file will be accurate.

**Q: Is the payment data included?**
A: Yes, the system ensures only valid, registered participants are shown in the list.

---

**System Status**: ✅ Ready for Post-Event Processing

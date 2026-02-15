# Quick Reference Guide - Excel Export Filters

## 🎯 New Filter Options

### 📚 Filter by Year (Class)
```
Location: Advanced Export Dialog → Filter by Year
Icon: 🎓 Graduation Cap
Options:
  • All Years (default)
  • 1st Year
  • 2nd Year
  • 3rd Year
  • 4th Year
```

### 🏢 Filter by Department
```
Location: Advanced Export Dialog → Filter by Department
Icon: 🏢 Building
Type: Text Input (Free text)
Examples:
  • "CSE" - Computer Science
  • "AI&DS" - Artificial Intelligence & Data Science
  • "ECE" - Electronics & Communication
  • "MECH" - Mechanical Engineering
  • Leave empty for all departments
Note: Case-insensitive, partial matching
```

### 👥 Filter by Section
```
Location: Advanced Export Dialog → Filter by Section
Icon: 👥 Users
Options:
  • All Sections (default)
  • Section A
  • Section B
  • Section C
  • Section D
```

## 🚀 Quick Start Examples

### Example 1: 3rd Year AI&DS Section A
```
✓ Sources: Department
✓ Year: 3rd Year
✓ Department: AI&DS
✓ Section: Section A
✓ Status: All
→ Result: Only 3rd year AI&DS Section A students
```

### Example 2: All CSE Students
```
✓ Sources: Intra College
✓ Year: All Years
✓ Department: CSE
✓ Section: All Sections
✓ Status: All
→ Result: All CSE students from all years and sections
```

### Example 3: 2nd Year Students (All Departments)
```
✓ Sources: All
✓ Year: 2nd Year
✓ Department: (empty)
✓ Section: All Sections
✓ Status: All
✓ Combine Sheets: ON
→ Result: All 2nd year students in one sheet
```

### Example 4: Section B Students Who Entered
```
✓ Sources: Department
✓ Year: All Years
✓ Department: (empty)
✓ Section: Section B
✓ Status: Entry Confirmed only
→ Result: Section B students who have entered the event
```

## 📊 Export File Naming
```
Format: Vyuga_Advanced_Export_YYYY-MM-DD.xlsx
Example: Vyuga_Advanced_Export_2026-02-15.xlsx
```

## ⚙️ Filter Behavior

| Filter Type | Matching Logic | Case Sensitive |
|-------------|----------------|----------------|
| Year        | Exact match    | N/A            |
| Department  | Partial match  | No             |
| Section     | Exact match    | No             |
| Event       | Exact match    | N/A            |

## 💡 Pro Tips

1. **Combine Multiple Filters**: All filters work together (AND logic)
   - Year: 3rd + Department: CSE + Section: A = Only 3rd year CSE Section A

2. **Department Shortcuts**: Use abbreviations for faster filtering
   - "AI" matches "AI&DS", "AIML"
   - "E" matches "ECE", "EEE"

3. **Export Organization**: 
   - Use "Combine Sheets: OFF" for separate analysis
   - Use "Combine Sheets: ON" for unified reports

4. **Column Selection**: Deselect unnecessary columns to reduce file size
   - For attendance: Keep Name, Register No, Section, Entry Status
   - For contact: Keep Name, Email, Phone

5. **Status Filtering**: 
   - Pending only → Follow-up list
   - Verified only → Ready for entry
   - Entry Confirmed only → Attendance list

## 🔍 Troubleshooting

**Q: No data in export?**
- Check if filters are too restrictive
- Verify data exists for selected criteria
- Try "All" options to see available data

**Q: Department filter not working?**
- Check spelling
- Try shorter text (e.g., "CS" instead of "CSE")
- Leave empty and filter in Excel if needed

**Q: Section filter shows wrong data?**
- Ensure section data is populated in database
- Check if registration type has section field

## 📱 Access Path
```
Admin Dashboard → Login → Advanced Export Button → Configure Filters → Download Report
```

---
**Feature Version**: 1.0  
**Compatible With**: Vyuga'26 Admin Dashboard  
**Last Updated**: February 15, 2026

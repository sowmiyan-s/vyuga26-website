# Excel Export Feature - Filter by Class, Department, and Section

## Overview
This feature enhancement adds advanced filtering capabilities to the Excel export functionality in the Admin Dashboard. Administrators can now export registration data filtered by specific year (class), department, and section.

## Features Added

### 1. **Year Filter (Class Filter)**
- Filter registrations by academic year (1st, 2nd, 3rd, or 4th year)
- Dropdown selection with "All Years" option
- Applies to all registration types (Outer College, Intra College, Department)

### 2. **Department Filter**
- Free-text input field for department filtering
- Supports partial matching (case-insensitive)
- Examples: CSE, AI&DS, ECE, MECH, etc.
- Leave empty to include all departments

### 3. **Section Filter**
- Filter registrations by section (A, B, C, D)
- Dropdown selection with "All Sections" option
- Particularly useful for department registrations

## How to Use

### Accessing the Advanced Export Feature

1. **Login to Admin Dashboard**
   - Navigate to the admin page
   - Enter admin credentials

2. **Open Advanced Export Dialog**
   - Click the "Advanced Export" button in the top-right corner
   - A comprehensive export configuration dialog will open

3. **Configure Export Filters**

   **Data Sources:**
   - Select which registration types to include:
     - ☑ Outer College
     - ☑ Intra College
     - ☑ AI&DS Department

   **Sort Order:**
   - Sort by ID (Default) - Chronological order
   - Sort by Name - Alphabetical order

   **Filter Status:**
   - ☑ Pending - Unverified payments
   - ☑ Verified - Payment verified but not entered
   - ☑ Entry Confirmed - Students who have entered the event

   **Filter by Event:**
   - Select a specific event or "All Events"

   **Filter by Year (NEW):**
   - Select academic year: 1st, 2nd, 3rd, 4th Year
   - Or select "All Years" for no filtering

   **Filter by Department (NEW):**
   - Enter department name or code (e.g., "CSE", "AI&DS", "ECE")
   - Supports partial matching
   - Leave empty for all departments

   **Filter by Section (NEW):**
   - Select section: A, B, C, or D
   - Or select "All Sections" for no filtering

   **Include Columns:**
   - Select which data fields to include in the export
   - Options: ID, Name, Email, Phone, College, Register No, Year, Department, Section, Payment Status, Entry Status, Selected Events, Registration Date

   **Combine Sheets:**
   - Toggle ON to combine all sources into a single sheet
   - Toggle OFF to create separate sheets for each source

4. **Download Report**
   - Click "Download Report" button
   - Excel file will be downloaded with filename: `Vyuga_Advanced_Export_YYYY-MM-DD.xlsx`

## Use Cases

### Example 1: Export All 3rd Year AI&DS Students (Section A)
```
✓ Data Sources: AI&DS Department
✓ Year Filter: 3rd Year
✓ Department Filter: (leave empty or "AI&DS")
✓ Section Filter: Section A
✓ Status: All (Pending, Verified, Entry Confirmed)
```

### Example 2: Export CSE Students Who Registered for "Code Sprint"
```
✓ Data Sources: Intra College
✓ Event Filter: Code Sprint
✓ Department Filter: CSE
✓ Year Filter: All Years
✓ Section Filter: All Sections
```

### Example 3: Export 2nd Year Students from All Departments
```
✓ Data Sources: All (Outer, Intra, Department)
✓ Year Filter: 2nd Year
✓ Department Filter: (leave empty)
✓ Section Filter: All Sections
✓ Combine Sheets: ON
```

### Example 4: Export Only Verified Payments for ECE Department
```
✓ Data Sources: Intra College
✓ Status: Verified only (uncheck Pending and Entry Confirmed)
✓ Department Filter: ECE
✓ Year Filter: All Years
```

## Technical Implementation

### Files Modified
- `src/pages/Admin.tsx`

### Changes Made

1. **State Management**
   - Added `yearFilter`, `deptFilter`, and `sectionFilter` to `exportConfig` state

2. **Filter Logic**
   - Updated `shouldInclude()` function in `handleAdvancedExportLogic()`
   - Added year matching: `r.year.toString() !== exportYearFilter`
   - Added department matching: Case-insensitive partial string matching
   - Added section matching: Case-insensitive exact matching

3. **UI Components**
   - Added Year Filter dropdown with GraduationCap icon
   - Added Department Filter text input with Building2 icon
   - Added Section Filter dropdown with Users icon
   - Expanded dialog width from `max-w-3xl` to `max-w-5xl`
   - Added scrolling support with `max-h-[90vh] overflow-y-auto`

### Filter Logic Details

```typescript
// Year Filter
if (exportYearFilter !== "all" && r.year.toString() !== exportYearFilter) {
  return false;
}

// Department Filter (partial, case-insensitive)
if (exportDeptFilter !== "" && r.department && 
    !r.department.toLowerCase().includes(exportDeptFilter.toLowerCase())) {
  return false;
}

// Section Filter (exact, case-insensitive)
if (exportSectionFilter !== "all" && r.section && 
    r.section.toLowerCase() !== exportSectionFilter.toLowerCase()) {
  return false;
}
```

## Benefits

1. **Targeted Data Export**: Export only the data you need
2. **Reduced File Size**: Smaller, more manageable Excel files
3. **Better Organization**: Separate exports for different classes/departments
4. **Time Saving**: No need to manually filter data in Excel
5. **Flexible Combinations**: Combine multiple filters for precise data extraction

## Notes

- All filters work together (AND logic)
- Filters apply to all selected data sources
- Empty/default filter values mean "no filtering" for that criterion
- Department filter uses partial matching for flexibility
- Section filter is case-insensitive (a = A)

## Future Enhancements

Potential improvements for future versions:
- Multi-select for sections
- Date range filtering
- Custom field selection per source type
- Export templates/presets
- Scheduled exports
- Email delivery of exports

---

**Version**: 1.0  
**Last Updated**: February 15, 2026  
**Author**: Admin Dashboard Enhancement

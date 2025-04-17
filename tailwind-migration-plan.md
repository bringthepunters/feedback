# Tailwind Migration & Layout Restructuring Plan

## Overview

This plan details how to migrate the current CSS to Tailwind and restructure the layout, while ensuring all text content continues to be dynamically loaded from the Google Sheet export.

---

## Current Content Flow

- **Google Sheet** is the single source of truth for all text content.
- **instructions.json** and **cardtext.json** are exported from the Google Sheet.
- **convert_to_csv.js** combines these into **all-content.csv**.
- **index.html** loads all-content.csv and dynamically populates the UI (instructions, cards, etc.) from this file.
- No text content is hardcoded in the HTML.

---

## Migration & Restructuring Steps

1. **Remove All Custom CSS**
   - Delete the entire `<style>` block from the `<head>` of `index.html`.
   - Remove all class-based layout and appearance classes from the HTML that are not needed for JavaScript logic.

2. **Add Tailwind CSS**
   - Add the Tailwind CDN link in the `<head>` before any custom scripts or styles.

3. **Keep Google Fonts**
   - Retain the existing `<link>` tags for Google Fonts in the `<head>`.

4. **Badge Image Refactor**
   - Replace the badge `<div id="badge"></div>` with an `<img src="badge.png" alt="Badge" />` for easier Tailwind styling.

5. **6-Column Tailwind Grid Layout**
   - Use Tailwind’s grid utilities to create a 6-column layout for the main content.
   - **Column 1:** Place the badge image and instructions, stacked vertically.
   - **Columns 2-6:** Place all other content (drop zones, card grid, etc.), using Tailwind’s grid and flex utilities for responsive arrangement.

6. **Instructions Panel**
   - Keep the instructions content dynamically loaded from all-content.csv (as currently implemented).
   - Style the instructions panel using Tailwind classes.

7. **Popup/Modal**
   - Keep the popup/modal overlaying the whole screen, styled with Tailwind for appearance and positioning.

8. **Remove All Old CSS Classes (Except for JS Hooks)**
   - Only keep classes that are referenced by JavaScript for logic (e.g., `card`, `card-container`, `drop-zone`), but use Tailwind for all visual styling.

---

## Example Layout Diagram (Mermaid)

```mermaid
grid
    columns 6
    row 1: [Badge+Instructions][Drop Zones + Card Grid + Popup (spans cols 2-6)]
```

---

## Implementation Notes

- All text content will continue to be loaded dynamically from the Google Sheet export (via all-content.csv).
- The popup/modal and card logic remain unchanged except for styling.
- The new layout and appearance will be managed entirely with Tailwind utility classes for easier future changes.

---

## Next Steps

1. Implement the above plan in the codebase.
2. Test to ensure all content is still loaded dynamically and the new layout is correct.
3. Adjust Tailwind classes as needed for appearance and responsiveness.
# Feedback Tarot

An interactive web application that helps users explore different feedback archetypes through a card-based interface.

## Features

- Interactive card display with flip animations
- Drag and drop interface for selecting feedback archetypes
- Detailed popup information for each archetype
- Content dynamically loaded from a Google Sheet for easy updates
- Responsive design using Tailwind CSS

## Technical Details

- Pure HTML, JavaScript, and Tailwind CSS (no build step required)
- Data sourced from Google Sheets (no database needed)
- Optimized for modern browsers

## Layout

The application uses a 6-column grid layout:
- Column 1: Badge image and instructions
- Columns 2-6: Interactive content (drop zones and card grid)

## Content Management

All text content comes from the Google Sheet. To update text:
1. Edit the Google Sheet content
2. Refresh the application with the "Refresh Data" button
3. For a complete refresh that clears all cache, use "FORCE RELOAD DATA"

## File Structure

- `index.html` - Main application
- `card.html` - Card template (referenced by the main application)
- `badge.png` - The main badge image
- `card numbers (n).png` - Card images
- `green-fabric.png` - Background texture
- `cardtext.json` & `instructions.json` - Local copies of content (not used directly)
- `convert_to_csv.js` - Utility to convert JSON to CSV format
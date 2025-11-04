# MyProtection Web App

An educational liability exposure calculator that helps users understand their insurance protection needs.

## Overview

MyProtection is a single-page static web application that calculates a user's "MyProtection Number" based on their assets and income. It's designed to help people understand their liability exposure and recommend appropriate auto insurance coverage limits.

## Features

- **Educational Tool**: Helps users understand their protection needs
- **Asset Analysis**: Calculates exposure based on home value, vehicles, savings, and income
- **Coverage Recommendations**: Suggests appropriate liability limits based on exposure
- **Email Integration**: Users can email their results to Tre Scott at Country Financial
- **Appointment Booking**: Direct link to book appointments via Outlook
- **Responsive Design**: Works on desktop and mobile devices
- **No Data Storage**: All calculations are done client-side, no data is stored

## Tech Stack

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- No external dependencies

## File Structure

```
MyProtection/
├── index.html      # Main application file
├── style.css       # Styling and responsive design
├── script.js       # Business logic and calculations
└── README.md       # This file
```

## Deployment Instructions

### GitHub Pages (Recommended)

1. Create a new GitHub repository named `MyProtection`
2. Upload all three files (`index.html`, `style.css`, `script.js`) to the repository root
3. Go to repository Settings → Pages
4. Select Source: "Deploy from a branch" → Branch: "main" → Folder: "/ (root)"
5. Your site will be available at: `https://<yourusername>.github.io/MyProtection/`

### Alternative Hosting

- **Netlify**: Drag and drop the project folder to Netlify Deploy
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Any static hosting**: Upload the files to your web server

## Business Logic

### Exposure Calculation

Total Protection Exposure = Home Value + Vehicle Value + Savings/Investments + Annual Income

### Coverage Recommendations

| Exposure Level | Recommended Coverage |
|----------------|---------------------|
| ≤ $60,000      | 30/60              |
| $61,000–$100,000 | 50/100           |
| $100,000–$300,000 | 100/300         |
| $300,000–$500,000 | 500/500         |
| $500,000+      | 500/500 + $1M Umbrella |

### Contact Information

- **Email Results**: Tre.Scott@countryfinancial.com
- **Appointment Booking**: [Outlook Calendar Link](https://outlook.office365.com/book/TreScottAgencyCOUNTRYFinancial@countryfinancial.com/?RefID=rep_bio&ismsaljsauthenabled=true)

## Questions Asked

1. **Home Value**: Home equity can be at risk in lawsuits
2. **Total Vehicle Value**: Vehicles can be used to satisfy judgments
3. **Savings & Investments**: Assets at risk if liability exceeds coverage
4. **Annual Household Income**: Courts can garnish wages
5. **Life Insurance**: Part of overall protection plan
6. **Current Auto Liability Coverage**: Compare against recommended limits

## Customization

### Colors
The app uses Country Financial's color palette:
- Primary Green: `#78BE20`
- Dark Green: `#004734`
- Light Green: `#E8F5E8`

### Contact Information
Update the contact email and booking link in `script.js`:
- Line ~225: Email address for results
- Line ~230: Outlook booking URL

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Legal Disclaimer

This is an educational tool only and does not constitute a quote, offer, or guarantee of coverage. No user data is stored by this application.

## Author

Created by MiniMax Agent  
For: Tre Scott, Agency Owner affiliated with Country Financial

---

© 2025 MyProtection
# CDC Dukkan - Team Grocery Tracker

A modern, responsive web application for tracking team grocery expenses with monthly payment management.

## Features

- **Dashboard**: View monthly summary, payment status, and recent bills
- **Admin Panel**: Add members, manage payments, add bills, and navigate months
- **History**: View past months' data and statistics
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Local Storage**: All data is saved locally in the browser
- **Modern UI**: Beautiful gradient theme with smooth animations

## How to Use

### Initial Setup
1. Open `index.html` in any modern web browser
2. The welcome screen will appear for 5 seconds
3. You'll see the dashboard with current data (Ismail and Basil already added)

### Dashboard
- View total collected money, total spent, and remaining balance
- See payment status for all members (✅ for paid, ❌ for unpaid)
- Check recent bills for the current month

### Admin Panel
- **Add New Member**: Enter name and click "Add Member"
- **Manage Payments**: Toggle payment status for each member
- **Add New Bill**: Enter amount and description, then click "Add Bill"
- **Next Month**: Move to next month (saves current month to history)
- **Delete Bills**: Use the trash icon to remove bills

### History
- View data from previous months
- See payment status and bills for each past month
- Statistics include collected, spent, remaining amounts

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files (index.html, styles.css, script.js)
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your website will be available at: `https://yourusername.github.io/repositoryname`

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage for data persistence
- **Responsive**: Mobile-first design with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.0.0
- **Theme Colors**: 
  - Primary: #2d13e9 (Blue)
  - Secondary: #ff7901 (Orange)

## File Structure

```
cdc-dukkan/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Data Storage

All data is stored locally in your browser using localStorage. This means:
- Data persists between browser sessions
- Data is private to your browser
- No internet connection required after initial load
- Data will be lost if browser data is cleared

## Support

For any issues or questions, contact the development team.

---

**Powered by Basil & Ismail**


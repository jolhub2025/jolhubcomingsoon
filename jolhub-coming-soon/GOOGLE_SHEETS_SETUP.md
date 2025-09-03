# JolHub Google Sheets Integration Setup

This guide explains how to connect your JolHub registration form to Google Sheets for automatic data collection.

## 🚀 Quick Setup Steps

### Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1yzDei15AAxL6CuR_0YXtjh3-2o9VY4Q0JYbXJniuzIs/edit?gid=0#gid=0
2. **IMPORTANT**: Add these exact column headers in row 1:
   ```
   Timestamp | First Name | Last Name | Email | Phone | Company | Event Types | Referral Source
   ```
3. Save the sheet

### Step 2: Create Google Apps Script

1. Go to https://script.google.com/
2. Click "**New project**"
3. **Replace ALL default code** with the content from `google-apps-script.js`
4. **Important**: Update the `SHEET_ID` in the script:
   ```javascript
   const SHEET_ID = '1yzDei15AAxL6CuR_0YXtjh3-2o9VY4Q0JYbXJniuzIs';
   ```
5. Save the project (Ctrl+S) with name "JolHub Registration Handler"

### Step 3: Deploy the Script

1. Click "**Deploy**" button (top right)
2. Choose "**New deployment**"
3. Click the ⚙️ gear icon next to "Type" → Select "**Web app**"
4. **Configure deployment**:
   - Description: `JolHub Registration Form Handler`
   - Execute as: **Me (your email)**
   - Who has access: **Anyone**
5. Click "**Deploy**"
6. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfyc...../exec`)

### Step 4: Update Your React App

1. Open `src/App.tsx`
2. Find line ~89:
   ```javascript
   const response = await fetch('YOUR_DEPLOYED_SCRIPT_URL_HERE', {
   ```
3. Replace `YOUR_DEPLOYED_SCRIPT_URL_HERE` with your actual Web app URL

### Step 5: Test the Integration

1. Restart your dev server: `npm run dev`
2. Fill out the registration form
3. Submit and check your Google Sheet for new data

## 🔧 Troubleshooting

### Data Not Appearing in Sheet?

1. **Check Script Permissions**:
   - Go to https://script.google.com/
   - Open your project → Click "Deploy" → "Manage deployments"
   - Ensure "Execute as" is set to "Me"

2. **Check Sheet ID**:
   - Verify the `SHEET_ID` in your script matches your sheet URL
   
3. **Check Column Headers**:
   - Headers must match exactly (case-sensitive)
   - No extra spaces or characters

4. **View Script Logs**:
   - In Apps Script editor → Click "Executions" (left sidebar)
   - Check for error messages

### CORS Errors in Browser?

- This is normal with `mode: 'no-cors'`
- Check your Google Sheet - data should still appear
- Check browser console for "Form submitted successfully" message

### Script Not Found Error?

1. **Redeploy the Script**:
   - Apps Script Editor → Deploy → New deployment
   - Use the new URL in your React app

2. **Check Sharing Settings**:
   - Ensure "Who has access" is set to "Anyone"

## 📊 Expected Data Format

Your sheet will receive:

| Column | Example Data |
|--------|-------------|
| Timestamp | 2024-09-02T12:34:56.789Z |
| First Name | John |
| Last Name | Doe |
| Email | john@example.com |
| Phone | +1-555-123-4567 |
| Company | Acme Corp |
| Event Types | Corporate Events, Weddings |
| Referral Source | Search Engine |

## 🎯 Next Steps

After successful setup:
- Set up email notifications for new registrations
- Create charts/analytics from collected data
- Export data for CRM integration
- Add data validation rules in Google Sheets
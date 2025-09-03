# 🚀 Quick Deployment Checklist

## Your Google Sheet
✅ **Sheet URL**: https://docs.google.com/spreadsheets/d/1yzDei15AAxL6CuR_0YXtjh3-2o9VY4Q0JYbXJniuzIs/edit?gid=0#gid=0

## Step-by-Step Deployment

### 1. Prepare Your Sheet
- [ ] Open your Google Sheet
- [ ] Add these column headers in row 1:
  ```
  Timestamp | First Name | Last Name | Email | Phone | Company | Event Types | Referral Source
  ```

### 2. Deploy Google Apps Script
- [ ] Go to https://script.google.com/
- [ ] Click "New project"
- [ ] Copy ALL code from `google-apps-script.js`
- [ ] Paste it (replace default code)
- [ ] Save with name: "JolHub Registration Handler"

### 3. Deploy as Web App
- [ ] Click "Deploy" button
- [ ] Choose "New deployment"
- [ ] Select "Web app" type
- [ ] Set "Execute as": **Me**
- [ ] Set "Who has access": **Anyone**
- [ ] Click "Deploy"
- [ ] **COPY THE DEPLOYMENT URL** (important!)

### 4. Update React App
- [ ] Open `src/App.tsx`
- [ ] Find line: `'YOUR_DEPLOYED_SCRIPT_URL_HERE'`
- [ ] Replace with your deployment URL
- [ ] Save the file

### 5. Test Integration
- [ ] Restart dev server: `npm run dev`
- [ ] Submit test registration
- [ ] Check Google Sheet for data

## 📞 Need Help?
If you encounter issues, check the detailed guide in `GOOGLE_SHEETS_SETUP.md`

## 🎯 Expected Result
After completing these steps:
1. Form submissions will appear in your Google Sheet
2. Success modal will show formatted confirmation
3. Data will be organized with timestamps
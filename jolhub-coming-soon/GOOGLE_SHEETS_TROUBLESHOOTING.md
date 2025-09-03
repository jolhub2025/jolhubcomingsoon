# 🔧 Google Sheets Integration Troubleshooting

## 🚨 Current Issue: Authentication Required

Your Google Apps Script is currently redirecting to a login page instead of executing. This means the deployment settings need to be corrected.

## ✅ Solution: Fix Deployment Settings

### Step 1: Access Your Google Apps Script
1. Go to https://script.google.com/
2. Find your project "JolHub Registration Handler"
3. Open the project

### Step 2: Redeploy with Correct Settings
1. Click the **"Deploy"** button (top right)
2. Click **"Manage deployments"**
3. Click the **pencil/edit icon** next to your existing deployment
4. **CRITICAL**: Ensure these exact settings:
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` ⚠️ **This must be "Anyone"**
5. Click **"Deploy"**
6. **Copy the new deployment URL**

### Step 3: Test the Fixed URL
The URL should look like:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Test it by visiting the URL - you should see:
```json
{"message":"JolHub Registration Handler is running"}
```

Instead of a Google login page.

## 🔍 Common Issues & Solutions

### Issue 1: "Execute as" is wrong
**Solution**: Must be set to "Me" (your email), not "User accessing the web app"

### Issue 2: "Who has access" is not "Anyone"
**Solution**: Change from "Only myself" to "Anyone"

### Issue 3: Old deployment cached
**Solution**: Create a new deployment instead of updating existing one

### Issue 4: Script permissions not granted
**Solution**: Run the script once manually in the editor to grant permissions

## 🧪 Test Your Fix

### Method 1: Browser Test
Visit your deployment URL directly - should show JSON response, not login page.

### Method 2: Form Test
1. Start your dev server: `npm run dev`
2. Fill out the registration form
3. Submit and check browser console for success messages
4. Check your Google Sheet for new data

## 📋 Step-by-Step Deployment Fix

1. **Open Google Apps Script**: https://script.google.com/
2. **Find your project**: "JolHub Registration Handler"
3. **Click Deploy** → **Manage deployments**
4. **Edit existing deployment** (pencil icon)
5. **Set Execute as**: Me
6. **Set Who has access**: Anyone ⚠️ **CRITICAL**
7. **Deploy** and copy new URL
8. **Update your React app** with new URL
9. **Test the integration**

## 🎯 Expected Results After Fix

✅ **Direct URL access**: Shows JSON response, not login page
✅ **Form submission**: Console shows success messages
✅ **Google Sheet**: New rows appear with form data
✅ **No authentication**: Works without user login

## 📞 Still Having Issues?

If the problem persists:
1. Create a completely new Google Apps Script project
2. Use a fresh deployment (don't edit existing ones)
3. Verify Google Sheet permissions allow editing
4. Check browser console for detailed error messages

---

**Next Step**: Fix your deployment settings and test the integration!
/**
 * Google Apps Script for JolHub Registration Form
 * 
 * Instructions to set up:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Save the project with a name like "JolHub Registration Handler"
 * 5. Click "Deploy" > "New deployment"
 * 6. Choose "Web app" as the type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the web app URL and replace YOUR_SCRIPT_ID in App.tsx
 * 
 * Note: Make sure your Google Sheet has the following column headers in row 1:
 * Timestamp | First Name | Last Name | Email | Phone | Company | Event Types | Referral Source
 */

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('=== Incoming POST Request ===');
    console.log('Request object:', e);
    
    // Check if postData exists
    if (!e.postData || !e.postData.contents) {
      throw new Error('No POST data received');
    }
    
    console.log('POST data contents:', e.postData.contents);
    
    // Your Google Sheet ID from the URL
    const SHEET_ID = '1yzDei15AAxL6CuR_0YXtjh3-2o9VY4Q0JYbXJniuzIs';
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error('Missing required fields: firstName, lastName, or email');
    }
    
    // Open the Google Sheet
    console.log('Opening Google Sheet with ID:', SHEET_ID);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('Sheet name:', sheet.getName());
    
    // Check if headers exist, if not, add them
    const lastRow = sheet.getLastRow();
    console.log('Current last row:', lastRow);
    
    if (lastRow === 0) {
      console.log('Adding headers to empty sheet');
      sheet.appendRow([
        'Timestamp',
        'First Name', 
        'Last Name', 
        'Email', 
        'Phone', 
        'Company', 
        'Event Types', 
        'Referral Source'
      ]);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.eventTypes || '',
      data.referralSource || 'Not specified'
    ];
    
    console.log('Adding row data:', rowData);
    
    // Append the new data
    sheet.appendRow(rowData);
    
    const newLastRow = sheet.getLastRow();
    console.log('New last row after append:', newLastRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration saved successfully',
        rowAdded: newLastRow,
        data: rowData
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error saving registration:', error);
    console.error('Error stack:', error.stack);
    
    // Return detailed error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        stack: error.stack,
        requestData: e.postData ? e.postData.contents : 'No POST data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'JolHub Registration Handler is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
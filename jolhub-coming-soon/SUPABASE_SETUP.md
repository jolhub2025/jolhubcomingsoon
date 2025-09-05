# Supabase Setup Guide for JolHub Registration

This guide explains how to set up the Supabase database for the JolHub registration system.

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Project Created**: Create a new Supabase project
3. **Credentials**: Get your project URL and anon key

## Environment Configuration

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Database Schema Setup

1. **Open Supabase Dashboard**: Go to your project dashboard
2. **Navigate to SQL Editor**: Click on "SQL Editor" in the sidebar
3. **Run the Schema Script**: Copy and paste the content from `database/schema.sql`
4. **Execute**: Click "Run" to create the table and policies

### Table Structure

The `registrations` table includes:

- `id`: Auto-incrementing primary key
- `created_at`: Timestamp (auto-generated)
- `first_name`: User's first name (required)
- `last_name`: User's last name (required)
- `email`: User's email address (required, unique)
- `phone`: Phone number (optional)
- `company`: Company/organization (optional)
- `event_types`: Selected event types (required)
- `referral_source`: How they heard about JolHub (required)

## Security Configuration

### Row Level Security (RLS)

The setup automatically enables RLS with these policies:

1. **Public Insert Policy**: Allows anyone to submit registrations
2. **Public Read Policy**: Allows reading data (can be restricted later)

### Recommended Production Settings

For production, consider:

1. **Restrict Read Access**: Remove public read policy if not needed
2. **Rate Limiting**: Enable rate limiting on your Supabase project
3. **Email Validation**: Add email format validation at database level

## Testing the Setup

1. **Start Development Server**: `npm run dev`
2. **Fill Registration Form**: Test with a new email
3. **Check Supabase Dashboard**: Verify data appears in the table
4. **Test Duplicate Detection**: Try the same email again

## API Usage

The registration service handles:

- ✅ **Duplicate email detection**
- ✅ **Data validation**
- ✅ **Error handling**
- ✅ **Standardized responses**

### Example Usage

```typescript
import { RegistrationService } from './services/registrationService'

const result = await RegistrationService.createRegistration({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  company: 'Example Corp',
  event_types: 'Corporate Events, Conferences',
  referral_source: 'Google Search'
})

if (result.success) {
  console.log('Registration successful!')
} else {
  console.log('Error:', result.message)
}
```

## Monitoring and Analytics

### View Registration Data

```sql
-- Get all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Count by date
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM registrations 
GROUP BY DATE(created_at) 
ORDER BY date DESC;

-- Popular event types
SELECT event_types, COUNT(*) as count 
FROM registrations 
GROUP BY event_types 
ORDER BY count DESC;
```

## Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure `.env` file is in project root
2. **CORS Issues**: Supabase automatically handles CORS
3. **Database Permissions**: Verify RLS policies are correctly set
4. **Network Issues**: Check Supabase project status

### Error Codes

- `DUPLICATE_EMAIL`: Email already exists in database
- `DATABASE_ERROR`: General database connection/query error
- `UNEXPECTED_ERROR`: Unexpected application error

## Backup and Migration

### Export Data

```sql
-- Export to CSV
COPY registrations TO '/path/to/backup.csv' WITH CSV HEADER;
```

### Import from Google Sheets

If migrating from Google Sheets:

```sql
-- Example import (adjust column names as needed)
INSERT INTO registrations (first_name, last_name, email, phone, company, event_types, referral_source)
VALUES 
  ('John', 'Doe', 'john@example.com', '+1234567890', 'Example Corp', 'Corporate Events', 'Google Search'),
  -- Add more rows as needed
```
# JolHub Coming Soon Page

A modern, responsive landing page for JolHub with user registration and waitlist functionality, powered by **Supabase** database.

## ✨ Features

- 🎯 **Coming Soon Landing Page** with countdown timer
- 📝 **Registration Form** with comprehensive validation
- 🗄️ **Supabase Integration** for secure data storage
- 🔒 **Duplicate Email Detection** to prevent duplicate registrations
- 📱 **Responsive Design** optimized for all devices
- ⚡ **Real-time Validation** and user feedback
- 🎨 **Modern UI/UX** with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with responsive design
- **Validation**: Client-side and server-side validation

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jolhub-coming-soon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create `.env` file:
     ```env
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - Run the database schema from `database/schema.sql`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
jolhub-coming-soon/
├── src/
│   ├── components/           # React components
│   ├── lib/                  # Supabase client configuration
│   ├── services/             # API services (registration)
│   ├── App.tsx               # Main application component
│   └── App_new.css           # Styling
├── database/
│   └── schema.sql            # Database schema
├── .env                      # Environment variables
├── SUPABASE_SETUP.md         # Detailed setup guide
└── README.md                 # This file
```

## 📊 Database Schema

The `registrations` table stores user data:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | SERIAL | Auto | Primary key |
| created_at | TIMESTAMPTZ | Auto | Registration timestamp |
| first_name | TEXT | Yes | User's first name |
| last_name | TEXT | Yes | User's last name |
| email | TEXT | Yes | User's email (unique) |
| phone | TEXT | No | Phone number |
| company | TEXT | No | Company/organization |
| event_types | TEXT | Yes | Selected event types |
| referral_source | TEXT | Yes | How they heard about us |

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- **Duplicate email prevention** at database level
- **Input validation** on both client and server
- **Environment variable** protection for sensitive data

## 🧪 Testing

### Manual Testing
1. **New Registration**: Fill form with unique email
2. **Duplicate Detection**: Try same email again
3. **Validation**: Submit incomplete form
4. **Responsive Design**: Test on different devices

### Database Queries
```sql
-- View all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Count registrations by date
SELECT DATE(created_at) as date, COUNT(*) 
FROM registrations 
GROUP BY DATE(created_at);
```

## 📚 Documentation

- [Supabase Setup Guide](SUPABASE_SETUP.md) - Detailed database configuration
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Production deployment steps

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in project root
   - Restart development server after changes

2. **Database Connection Error**
   - Verify Supabase credentials in `.env`
   - Check Supabase project status

3. **Duplicate Email Not Detected**
   - Ensure database schema is properly set up
   - Check RLS policies are enabled

## 🚀 Deployment

For deployment instructions, see [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## 📝 License

This project is licensed under the MIT License.
```

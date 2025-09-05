import { useState, useEffect } from 'react'
import './App_new.css'
import { RegistrationService } from './services/registrationService'

function App() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    eventTypes: [] as string[],
    referralSource: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showDuplicateEmailModal, setShowDuplicateEmailModal] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

    // Stable launch date: 30 days from now
    const launchDate = new Date("2025-10-03T10:59:00Z").getTime()
  
    useEffect(() => {
      const timer = setInterval(() => {
        const now = Date.now()
        const distance = launchDate - now
  
        if (distance <= 0) {
          clearInterval(timer) /* stop interval*/
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          })
          return
        }
  
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Navigate to registration form with pre-filled email
      setRegistrationData(prev => ({ ...prev, email }))
      setShowRegistrationForm(true)
      setEmail('')
    }
  }

  const handleJoinWaitlist = () => {
    if (email) {
      // Navigate to registration form with pre-filled email
      setRegistrationData(prev => ({ ...prev, email }))
      setShowRegistrationForm(true)
      setEmail('')
    } else {
      // Focus on email input if no email provided
      const emailInput = document.querySelector('.email-input') as HTMLInputElement;
      emailInput?.focus();
    }
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Prepare data for Supabase
      const registrationPayload = {
        first_name: registrationData.firstName.trim(),
        last_name: registrationData.lastName.trim(),
        email: registrationData.email.trim(),
        phone: registrationData.phone?.trim() || '',
        company: registrationData.company?.trim() || '',
        event_types: registrationData.eventTypes.join(', '),
        referral_source: registrationData.referralSource || 'Not specified'
      }

      // Call Supabase registration service
      const result = await RegistrationService.createRegistration(registrationPayload)
      
      if (result.success) {
        
        // Prepare display data
        const displayData = {
          firstName: registrationPayload.first_name,
          lastName: registrationPayload.last_name,
          email: registrationPayload.email,
          phone: registrationPayload.phone,
          company: registrationPayload.company,
          eventTypes: registrationPayload.event_types,
          referralSource: registrationPayload.referral_source
        }
        
        // Show success modal
        setSubmittedData(displayData)
        setShowSuccessMessage(true)
        setIsSubscribed(true)
        setShowRegistrationForm(false)
        
        // Reset form
        setRegistrationData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          phone: '',
          eventTypes: [],
          referralSource: ''
        })
        
      } else {
        // Handle errors
        if (result.error === 'DUPLICATE_EMAIL') {
          setShowDuplicateEmailModal(true)
        } else {
          // Other database errors
          setSubmitError(`Registration failed: ${result.message || 'Unknown error occurred'}. Please try again.`)
        }
      }
      
    } catch (error) {
      
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      setSubmitError(`Submission failed: ${message}. Please try again.`)
      
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegistrationChange = (field: string, value: string | string[]) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }))
  }

  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    setRegistrationData(prev => ({
      ...prev,
      eventTypes: checked 
        ? [...prev.eventTypes, eventType]
        : prev.eventTypes.filter(type => type !== eventType)
    }))
  }

  const handleBackToHome = () => {
    setShowRegistrationForm(false)
    setRegistrationData(prev => ({ ...prev, email: '' }))
  }

  return (
    <div className="app">
      {showDuplicateEmailModal ? (
        /* Already Registered Modal */
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="already-registered-icon-large">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="already-registered-title">
              You are already <span className="caveat-word">Registered</span>
            </h2>
            <p className="already-registered-message">
              Please wait for magic to happen.
            </p>
            <p className="already-registered-subtitle">
              We'll notify you as soon as JolHub launches. Get ready for something amazing!
            </p>
            
            <button 
              className="already-registered-button"
              onClick={() => {
                setShowDuplicateEmailModal(false)
                setShowRegistrationForm(false)
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      ) : showSuccessMessage ? (
        /* Success Message Modal */
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon-large">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="success-title">
              Welcome to the <span className="caveat-word">celebration</span> revolution!
            </h2>
            <p className="success-message">
              Thank you for joining our waitlist. We'll notify you as soon as JolHub launches.
            </p>
            
            {submittedData && (
              <div className="submitted-data">
                <h3>Registration Details:</h3>
                <div className="data-grid">
                  <div className="data-item">
                    <span className="data-label">Name:</span>
                    <span className="data-value">{submittedData.firstName} {submittedData.lastName}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Email:</span>
                    <span className="data-value">{submittedData.email}</span>
                  </div>
                  {submittedData.phone && (
                    <div className="data-item">
                      <span className="data-label">Phone:</span>
                      <span className="data-value">{submittedData.phone}</span>
                    </div>
                  )}
                  {submittedData.company && (
                    <div className="data-item">
                      <span className="data-label">Company:</span>
                      <span className="data-value">{submittedData.company}</span>
                    </div>
                  )}
                  <div className="data-item">
                    <span className="data-label">Event Types:</span>
                    <span className="data-value">{submittedData.eventTypes}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Referral:</span>
                    <span className="data-value">{submittedData.referralSource}</span>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              className="success-button"
              onClick={() => {
                setShowSuccessMessage(false)
                setSubmittedData(null)
              }}
            >
              Continue
            </button>
          </div>
        </div>
      ) : showRegistrationForm ? (
        /* Registration Form */
        <div className="registration-container">
          <div className="registration-header">
            <button className="back-button" onClick={handleBackToHome}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <div className="logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="logo-text">JolHub</span>
            </div>
          </div>
          
          <div className="registration-content">
            <div className="registration-hero">
              <h1 className="registration-title">
                Join the <span className="caveat-word">celebration</span> revolution
              </h1>
              <p className="registration-subtitle">
                Get early access to JolHub and be among the first to transform your events
              </p>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="registration-form">
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      value={registrationData.firstName}
                      onChange={(e) => handleRegistrationChange('firstName', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      value={registrationData.lastName}
                      onChange={(e) => handleRegistrationChange('lastName', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={registrationData.email}
                    onChange={(e) => handleRegistrationChange('email', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={registrationData.phone}
                    onChange={(e) => handleRegistrationChange('phone', e.target.value)}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    value={registrationData.company}
                    onChange={(e) => handleRegistrationChange('company', e.target.value)}
                    className="form-input"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Event Preferences</h3>
                <div className="form-group">
                  <label>What types of events do you organize? (Select all that apply)</label>
                  <div className="checkbox-group">
                    {['Corporate Events', 'Weddings', 'Birthday Parties', 'Social Gatherings', 'Conferences', 'Other'].map(eventType => (
                      <label key={eventType} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={registrationData.eventTypes.includes(eventType)}
                          onChange={(e) => handleEventTypeChange(eventType, e.target.checked)}
                          className="checkbox-input"
                        />
                        <span className="checkbox-custom"></span>
                        {eventType}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="referralSource">How did you hear about us?</label>
                  <select
                    id="referralSource"
                    value={registrationData.referralSource}
                    onChange={(e) => handleRegistrationChange('referralSource', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                {submitError && (
                  <div className="error-message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                      <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {submitError}
                  </div>
                )}
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                          <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
                <p className="form-note">
                  By joining, you agree to receive updates about JolHub. No spam, unsubscribe anytime.
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Original Coming Soon Page */
        <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">JolHub</span>
          </div>
          <div className="nav-links">
            <button className="cta-button-small" onClick={handleJoinWaitlist}>Join Waitlist</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Social Proof */}
          <div className="social-proof">
            <div className="rating">
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="rating-text">celebrate together!</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="hero">
            {/* Background Countdown Timer */}
            <div className="countdown-background">
              <div className="launching-text">Launching in</div>
              <div className="countdown-timer-container">
                <div className="countdown-bg-item">
                  <span className="countdown-bg-number">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="countdown-bg-label">Days</span>
                </div>
                <div className="countdown-bg-item">
                  <span className="countdown-bg-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="countdown-bg-label">Hours</span>
                </div>
                <div className="countdown-bg-item">
                  <span className="countdown-bg-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="countdown-bg-label">Min</span>
                </div>
                <div className="countdown-bg-item">
                  <span className="countdown-bg-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="countdown-bg-label">Sec</span>
                </div>
              </div>
            </div>

            <h1 className="hero-title">
              Ready to <span className="caveat-word">transform</span> your <span className="caveat-word">celebrations</span>
              <br />
              with <span className="caveat-word">magical</span> experiences?
            </h1>
            
            <p className="hero-description">
              We engineer unforgettable celebration systems for modern hosts. If seamless, 
              memorable experiences are your goal, you're in the right place.
            </p>

            {/* CTA Buttons */}
            <div className="cta-buttons">
              {!isSubscribed ? (
                <>
                  <button className="cta-primary" onClick={handleJoinWaitlist}>Get Early Access</button>
                </>
              ) : (
                <div className="success-state">
                  <div className="success-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>You're on the list! We'll notify you when we launch.</span>
                </div>
              )}
            </div>

            {/* Email Signup */}
            {!isSubscribed && (
              <div className="email-signup">
                <form onSubmit={handleEmailSubmit} className="email-form">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                    required
                  />
                  <button type="submit" className="email-submit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
                <p className="privacy-note">
                  Join celebration enthusiasts. No spam, just updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
        </>
      )}
    </div>
  )
}

export default App

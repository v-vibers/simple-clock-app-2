import React from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'

function SignInScreen() {
  const { signIn } = useSubscribeDev()

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1>⏰ Clock App</h1>
        <p className="tagline">Stay on time with AI-powered features</p>
        <button onClick={signIn} className="sign-in-button">
          Sign In to Continue
        </button>
      </div>
    </div>
  )
}

function ClockApp() {
  const { signOut, user, usage, subscriptionStatus, subscribe } = useSubscribeDev()

  return (
    <div className="clock-container">
      <header className="header">
        <div className="user-info">
          {user?.avatarUrl && (
            <img src={user.avatarUrl} alt="User avatar" className="avatar" />
          )}
          <span className="user-email">{user?.email}</span>
        </div>
        <button onClick={signOut} className="sign-out-button">
          Sign Out
        </button>
      </header>

      <main className="main-content">
        <Clock />
      </main>

      <footer className="footer">
        <div className="subscription-info">
          <div className="info-card">
            <span className="label">Plan</span>
            <span className="value">{subscriptionStatus?.plan?.name ?? 'Free'}</span>
          </div>
          <div className="info-card">
            <span className="label">Credits</span>
            <span className="value">{usage?.remainingCredits ?? 0}</span>
          </div>
          <div className="info-card">
            <span className="label">Status</span>
            <span className="value status">{subscriptionStatus?.status ?? 'none'}</span>
          </div>
        </div>
        <button onClick={subscribe!} className="manage-button">
          Manage Subscription
        </button>
      </footer>
    </div>
  )
}

function Clock() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const seconds = time.getSeconds().toString().padStart(2, '0')
  const date = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="clock">
      <div className="time-display">
        <div className="time-segment">
          <span className="time-value">{hours}</span>
          <span className="time-label">Hours</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-segment">
          <span className="time-value">{minutes}</span>
          <span className="time-label">Minutes</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-segment">
          <span className="time-value">{seconds}</span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
      <div className="date-display">{date}</div>
    </div>
  )
}

function App() {
  const { isSignedIn } = useSubscribeDev()

  return isSignedIn ? <ClockApp /> : <SignInScreen />
}

export default App

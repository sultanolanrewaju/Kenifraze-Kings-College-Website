import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <div style={styles.divider} />
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.description}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div style={styles.buttonGroup}>
        <button onClick={() => navigate(-1)} style={styles.secondaryButton}>
          Go Back
        </button>
        <button onClick={() => navigate('/')} style={styles.primaryButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
    textAlign: 'center',
  },
  errorCode: {
    fontSize: ' clamp(6rem, 15vw, 10rem)',
    fontWeight: '900',
    margin: 0,
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1,
  },
  divider: {
    width: '60px',
    height: '4px',
    backgroundColor: '#3b82f6',
    borderRadius: '2px',
    margin: '24px 0',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '600',
    margin: '0 0 12px 0',
  },
  description: {
    color: '#94a3b8',
    fontSize: '1rem',
    maxWidth: '400px',
    margin: '0 0 32px 0',
    lineHeight: 1.5,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: '1px solid #334155',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default NotFound;
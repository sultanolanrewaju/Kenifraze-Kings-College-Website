import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Column: 404 Header & Main Message */}
        <div style={styles.leftColumn}>
          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.title}>WHOOPS!<br />PAGE NOT FOUND</h2>
          
          <p style={styles.subtext}>
            It seems you've wandered into <strong>uncharted digital territory.</strong>
          </p>
          <p style={styles.description}>
            Maybe the page was moved, deleted, or never existed in the first place.
          </p>
        </div>

        {/* Right Column: Programmer Notice & Actions */}
        <div style={styles.rightColumn}>
          <div style={styles.illustrationCard}>
            <div style={styles.gearIcon}>⚙️</div>
            <p style={styles.techText}>ERROR: ROUTE_NOT_FOUND</p>
          </div>

          <p style={styles.contactMessage}>
            Please contact programmer Sultan to see if he is solving it already.
          </p>

          <div style={styles.buttonGroup}>
            <button onClick={() => navigate('/')} style={styles.primaryButton}>
              Go back home
            </button>
            <button onClick={() => navigate(-1)} style={styles.secondaryButton}>
              Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
  },
  card: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorCode: {
    fontSize: '5rem',
    fontWeight: '900',
    margin: '0',
    background: 'linear-gradient(135deg, #ff6b6b, #4834d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1,
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#2d3436',
    margin: '16px 0',
    lineHeight: 1.2,
  },
  subtext: {
    color: '#636e72',
    fontSize: '1.05rem',
    margin: '0 0 8px 0',
  },
  description: {
    color: '#b2bec3',
    fontSize: '0.95rem',
    margin: 0,
    lineHeight: 1.5,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  illustrationCard: {
    width: '100%',
    padding: '30px 20px',
    backgroundColor: '#f8f9fa',
    border: '2px dashed #dfe6e9',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  gearIcon: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  techText: {
    fontFamily: 'monospace',
    color: '#d63031',
    fontWeight: 'bold',
    margin: 0,
  },
  contactMessage: {
    fontSize: '1.05rem',
    color: '#2d3436',
    fontWeight: '500',
    margin: '0 0 24px 0',
    lineHeight: 1.4,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#4834d4',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#636e72',
    border: '1px solid #dfe6e9',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};

export default NotFound;
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Clock, ChevronRight, CheckCircle, Car, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const MyGarage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // phone, otp

  const handleLogin = (e) => {
    e.preventDefault();
    if (step === 'phone') {
      setStep('otp');
    } else {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '450px', margin: '60px auto', textAlign: 'center' }} className="animate-fade-in">
        <div className="glass" style={{ padding: '48px', borderRadius: 'var(--radius-2xl)' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white' }}>
            <Car size={32} />
          </div>
          <h2 style={{ marginBottom: '12px' }}>Welcome to My Garage</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Login to access your favorites and track test drive bookings.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {step === 'phone' ? (
              <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="glass" 
                  style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-xl)', border: 'var(--border)', color: 'var(--text)', outline: 'none' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Enter 4-digit OTP</label>
                <input 
                  type="text" 
                  maxLength="4"
                  placeholder="0000" 
                  className="glass" 
                  style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-xl)', border: 'var(--primary)', color: 'var(--text)', outline: 'none', letterSpacing: '10px', textAlign: 'center', fontSize: '1.2rem' }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', marginTop: '12px', cursor: 'pointer' }}>Change Number</button>
              </div>
            )}
            
            <button className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              {step === 'phone' ? 'Get OTP' : 'Verify & Login'}
            </button>
          </form>
          
          <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="garage-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ margin: 0 }}>My Garage</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your interest and test drives.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setActiveTab('favorites')} className={clsx('tab-btn', activeTab === 'favorites' && 'active')}>Favorites</button>
          <button onClick={() => setActiveTab('bookings')} className={clsx('tab-btn', activeTab === 'bookings' && 'active')}>Test Drives</button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'favorites' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Example Favorite */}
            <div className="glass" style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
              <div style={{ height: '160px', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=600" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '0.7rem' }}>Saved 2 days ago</div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3>Tesla Model S Plaid</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>$89,900</div>
                  <Link to={`/${slug}/vehicle/1`} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>View</Link>
                </div>
              </div>
            </div>
            
            <div className="glass" style={{ borderRadius: 'var(--radius-2xl)', border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px', color: 'var(--text-muted)' }}>
              <Heart size={40} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p>Add more cars to compare</p>
              <Link to={`/${slug}`} style={{ color: 'var(--primary)', marginTop: '8px', fontWeight: 600, textDecoration: 'none' }}>Browse Inventory</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1616422285623-13ff0167c95c?auto=format&fit=crop&q=80&w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>BMW M4 Competition</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} /> Scheduled for Tomorrow, 11:00 AM
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge" style={{ background: 'rgba(255, 193, 7, 0.2)', color: '#D4A017', border: '1px solid rgba(255, 193, 7, 0.4)' }}>Confirmed</span>
                <div style={{ marginTop: '8px' }}>
                  <Link to={`/${slug}`} style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Modify</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tab-btn {
          padding: 10px 24px;
          border: none;
          background: none;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        .tab-btn:hover {
          color: var(--text);
        }
      `}</style>
    </div>
  );
};

// Helper function
const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default MyGarage;

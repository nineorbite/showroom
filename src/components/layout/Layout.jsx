import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTenant } from '../../context/TenantContext';
import { useTheme } from '../../context/ThemeContext';
import { User, Sun, Moon, MapPin, Phone } from 'lucide-react';

const Layout = ({ children }) => {
  const { slug } = useParams();
  const { tenant, loading, error, fetchTenantBySlug } = useTenant();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (slug) {
      fetchTenantBySlug(slug);
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', animation: 'pulse 1s infinite' }}>
          Initializing Drive...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg)' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>SYSTEM ERROR</h2>
        <p style={{ fontWeight: 700 }}>{error}</p>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Brutalist Top Marquee */}
      <div style={{ background: 'var(--primary)', color: '#fff', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '2px solid var(--text)' }}>
        <div className="marquee-content" style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em' }}>
          • ZERO WORRY MAX • LIFETIME WARRANTY • 30 DAYS RETURN • GUARANTEED BUYBACK • ZERO WORRY MAX • LIFETIME WARRANTY • 30 DAYS RETURN • GUARANTEED BUYBACK • ZERO WORRY MAX • LIFETIME WARRANTY • 30 DAYS RETURN • GUARANTEED BUYBACK •
        </div>
      </div>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        justifyContent: 'space-between',
        background: 'var(--bg)',
        borderBottom: '2px solid var(--text)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div className="brand-text" style={{ 
              fontSize: '2.2rem', 
              letterSpacing: '-1px', 
              color: 'var(--primary)',
              fontWeight: 900
            }}>
              CARS24
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid var(--text)', cursor: 'pointer' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>BANGALORE</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <nav style={{ display: 'flex', gap: '32px' }}>
            <Link to={`/${slug}`} className="nav-link active">BUY USED CAR</Link>
            <span className="nav-link">SELL CAR</span>
            <span className="nav-link">CAR FINANCE</span>
            <span className="nav-link">NEW CARS</span>
            <span className="nav-link">CAR SERVICES</span>
          </nav>

          <div style={{ height: '32px', width: '2px', background: 'var(--text)' }}></div>

          <button className="btn" style={{ padding: '8px 24px', background: 'var(--text)', color: 'var(--bg)', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', fontWeight: 800 }}>
            <Phone size={16} /> CALL US
          </button>
          
          <button className="btn" style={{ padding: '8px 24px', border: '2px solid var(--text)', background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            <User size={18} />
            <span>ACCOUNT</span>
          </button>

          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </header>

      <main className="container animate-fade-in" style={{ padding: '0', maxWidth: '100%' }}>
        {children}
      </main>

      <footer style={{ 
        marginTop: 'auto', 
        padding: '80px 40px', 
        borderTop: '5px solid var(--text)',
        background: 'var(--bg)',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 40, background: 'var(--primary)', color: 'white', padding: '16px 24px', fontWeight: 900, transform: 'translateY(-50%)' }}>
          START YOUR ENGINE
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '80px', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div className="brand-text" style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'var(--primary)', letterSpacing: '-1px' }}>CARS24</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.6', fontWeight: 700 }}>
              The future of automotive retail. Technical excellence in every detail.
            </p>
            <div style={{ marginTop: '32px', fontSize: '0.85rem', fontWeight: 900, border: '2px solid var(--text)', padding: '16px', display: 'inline-block' }}>
              {tenant?.address || '123 TECHNICAL DRIVE, BANGALORE'}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.2rem', textTransform: 'uppercase' }}>BUY A CAR</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link to={`/${slug}`} className="footer-link">Used Cars in Bangalore</Link></li>
              <li><Link to={`/${slug}`} className="footer-link">Used Cars in Delhi</Link></li>
              <li><Link to={`/${slug}`} className="footer-link">Used Cars in Mumbai</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.2rem', textTransform: 'uppercase' }}>SELL A CAR</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><span className="footer-link">Sell Car in Bangalore</span></li>
              <li><span className="footer-link">Sell Car in Delhi</span></li>
              <li><span className="footer-link">Car Valuation</span></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.2rem', textTransform: 'uppercase' }}>COMPANY</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><span className="footer-link">About Us</span></li>
              <li><span className="footer-link">Careers</span></li>
              <li><span className="footer-link">Contact</span></li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <div>© 2026 CARS24. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marquee 20s linear infinite;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 800;
          font-size: 0.85rem;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }
        .footer-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 700;
          transition: color 0.2s;
          cursor: pointer;
        }
        .footer-link:hover {
          color: var(--text);
        }
        /* Hide menu on smaller screens to keep design tight in MVP */
        @media (max-width: 1200px) {
          nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

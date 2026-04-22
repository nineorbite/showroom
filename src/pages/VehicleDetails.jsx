import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Star, Gauge, Settings, Fuel, 
  Shield, MessageCircle, Zap, MapPin, Phone, 
  CheckCircle2, User, Key, CalendarClock, Car as CarIcon, AlertCircle, FileText,
  ChevronRight, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VEHICLE_DATA = {
  '1': { id: '1', name: 'Tesla Model S Plaid', brand: 'Tesla', price: 89900, year: 2023, kms: 1200, fuel: 'Electric', body: 'Sedan', image: '/assets/cars/tesla.png', transmission: 'Automatic' },
  '2': { id: '2', name: 'BMW M4 Competition', brand: 'BMW', price: 78500, year: 2022, kms: 4500, fuel: 'Petrol', body: 'Coupe', image: '/assets/cars/bmw.png', transmission: 'Automatic' },
  '3': { id: '3', name: 'Audi Q8 E-tron', brand: 'Audi', price: 74200, year: 2024, kms: 0, fuel: 'Electric', body: 'SUV', image: '/assets/cars/audi.png', transmission: 'Automatic' },
  '4': { id: '4', name: 'Mercedes G-Wagon', brand: 'Mercedes', price: 139000, year: 2023, kms: 150, fuel: 'Diesel', body: 'SUV', image: '/assets/cars/mercedes.png', transmission: 'Automatic' },
  '5': { id: '5', name: 'Toyota Supra GR', brand: 'Toyota', price: 54000, year: 2021, kms: 12000, fuel: 'Petrol', body: 'Coupe', image: '/assets/cars/toyota.png', transmission: 'Manual' },
  '6': { id: '6', name: 'Ford Mustang Mach-E', brand: 'Ford', price: 42000, year: 2022, kms: 5600, fuel: 'Electric', body: 'SUV', image: '/assets/cars/tesla.png', transmission: 'Automatic' }
};

const calculateEMI = (principal, downPayment, months, interestRate = 9.5) => {
  const loanAmount = principal - downPayment;
  if (loanAmount <= 0) return 0;
  const ratePerMonth = interestRate / 12 / 100;
  const emi = (loanAmount * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
  return Math.round(emi);
};

const VehicleDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  
  // EMI State
  const vehicleBase = VEHICLE_DATA[id] || VEHICLE_DATA['1'];
  const basePrice = vehicleBase.price;
  const [downPayment, setDownPayment] = useState(Math.round(basePrice * 0.2));
  const [tenure, setTenure] = useState(48);
  const emiAmount = calculateEMI(basePrice, downPayment, tenure);

  const vehicle = {
    ...vehicleBase,
    hp: 1020,
    owners: '1st Owner',
    color: 'Premium Space Grey',
    location: 'Bangalore Showroom',
    regYear: `Jul ${vehicleBase.year}`,
    makeYear: `May ${vehicleBase.year}`,
    insurance: 'Zero Dep (Valid 1Yr)',
    spareKey: 'Available',
    capacity: vehicleBase.fuel === 'Electric' ? '100 kWh' : '2998 cc',
    regNum: 'KA51**9649',
    images: [
      vehicleBase.image,
      'https://images.unsplash.com/photo-1619767886558-efdf259cde1a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200'
    ]
  };

  const similarVehicles = Object.values(VEHICLE_DATA).filter(v => v.id !== id).slice(0, 3);

  const handleWhatsApp = () => {
    const text = `Hey! I'm interested in the ${vehicle.name} (${vehicle.year}) priced at $${vehicle.price.toLocaleString()} at ${slug?.toUpperCase()}. Check it out here: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="detail-container">
      {/* Navigation Header */}
      <div style={{ borderBottom: 'var(--border)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg)' }}>
        <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem' }}>
          <ChevronLeft size={20} /> BACK TO LIST
        </Link>
        <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5 }}>REF: SHOWROOM_{id}</div>
      </div>

      <div className="main-content-grid">
        {/* LEFT COLUMN: Gallery & Detailed Overview */}
        <section className="gallery-section" style={{ borderRight: 'var(--border)', background: 'var(--bg)' }}>
          {/* Gallery */}
          <div style={{ padding: '40px' }}>
            <div style={{ border: 'var(--border)', marginBottom: '24px', position: 'relative', overflow: 'hidden', background: 'var(--text)' }}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={vehicle.images[activeImage]} 
                  alt={vehicle.name} 
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=1200'; }}
                />
              </AnimatePresence>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
              {vehicle.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  style={{ 
                    background: 'var(--bg)', 
                    border: activeImage === idx ? '2px solid var(--primary)' : '2px solid transparent',
                    padding: 0,
                    aspectRatio: '3/2',
                    cursor: 'pointer',
                    transition: 'border 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImage === idx ? 1 : 0.6, transition: 'opacity 0.2s' }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }}></div>

          {/* Highlights */}
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>GREAT THINGS ABOUT THIS CAR</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div style={{ border: 'var(--border)', padding: '32px', background: 'var(--bg)' }}>
                <Zap size={32} color="var(--primary)" style={{ marginBottom: '24px' }} />
                <h4 style={{ marginBottom: '12px', fontSize: '1.2rem', textTransform: 'uppercase' }}>Exceptional Power</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Class-leading performance and dynamic driving experience engineered for the true enthusiast.</p>
              </div>
              <div style={{ border: 'var(--border)', padding: '32px', background: 'var(--bg)' }}>
                <CheckCircle2 size={32} color="var(--primary)" style={{ marginBottom: '24px' }} />
                <h4 style={{ marginBottom: '12px', fontSize: '1.2rem', textTransform: 'uppercase' }}>Showroom Condition</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Meticulously maintained by previous owner. Interior and exterior pass all 140 checkpoints.</p>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }}></div>

          {/* CAR OVERVIEW GRID */}
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>CAR OVERVIEW</h2>
            <div className="overview-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '1px', 
              background: 'var(--text)', 
              border: 'var(--border)' 
            }}>
              {[
                { label: 'Reg. Year', value: vehicle.regYear, icon: <CalendarClock size={20} /> },
                { label: 'Fuel Type', value: vehicle.fuel, icon: <Fuel size={20} /> },
                { label: 'KM Driven', value: `${vehicle.kms.toLocaleString()} km`, icon: <Gauge size={20} /> },
                { label: 'Transmission', value: vehicle.transmission, icon: <Settings size={20} /> },
                { label: 'Engine Capacity', value: vehicle.capacity, icon: <Zap size={20} /> },
                { label: 'Ownership', value: vehicle.owners, icon: <User size={20} /> },
                { label: 'Make Year', value: vehicle.makeYear, icon: <CarIcon size={20} /> },
                { label: 'Spare Key', value: vehicle.spareKey, icon: <Key size={20} /> },
                { label: 'Reg Number', value: vehicle.regNum, icon: <FileText size={20} /> },
                { label: 'Insurance', value: vehicle.insurance, icon: <Shield size={20} /> }
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '24px', background: 'var(--bg)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ opacity: 0.5, marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }}></div>

          {/* INSPECTION REPORT */}
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>CAR INSPECTION REPORT</h2>
              <button style={{ background: 'none', border: 'none', fontWeight: 900, color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}>READ FULL REPORT</button>
            </div>
            
            <div style={{ border: 'var(--border)', padding: '40px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <div style={{ textAlign: 'center', padding: '24px', border: '1px solid var(--border)' }}>
                  <CheckCircle2 color="var(--primary)" size={32} style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>No accident history</div>
                </div>
                <div style={{ textAlign: 'center', padding: '24px', border: '1px solid var(--border)' }}>
                  <Gauge color="var(--primary)" size={32} style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>No odometer tampering</div>
                </div>
                <div style={{ textAlign: 'center', padding: '24px', border: '1px solid var(--border)' }}>
                  <AlertCircle color="var(--primary)" size={32} style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>140-Quality checks</div>
                </div>
              </div>
              
              <div style={{ padding: '24px', background: 'var(--text)', color: 'var(--bg)', textAlign: 'center' }}>
                <Shield size={32} style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>CARS24 Certified Perfect</h3>
                <p style={{ opacity: 0.8, marginTop: '8px', fontSize: '0.9rem' }}>Engineered for peace of mind. Every part verified.</p>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }}></div>

          {/* SIMILAR CARS SECTION */}
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>EXPLORE SIMILAR CARS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {similarVehicles.map((simCar) => (
                <div 
                  key={simCar.id} 
                  onClick={() => navigate(`/${slug}/vehicle/${simCar.id}`)}
                  style={{ border: 'var(--border)', background: 'var(--bg)', cursor: 'pointer', transition: 'transform 0.2s' }}
                  className="hover-card"
                >
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', borderBottom: 'var(--border)' }}>
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--text)', color: 'var(--bg)', padding: '4px 8px', fontSize: '0.65rem', fontWeight: 900, zIndex: 10 }}>CARS24 OWNED</div>
                    <img src={simCar.image} alt={simCar.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=800'; }} />
                    <button style={{ position: 'absolute', top: 12, right: 12, background: 'var(--bg)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                      <Heart size={16} />
                    </button>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{simCar.year} {simCar.name}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                      <span style={{ border: '1px solid var(--border)', padding: '4px 8px' }}>{simCar.kms.toLocaleString()} KM</span>
                      <span style={{ border: '1px solid var(--border)', padding: '4px 8px' }}>{simCar.fuel}</span>
                      <span style={{ border: '1px solid var(--border)', padding: '4px 8px' }}>{simCar.transmission}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid var(--text)', paddingTop: '16px' }}>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>${simCar.price.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '4px' }}>EMI ${Math.round(simCar.price/48)}/mo</div>
                      </div>
                      <ChevronRight size={20} color="var(--primary)" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Action & Pricing Panel */}
        <aside style={{ background: 'var(--bg)' }}>
          <div style={{ position: 'sticky', top: '80px', padding: '40px' }}>
            
            <div style={{ marginBottom: '32px' }}>
              <div className="badge" style={{ background: 'var(--primary)', color: 'white', marginBottom: '16px', display: 'inline-block', border: 'none' }}>
                {vehicle.year} MODEL • CARS24 OWNED
              </div>
              <h1 style={{ fontSize: '3rem', lineHeight: '1', marginBottom: '16px' }}>{vehicle.name}</h1>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span style={{ border: '1px solid var(--text-muted)', padding: '4px 8px' }}>{vehicle.kms.toLocaleString()} KM</span>
                <span style={{ border: '1px solid var(--text-muted)', padding: '4px 8px' }}>{vehicle.owners}</span>
                <span style={{ border: '1px solid var(--text-muted)', padding: '4px 8px' }}>{vehicle.fuel}</span>
                <span style={{ border: '1px solid var(--text-muted)', padding: '4px 8px' }}>{vehicle.transmission}</span>
                <span style={{ border: '1px solid var(--text-muted)', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {vehicle.location}
                </span>
              </div>
            </div>

            {/* Interactive EMI Box */}
            <div style={{ border: '2px solid var(--text)', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, opacity: 0.5, marginBottom: '8px' }}>ESTIMATED EMI</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>${emiAmount.toLocaleString()}<span style={{ fontSize: '1rem' }}>/mo</span></div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>DOWN PAYMENT</span>
                  <span>${downPayment.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={basePrice * 0.8} 
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>TENURE (MONTHS)</span>
                  <span>{tenure} Months</span>
                </div>
                <input 
                  type="range" 
                  min={12} 
                  max={72} 
                  step={12}
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div style={{ height: '2px', background: 'var(--text)', marginBottom: '24px' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, opacity: 0.5, marginBottom: '4px' }}>VEHICLE PRICE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${basePrice.toLocaleString()}</div>
                </div>
                <button style={{ background: 'none', border: 'none', fontWeight: 900, textDecoration: 'underline', color: 'var(--primary)', cursor: 'pointer' }}>PRICE BREAKUP</button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button className="btn-primary" style={{ padding: '20px', width: '100%', fontSize: '1.1rem', background: 'var(--text)', color: 'var(--bg)' }}>
                BOOK FREE TEST DRIVE
              </button>
              <button 
                onClick={handleWhatsApp} 
                className="btn" 
                style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '16px', fontWeight: 900 }}
              >
                <MessageCircle size={20} /> SEND TO WHATSAPP
              </button>
            </div>

            {/* Warranty Callout */}
            <div style={{ padding: '24px', border: '1px solid var(--border)', marginTop: '32px', display: 'flex', gap: '16px', background: 'var(--bg)' }}>
              <CheckCircle2 color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>Zero Worry Max</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lifetime Warranty • 30 Days Return Policy Included.</div>
              </div>
            </div>
            
          </div>
        </aside>
      </div>

      <style>{`
        .main-content-grid {
          display: grid;
          grid-template-columns: 1fr 450px;
          min-height: calc(100vh - 144px);
        }
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        input[type=range] {
          -webkit-appearance: none;
          height: 4px;
          background: var(--border);
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--text);
          cursor: pointer;
        }
        @media (max-width: 1024px) {
          .main-content-grid {
            grid-template-columns: 1fr;
          }
          .gallery-section {
            border-right: none !important;
            border-bottom: var(--border);
          }
          aside > div {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VehicleDetails;

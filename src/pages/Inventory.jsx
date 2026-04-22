import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Gauge, Fuel, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const BRANDS = [
  { name: 'All', icon: null },
  { name: 'Tesla', logo: 'TSLA' },
  { name: 'BMW', logo: 'BMW' },
  { name: 'Mercedes', logo: 'MB' },
  { name: 'Audi', logo: 'AUDI' },
  { name: 'Toyota', logo: 'TYTA' },
  { name: 'Ford', logo: 'FORD' }
];

const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Coupe'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const OWNERS = ['1st Owner', '2nd Owner'];
const YEAR_OPTIONS = ['2023 & Above', '2022 & Above', '2021 & Above'];
const KMS_OPTIONS = ['Less than 10k', '10k - 30k', '30k - 50k'];

const Inventory = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedBodyType, setSelectedBodyType] = useState('All');
  const [priceRange, setPriceRange] = useState(200000);
  
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedKms, setSelectedKms] = useState('All');
  const [selectedOwner, setSelectedOwner] = useState('All');
  
  const [vehicles] = useState([
    { id: 1, name: 'Tesla Model S Plaid', brand: 'Tesla', price: 89900, year: 2023, kms: 1200, fuel: 'Electric', transmission: 'Automatic', owners: '1st Owner', body: 'Sedan', image: '/assets/cars/tesla.png' },
    { id: 2, name: 'BMW M4 Competition', brand: 'BMW', price: 78500, year: 2022, kms: 15000, fuel: 'Petrol', transmission: 'Automatic', owners: '1st Owner', body: 'Coupe', image: '/assets/cars/bmw.png' },
    { id: 3, name: 'Audi Q8 E-tron', brand: 'Audi', price: 74200, year: 2024, kms: 0, fuel: 'Electric', transmission: 'Automatic', owners: '1st Owner', body: 'SUV', image: '/assets/cars/audi.png' },
    { id: 4, name: 'Mercedes G-Wagon', brand: 'Mercedes', price: 139000, year: 2023, kms: 45000, fuel: 'Diesel', transmission: 'Automatic', owners: '1st Owner', body: 'SUV', image: '/assets/cars/mercedes.png' },
    { id: 5, name: 'Toyota Supra GR', brand: 'Toyota', price: 54000, year: 2021, kms: 12000, fuel: 'Petrol', transmission: 'Manual', owners: '2nd Owner', body: 'Coupe', image: '/assets/cars/toyota.png' },
    { id: 6, name: 'Ford Mustang Mach-E', brand: 'Ford', price: 42000, year: 2022, kms: 35000, fuel: 'Electric', transmission: 'Automatic', owners: '1st Owner', body: 'SUV', image: '/assets/cars/tesla.png' }
  ]);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || v.brand === selectedBrand;
    const matchesBody = selectedBodyType === 'All' || v.body === selectedBodyType;
    const matchesPrice = v.price <= priceRange;
    const matchesFuel = selectedFuel === 'All' || v.fuel === selectedFuel;
    const matchesTransmission = selectedTransmission === 'All' || v.transmission === selectedTransmission;
    const matchesOwner = selectedOwner === 'All' || v.owners === selectedOwner;
    
    let matchesYear = true;
    if (selectedYear !== 'All') {
      const yearStr = selectedYear.split(' ')[0]; // gets '2023'
      matchesYear = v.year >= parseInt(yearStr);
    }

    let matchesKms = true;
    if (selectedKms === 'Less than 10k') matchesKms = v.kms < 10000;
    else if (selectedKms === '10k - 30k') matchesKms = v.kms >= 10000 && v.kms <= 30000;
    else if (selectedKms === '30k - 50k') matchesKms = v.kms >= 30000 && v.kms <= 50000;

    return matchesSearch && matchesBrand && matchesBody && matchesPrice && matchesFuel && matchesTransmission && matchesOwner && matchesYear && matchesKms;
  });

  const resetFilters = () => {
    setSelectedBrand('All');
    setSelectedBodyType('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedYear('All');
    setSelectedKms('All');
    setSelectedOwner('All');
    setPriceRange(200000);
  };

  return (
    <div className="inventory-page" style={{ border: 'var(--border)', borderTop: 'none' }}>
      <section className="search-section" style={{ borderBottom: 'var(--border)', padding: '60px 40px' }}>
        <h1 style={{ fontSize: 'min(5rem, 10vw)', lineHeight: '0.9', marginBottom: '40px', letterSpacing: '-0.02em' }}>
          FIND THE <br /> PERFECT DRIVE
        </h1>
        <div style={{ display: 'flex', border: '2px solid var(--text)', maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '2px solid var(--text)' }}>
            <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="SEARCH BRAND, MODEL, SPEC..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '20px', border: 'none', background: 'var(--bg)', fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', outline: 'none' }}
          />
          <button className="btn-primary" style={{ border: 'none', padding: '0 40px', fontWeight: 900 }}>GO</button>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr' }}>
        <aside style={{ borderRight: 'var(--border)', padding: '40px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <SlidersHorizontal size={18} /> FILTERS
              </h3>
              <button 
                onClick={resetFilters} 
                className="clear-filters-btn"
                style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
              >
                CLEAR ALL
              </button>
            </div>
            
            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>BRAND</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {BRANDS.map(brand => (
                  <button 
                    key={brand.name}
                    onClick={() => setSelectedBrand(brand.name)}
                    className={clsx('brutalist-pill', selectedBrand === brand.name && 'active')}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>MAX BUDGET: <span style={{ color: 'var(--primary)' }}>${priceRange.toLocaleString()}</span></label>
              <input 
                type="range" 
                min="20000" 
                max="200000" 
                step="5000" 
                className="brutalist-range"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--text)' }}
              />
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>YEAR OF MAKE</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...YEAR_OPTIONS].map(opt => (
                  <button key={opt} onClick={() => setSelectedYear(opt)} className={clsx('brutalist-pill', selectedYear === opt && 'active')}>{opt}</button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>KILOMETERS DRIVEN</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...KMS_OPTIONS].map(opt => (
                  <button key={opt} onClick={() => setSelectedKms(opt)} className={clsx('brutalist-pill', selectedKms === opt && 'active')}>{opt}</button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>FUEL TYPE</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...FUEL_TYPES].map(type => (
                  <button key={type} onClick={() => setSelectedFuel(type)} className={clsx('brutalist-pill', selectedFuel === type && 'active')}>{type}</button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>TRANSMISSION</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...TRANSMISSIONS].map(type => (
                  <button key={type} onClick={() => setSelectedTransmission(type)} className={clsx('brutalist-pill', selectedTransmission === type && 'active')}>{type}</button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>BODY STYLE</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...BODY_TYPES].map(type => (
                  <button key={type} onClick={() => setSelectedBodyType(type)} className={clsx('brutalist-pill', selectedBodyType === type && 'active')}>{type}</button>
                ))}
              </div>
            </div>

            <div className="filter-group" style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '16px', display: 'block' }}>OWNERS</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...OWNERS].map(type => (
                  <button key={type} onClick={() => setSelectedOwner(type)} className={clsx('brutalist-pill', selectedOwner === type && 'active')}>{type}</button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', background: 'var(--text)', gap: '1px' }}>
          <AnimatePresence>
            {filteredVehicles.length > 0 ? filteredVehicles.map((vehicle, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={vehicle.id} 
                className="vehicle-cell"
                onClick={() => navigate(`/${slug}/vehicle/${vehicle.id}`)}
                style={{ background: 'var(--bg)', position: 'relative', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, fontSize: '0.85rem', fontWeight: 900, opacity: 0.3 }}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="aspect-square" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderBottom: 'var(--border)' }}>
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="hover-scale"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
                    <div className="badge" style={{ background: 'var(--bg)' }}>{vehicle.year}</div>
                  </div>
                </div>

                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>{vehicle.name}</h3>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      <Star size={20} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    <div style={{ padding: '4px 8px', border: '1px solid var(--text)' }}>{vehicle.kms.toLocaleString()} KM</div>
                    <div style={{ padding: '4px 8px', border: '1px solid var(--text)' }}>{vehicle.fuel}</div>
                    <div style={{ padding: '4px 8px', border: '1px solid var(--text)' }}>{vehicle.transmission}</div>
                    <div style={{ padding: '4px 8px', border: '1px solid var(--text)' }}>{vehicle.owners}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid var(--text)', paddingTop: '24px' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.5 }}>PRICE</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>${vehicle.price.toLocaleString()}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '4px' }}>EMI FROM <span style={{ color: 'var(--primary)' }}>${Math.round(vehicle.price / 48)}/MO</span></div>
                    </div>
                    <button className="btn-primary" style={{ padding: '12px 24px' }}>VIEW</button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div style={{ padding: '80px', background: 'var(--bg)', gridColumn: '1 / -1', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>NO VEHICLES FOUND</h2>
                <p style={{ color: 'var(--text-muted)' }}>TRY ADJUSTING YOUR FILTERS TO FIND WHAT YOU'RE LOOKING FOR.</p>
                <button onClick={resetFilters} className="btn-primary" style={{ marginTop: '24px' }}>RESET FILTERS</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .brutalist-pill {
          padding: 6px 12px;
          border: 1px solid var(--text);
          background: transparent;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .brutalist-pill:hover, .brutalist-pill.active {
          background: var(--text);
          color: var(--bg);
        }
        .vehicle-cell:hover .hover-scale {
          transform: scale(1.05);
        }
        .aspect-square {
          aspect-ratio: 1 / 1;
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: minmax(280px, 320px) 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Inventory;

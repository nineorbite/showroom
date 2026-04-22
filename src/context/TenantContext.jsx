import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTenantBySlug = async (slug) => {
    setLoading(true);
    try {
      // Logic to fetch tenant from API
      // Placeholder endpoint based on request: /api/v1/bot/internal/tenant/:slug
      // const response = await api.get(`/bot/internal/tenant/${slug}`);
      // setTenant(response.data);
      
      // MOCK DATA for demonstration
      setTimeout(() => {
        setTenant({
          id: 'tenant_123',
          name: slug.toUpperCase().replace('-', ' ') || 'Luxury Motors',
          logo: 'https://placehold.co/400x120/FF4D4D/white?text=' + slug.toUpperCase(),
          address: '123 Showroom Ave, Tech City',
          email: 'contact@showroom.com',
          phone: '+1 234 567 890',
          slug: slug
        });
        setLoading(false);
      }, 800);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, loading, error, fetchTenantBySlug }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

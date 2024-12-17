import React, { useEffect, useState } from 'react';
import { getMetrics } from '../../api/metricsApi';
import './Metrics.module.css'; 

const MetricsComponent: React.FC = () => {
  const [metrics, setMetrics] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await getMetrics();
        if (response.success && response.data) {
          setMetrics(JSON.stringify(response.data, null, 2)); // Pretty print JSON
        } else {
          setError(response.error || 'Failed to load metrics');
        }
      } catch (err) {
        setError('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="metrics-container">
      {loading ? (
        <div className="loading-overlay">Loading...</div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="metrics">
          <pre>{metrics}</pre>
        </div>
      )}
    </div>
  );
};

export default MetricsComponent;

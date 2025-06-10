import { useEffect } from 'react';
import {
  getCLS,
  getFID,
  getLCP,
  type Metric
} from 'web-vitals';

export const useFrontendMetrics = () => {
  useEffect(() => {
    const report = (metric: Metric) => {
      console.log("📊 Métrica recogida:", metric);

      fetch('http://localhost:5000/api/metrics-frontend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      })
        .then(res => {
          if (!res.ok) throw new Error("❌ Falló el envío");
          console.log("✅ Métrica enviada:", metric.name);
        })
        .catch((err) => console.error('❌ Error enviando métricas:', err));
    };

    getCLS(report);
    getFID(report);
    getLCP(report);

    window.addEventListener('error', (e) => {
      const errData = {
        name: "js-error",
        value: 1,
        message: e.message
      };
      console.error("⚠️ Error JS capturado:", e.message);

      fetch('http://localhost:5000/api/metrics-frontend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errData),
      });
    });
  }, []);
};

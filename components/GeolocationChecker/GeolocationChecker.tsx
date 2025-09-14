'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);
  const hasHydrated = useCurrencyStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);  
      setBaseCurrency(data.results[0].annotations.currency.iso_code);
      return data.results[0].annotations.currency.iso_code;
    };

    const error = () => {
     setBaseCurrency("USD")
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [baseCurrency, hasHydrated, setBaseCurrency]);
  return null;
}

// components/GeolocationChecker.tsx
// 'use client';

// import { useEffect } from 'react';
// import { getUserInfo } from '@/lib/service/opencagedataApi';
// import { useCurrencyStore } from '@/lib/stores/currencyStore';

// export default function GeolocationChecker() {
//   const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
//   const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);
//   const hasHydrated = useCurrencyStore((state) => state.hasHydrated);

//   useEffect(() => {
//     if (!hasHydrated || baseCurrency) return;

//     const options: PositionOptions = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };

//     const success = async (pos: GeolocationPosition) => {
//       try {
//         const data = await getUserInfo(pos.coords);
//         const isoCode = data.results?.[0]?.annotations?.currency?.iso_code;
//         setBaseCurrency(isoCode ?? 'USD'); // fallback на USD
//       } catch (err) {
//         console.error('Error fetching currency from OpenCage:', err);
//         setBaseCurrency('USD');
//       }
//     };

//     const error = (err: GeolocationPositionError) => {
//       console.warn('Geolocation error:', err);
//       setBaseCurrency('USD');
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error, options);
//     } else {
//       console.warn('Geolocation not supported');
//       setBaseCurrency('USD');
//     }
//   }, [baseCurrency, hasHydrated, setBaseCurrency]);

//   return null;
// }


// 'use client';

// import { useCurrencyStore } from '@/lib/stores/currencyStore';
// import { useEffect } from 'react';


// export default function GeolocationChecker() {
//   const { detectCurrency, baseCurrency, hasHydrated, setBaseCurrency } = useCurrencyStore();

//   useEffect(() => {
//     // чекаємо, поки стан гідратується і baseCurrency ще не встановлений
//     if (!hasHydrated || baseCurrency) return;

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };

//     const success = async ({ coords }: GeolocationPosition) => {
//       const { latitude, longitude } = coords;
//       await detectCurrency(latitude, longitude);
//     };

//     const error = () => {
//       setBaseCurrency('USD'); // користувач не дозволив геолокацію
//     };

//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }, [hasHydrated, baseCurrency, detectCurrency, setBaseCurrency]);

//   return null;
// }



// 'use client';

// import { useEffect } from 'react';

// import { getUserInfo } from '@/lib/service/opencagedataApi';

// export default function GeolocationChecker() {
//   useEffect(() => {
//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };

//     const success = async ({ coords }: GeolocationPosition) => {
//       const data = await getUserInfo(coords);
//       return data.results[0].annotations.currency.iso_code;
//     };

//     const error = () => {};

//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }, []);

//   return null;
// }

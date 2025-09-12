'use client';

import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { useEffect } from 'react';


export default function GeolocationChecker() {
  const { detectCurrency, baseCurrency, hasHydrated, setBaseCurrency } = useCurrencyStore();

  useEffect(() => {
    // чекаємо, поки стан гідратується і baseCurrency ще не встановлений
    if (!hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const { latitude, longitude } = coords;
      await detectCurrency(latitude, longitude);
    };

    const error = () => {
      setBaseCurrency('USD'); // користувач не дозволив геолокацію
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [hasHydrated, baseCurrency, detectCurrency, setBaseCurrency]);

  return null;
}



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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserCurrency } from '@/lib/opencagedataApi';

type CurrencyState = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  detectCurrency: (latitude: number, longitude: number) => Promise<void>;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: 'USD', // дефолтна валюта
      hasHydrated: false,
    
      setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      detectCurrency: async (latitude: number, longitude: number) => {
        try {
          const currency = await getUserCurrency({ latitude, longitude });
          set({ baseCurrency: currency });
        } catch (err) {
          console.error('Failed to detect currency:', err);
          set({ baseCurrency: 'USD' }); // fallback
        }
      },
    }),
    {
      name: 'currency-storage',// ключ у localStorage
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

  
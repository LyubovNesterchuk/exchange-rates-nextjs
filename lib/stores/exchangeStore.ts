import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { latestRates, exchangeCurrency } from '@/lib/service/exchangeAPI';

interface Rate {
  key: string;
  value: string;
}

interface ExchangeState {
  baseCurrency: string;
  exchangeInfo: any;
  rates: Rate[];
  isLoading: boolean;
  isError: string | null;
  filter: string;
  setBaseCurrency: (currency: string) => void;
  setFilter: (filter: string) => void;
  fetchRates: () => Promise<void>;
  convertCurrency: (from: string, to: string, amount: number) => Promise<void>;
}

export const useExchangeStore = create(
  persist<ExchangeState>(
    (set, get) => ({
      baseCurrency: 'USD',
      exchangeInfo: null,
      rates: [],
      isLoading: false,
      isError: null,
      filter: '',
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setFilter: (filter) => set({ filter }),
      fetchRates: async () => {
        const { baseCurrency } = get();
        set({ isLoading: true, isError: null });
        try {
          const data = await latestRates(baseCurrency);
          const rates = data
            .filter(([key]) => key !== baseCurrency)
            .map(([key, value]) => ({ key, value: (1 / (value as number)).toFixed(2) }));
          set({ rates, isLoading: false });
        } catch (err: any) {
          set({ isError: err.message || 'Something went wrong', isLoading: false });
        }
      },
      convertCurrency: async (from, to, amount) => {
        set({ isLoading: true, isError: null, exchangeInfo: null });
        try {
          const result = await exchangeCurrency({ from, to, amount });
          set({ exchangeInfo: result, isLoading: false });
        } catch (err: any) {
          set({ isError: err.message || 'Something went wrong', isLoading: false });
        }
      },
    }),
    { name: 'currency-storage' }
  )
);


// import { create } from 'zustand';
// import { exchangeCurrency, latestRates } from '@/lib/service/exchangeAPI';

// interface ExchangeInfo {
//   from: string;
//   to: string;
//   amount: number;
//   rate: number;
//   result: number;
// }

// interface Rate {
//   key: string;
//   value: string; // курс відносно baseCurrency, округлений
// }

// interface ExchangeState {
//   baseCurrency: string;
//   exchangeInfo: ExchangeInfo | null;
//   rates: Rate[];
//   isLoading: boolean;
//   isError: string | null;
//   setBaseCurrency: (currency: string) => void;
//   convertCurrency: (from: string, to: string, amount: number) => Promise<void>;
//   fetchRates: () => Promise<void>;
// }

// export const useExchangeStore = create<ExchangeState>((set, get) => ({
//   baseCurrency: 'USD',
//   exchangeInfo: null,
//   rates: [],
//   isLoading: false,
//   isError: null,

//   setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),

//   convertCurrency: async (from, to, amount) => {
//     set({ isLoading: true, isError: null, exchangeInfo: null });
//     try {
//       const result = await exchangeCurrency({ from, to, amount });
//       set({ exchangeInfo: result, isLoading: false });
//  } catch (err: unknown) {
//       const message = err instanceof Error ? err.message : 'Something went wrong';
//       set({ isError: message, isLoading: false, exchangeInfo: null });
//     }
//   },

//   fetchRates: async () => {
//     const { baseCurrency } = get();
//     set({ isLoading: true, isError: null, rates: [] });

//     try {
//       const data = await latestRates(baseCurrency);

//       // фільтруємо базову валюту та перетворюємо у зручний масив об'єктів
//       const filteredRates = data
//         .filter(([key]) => key !== baseCurrency)
//         .map(([key, value]) => ({ key, value: (1 / (value as number)).toFixed(2) }));

//       set({ rates: filteredRates, isLoading: false });
//     } catch (err: unknown) {
//       const message = err instanceof Error ? err.message : 'Something went wrong';
//       set({ isError: message, isLoading: false, exchangeInfo: null });
//     }
//   },
// }));



// import { create } from 'zustand';
// import { exchangeCurrency } from '@/lib/service/exchangeAPI';

// interface ExchangeInfo {
//   from: string;
//   to: string;
//   amount: number;
//   rate: number;
//   result: number;
// }

// interface ExchangeState {
//   baseCurrency: string;
//   exchangeInfo: ExchangeInfo | null;
//   isLoading: boolean;
//   isError: string | null;
//   setBaseCurrency: (currency: string) => void;
//   convertCurrency: (from: string, to: string, amount: number) => Promise<void>;
// }

// export const useExchangeStore = create<ExchangeState>((set) => ({
//   baseCurrency: 'USD',
//   exchangeInfo: null,
//   isLoading: false,
//   isError: null,
//   setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
//   convertCurrency: async (from, to, amount) => {
//     set({ isLoading: true, isError: null, exchangeInfo: null });
//     try {
//       const result = await exchangeCurrency({ from, to, amount });
//       set({ exchangeInfo: result, isLoading: false });
//     } catch (err: unknown) {
//       const message = err instanceof Error ? err.message : 'Something went wrong';
//       set({ isError: message, isLoading: false, exchangeInfo: null });
//     }
//   },
// }));
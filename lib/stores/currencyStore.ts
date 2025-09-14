import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExchengeInfo {
    from: string,
    to: string,
    amount: string,
    rate: number,
    result:number,
}

interface CurrencyStore {
    baseCurrency: string,
    exchengeInfo: ExchengeInfo | null,
    rates: [string, number][],
    filter: string,
    isLoading: boolean,
    isError: string | null,
    hasHydrated: boolean,
    setBaseCurrency: (currency:string) => void;
    setExchengeInfo: (exchengeInfo:ExchengeInfo|null) => void;
    setRates: (rates:[string, number][]) => void;
    setFilter: (filter:string) => void;
    setIsLoading: (loading:boolean) => void;
    setIsError: (error: string | null) => void;
    setHasHydrated: (hasHydrated:boolean) => void;
}


export const useCurrencyStore = create<CurrencyStore>()(
    persist(
    (set) => ({
    baseCurrency: "",
    exchengeInfo: null,
    rates:[],
    filter: "",
    isLoading: false,
    isError: null,
    hasHydrated: false,
    
    setBaseCurrency: (currency) => set({baseCurrency:currency}),
    setExchengeInfo: (exchengeInfo) => set({exchengeInfo}),
    setRates: (rates) => set({rates}),
    setFilter: (filter) => set({filter}),
    setIsLoading: (loading) => set({isLoading:loading}),
    setIsError: (error) => set({isError:error}),
    setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }), {
        name: "Currency Store",
        partialize: (state) => ({ baseCurrency: state.baseCurrency }),
        onRehydrateStorage: () => (state) => { state?.setHasHydrated(true) }
    }
  )
)


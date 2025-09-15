import { ChangeEvent } from 'react';

import styles from './Filter.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function Filter() {

  const filter = useCurrencyStore((state) => state.filter);
  const setFilter = useCurrencyStore((state) => state.setFilter);
  
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <input
      onChange={handleChange}
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
    />
  );
}



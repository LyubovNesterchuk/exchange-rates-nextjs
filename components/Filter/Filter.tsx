'use client';

import { useExchangeStore } from '@/lib/stores/exchangeStore';
import styles from './Filter.module.css';

export default function Filter() {
  const { filter, setFilter } = useExchangeStore();

  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={(e) => setFilter(e.target.value.toLowerCase())}
    />
  );
}

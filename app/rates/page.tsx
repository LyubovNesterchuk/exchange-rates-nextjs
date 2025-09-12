'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import Loader from '@/components/Loader/Loader';
import RatesList from '@/components/RatesList/RatesList';
import { useExchangeStore } from '@/lib/stores/exchangeStore';
import css from './RatesPage.module.css';


export default function RatesPage() {
  const { fetchRates, rates, isLoading, isError, baseCurrency } = useExchangeStore();

  useEffect(() => {
    fetchRates();
  }, [baseCurrency, fetchRates]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {isLoading && <Loader />}

          
          {rates.length > 0 && <RatesList rates={rates} />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
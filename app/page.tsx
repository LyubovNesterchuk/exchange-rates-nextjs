'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import Loader from '@/components/Loader/Loader';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';

export default function Home() {
  const isError = useCurrencyStore((state) => state.isError);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const exchengeInfo = useCurrencyStore((state) => state.exchengeInfo);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <ExchangeForm />
          {!isError && !exchengeInfo && <Heading info title="What currencies do you want to exchange?🙂" />}
          {exchengeInfo && <ExchangeInfo {...exchengeInfo} />}
          {isLoading && <Loader/>}
          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}




// 'use client';

// import Section from '@/components/Section/Section';
// import Container from '@/components/Container/Container';
// import Heading from '@/components/Heading/Heading';

// import css from './page.module.css';

// export default function Home() {
//   const isError = false;

//   return (
//     <main className={css.main}>
//       <Section>
//         <Container>
//           <Heading info title="What currencies do you want to exchange?🙂" />

//           {isError && (
//             <Heading
//               error
//               title="Something went wrong...😐 Check the data validity and try again!"
//             />
//           )}
//         </Container>
//       </Section>
//     </main>
//   );
// }

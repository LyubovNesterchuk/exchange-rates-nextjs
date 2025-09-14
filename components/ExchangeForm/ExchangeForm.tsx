'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';

export default function ExchangeForm() {
  const setExchengeInfo = useCurrencyStore((state) => state.setExchengeInfo);

  const handleSubmit = async (formData:FormData) => {
    const value = formData.get('currency') as string;
    const [amount, from, , to] = value.split(' ');
    const data = await exchangeCurrency({ from, amount, to });
    setExchengeInfo(data);
  } 
  return (
    <form className={styles.form} action={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}






// 'use client';

// import { useState } from 'react';
// import { RiExchangeDollarFill } from 'react-icons/ri';
// import { useExchangeStore } from '@/store/exchangeStore';
// import Loader from '../Loader/Loader';
// import ExchangeInfo from '../ExchangeInfo/ExchangeInfo';
// import Heading from '../Heading/Heading';

// import styles from './ExchangeForm.module.css';

// export default function ExchangeForm() {
//   const [input, setInput] = useState('');
//   const { convertCurrency, exchangeInfo, isLoading, isError } = useExchangeStore();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const regex = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;
//     if (!regex.test(input)) {
//       alert('Invalid format. Use: 15 USD in UAH');
//       return;
//     }

//     const [amountStr, from, , to] = input.split(' ');
//     const amount = parseFloat(amountStr);

//     await convertCurrency(from.toUpperCase(), to.toUpperCase(), amount);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <button className={styles.button} type="submit">
//           <RiExchangeDollarFill className={styles.icon} />
//         </button>

//         <input
//           type="text"
//           pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
//           placeholder="15 USD in UAH"
//           title="Request format 15 USD in UAH"
//           className={styles.input}
//           name="currency"
//           required
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//       </form>

//       {isLoading && <Loader />}

//       {exchangeInfo && (
//         <ExchangeInfo
//           amount={exchangeInfo.amount}
//           from={exchangeInfo.from}
//           to={exchangeInfo.to}
//           rate={exchangeInfo.rate}
//           result={exchangeInfo.result}
//         />
//       )}

//       {isError && (
//         <Heading
//           error
//           title="Something went wrong...😐 Check the data validity and try again!"
//         />
//       )}
//     </div>
//   );
// }



// 'use client';

// import { RiExchangeDollarFill } from 'react-icons/ri';

// import styles from './ExchangeForm.module.css';

// export default function ExchangeForm() {
//   return (
//     <form className={styles.form}>
//       <button className={styles.button} type="submit">
//         <RiExchangeDollarFill className={styles.icon} />
//       </button>

//       <input
//         type="text"
//         pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
//         placeholder="15 USD in UAH"
//         title="Request format 15 USD in UAH"
//         className={styles.input}
//         name="currency"
//         required
//       />
//     </form>
//   );
// }

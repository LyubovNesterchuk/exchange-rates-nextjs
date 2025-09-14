import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

import styles from './RatesList.module.css';
interface Rate{
  key: string;
  value: number;
}

interface RatesListProps{
  rates: Rate[];
}

export default function RatesList({ rates }:RatesListProps) {
  return (
    <Grid>
      {rates.map(({ key, value }) => (
        <GridItem key={key}>
          <p className={styles.text}>
            1 {key} = {value}
          </p>
        </GridItem>
      ))}
    </Grid>
  );
}

// import styles from './RatesList.module.css';

// interface Rate {
//   key: string;
//   value: string;
// }

// interface RatesListProps {
//   rates: Rate[];
// }

// export default function RatesList({ rates }: RatesListProps) {
//   return (
//     <ul className={styles.list}>
//       {rates.map(({ key, value }) => (
//         <li className={styles.item} key={key}>
//           <p className={styles.text}>
//             1 {key} = {value}
//           </p>
//         </li>
//       ))}
//     </ul>
//   );
// }

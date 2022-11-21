import { GetStaticProps } from 'next';
import styles from './index.module.css';

export interface CVProps {
  name: string;
}

export function CV(props: CVProps) {
  return (
    <div className={styles['container']}>
      <h1>Hi, I'm {props.name}</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<CVProps> = async (context) => {
  return {
    props: {
      name: 'Andy'
    }
  }
}

export default CV;

import styles from './main-page.module.css';
import { Link } from 'react-router-dom';

import { FC } from 'react';

export const MainPage: FC = () => (
  <>
    <main className={styles.containerMain}>
      <div className={styles.starfield}>
        <h1 className={styles.containerTitle}>
          Бургер-конструктор: ты решаешь, что внутри
        </h1>
        <div className={styles.container}>
          <>
            <Link to='/constructor' className={`pl-2 ${styles.link}`}>
              <p className={styles.button}>Собрать свой бургер</p>
            </Link>
          </>
          <img
            src={require('../../images/burger.png')}
            alt='burger'
            className={styles.containerImg}
          />
        </div>
      </div>
    </main>
  </>
);

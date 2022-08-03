import { FC } from 'react';
import '../styles/StartPage.scss';

export const StartPage: FC = () => {
  return (
    <div className='page'>
      <h2 className='page__title'>Please choose the page in NavBar</h2>

      <p className='page__inform'>This app was created for learning React events</p>
    </div>
  );
};

import { FC, useState } from 'react';
import "../styles/SortCardsPage.scss";

export const SortCardsPage: FC = () => {
  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'Card 3'},
    {id: 2, order: 1, text: 'Card 1'},
    {id: 3, order: 2, text: 'Card 2'},
    {id: 4, order: 4, text: 'Card 4'},
  ]);

  return (
    <div className='sort-card-page'>
      {cardList.map(card => 
        <div 
          className="card"
          draggable={true}
        >
          {card.text}
        </div>
      )}
    </div>
  )
}

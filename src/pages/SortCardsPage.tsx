import React, { FC, useState } from 'react';
import "../styles/SortCardsPage.scss";

interface Card {
  id: number;
  order: number;
  text: string;
  color: string
}

export const SortCardsPage: FC = () => {
  const [cardList, setCardList] = useState<Card[]>([
    {id: 1, order: 3, text: 'Card 3', color: 'green'},
    {id: 2, order: 1, text: 'Card 1', color: 'yellow'},
    {id: 3, order: 2, text: 'Card 2', color: 'yellowgreen'},
    {id: 4, order: 4, text: 'Card 4', color: 'darkgreen'},
  ]);
  const [currentCard, setCurrentCard] = useState<Card>({id: 500, order: 500, text: '', color: ''});

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    setCurrentCard(card);
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    target.style.background = 'lightcyan';
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const target = event.target as HTMLDivElement;
    target.style.background = 'lightblue';
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    event.preventDefault();
    
    setCardList(cardList.map((c: Card) => {
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      }

      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }

      return c;
    }));

    const target = event.target as HTMLDivElement;
    target.style.background = 'lightcyan';
  };

  return (
    <div className='sort-card-page'>
      <p className='sort-card-page__title'>You can drag the cards and they will swap places</p>

      <div className='container'>
        {cardList.sort((card1, card2) => card1.order - card2.order).map(card =>
          <div
            key={card.id}
            className={"card " + card.color}
            draggable={true}
            onDragStart={(event => dragStartHandler(event, card))}  //если взяли карточку
            onDragLeave={(event => dragEndHandler(event))}  //если вышли за пределы другой карточки
            onDragEnd={(event => dragEndHandler(event))}  //если отпустили перемещение
            onDragOver={(event => dragOverHandler(event))}  //если находимся над каким-то другим обьектом
            onDrop={(event => dropHandler(event, card))}  //если отпустили карточку, и расчитываем что должно произойти связанное с этим действие
          >
            {card.text}
          </div>
        )}
      </div>
    </div>
  )
};



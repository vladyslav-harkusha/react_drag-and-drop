import React, { FC, useState } from 'react';
import '../styles/TaskBoardPage.scss';

interface Item {
  id: number;
  title: string;
}

interface Board {
  id: number;
  title: string;
  items: Item[];
}

export const TaskBoardPage: FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, title: 'To do', items: [{ id: 1, title: 'Go shopping' }, { id: 2, title: 'Take out the trash' }, { id: 3, title: 'Get breakfast' }]},
    { id: 2, title: 'To check', items: [{ id: 4, title: 'Code review' }, { id: 5, title: 'Task factorial' }, { id: 6, title: 'Task fibonacci' }]},
    { id: 3, title: 'Done', items: [{ id: 7, title: 'Make video' }, { id: 8, title: 'Mount video' }, { id: 9, title: 'Render video' }]},
  ]);
  const [currentBoard, setCurrentBoard] = useState<Board>(boards[0]);
  const [currentItem, setCurrentItem] = useState<Item>(boards[0].items[0]);

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLDivElement;

    if (eventTarget.className === 'board__item') {
      eventTarget.style.boxShadow = '0 4px 3px gray'
    }
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const eventTarget = event.target as HTMLDivElement;
    eventTarget.style.boxShadow = 'none'
  };

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    setCurrentBoard(board);
    setCurrentItem(item)
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const eventTarget = event.target as HTMLDivElement;
    eventTarget.style.boxShadow = 'none';
  };


  const dropHandler = (event: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    event.preventDefault();

    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    const eventTarget = event.target as HTMLDivElement;
    eventTarget.style.boxShadow = 'none';

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }

      if (b.id === currentBoard.id) {
        return currentBoard;
      }

      return b;
    }));
  };

  const dropCardHandler = (event: React.DragEvent<HTMLDivElement>, board: Board,) => {
    const currentIndex = currentBoard.items.indexOf(currentItem);

    if (!board.items[0]) {
      currentBoard.items.splice(currentIndex, 1);
      board.items.push(currentItem);
    }

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }

      if (b.id === currentBoard.id) {
        return currentBoard;
      }

      return b;
    }));
  };

  return (
    <div className='task-board-page'>
      {boards.map(board => 
        <div 
          key={board.id} 
          className="board"
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={(event) => dropCardHandler(event, board)}

        >
            <div className="board__title" draggable={true}>{board.title}</div>
            {board.items.map(item =>
              <div 
                key={item.id} 
                className="board__item"
                draggable={true}
                onDragOver={(event) => dragOverHandler(event)}
                onDragLeave={(event) => dragLeaveHandler(event)}
                onDragStart={(event) => dragStartHandler(event, board, item)}
                onDragEnd={(event) => dragEndHandler(event)}
                onDrop={(event) => dropHandler(event, board, item)}
              >
                {item.title}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

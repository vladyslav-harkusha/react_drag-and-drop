import React, { FC, useState } from 'react';
import { Modal } from '../components/Modal';
import '../styles/TaskBoardPage.scss';
import { Board, Item } from '../models';

export const TaskBoardPage: FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, title: 'To do', items: [{ id: 1, title: 'Go shopping' }, { id: 2, title: 'Create todo app' }, { id: 3, title: 'Get lunch' }, { id: 10, title: 'Take a shower' }]},
    { id: 2, title: 'To check', items: [{ id: 4, title: 'Code review' }, { id: 5, title: 'New app' }, { id: 6, title: 'Task fibonacci' }]},
    { id: 3, title: 'Done', items: [{ id: 7, title: 'Sports training' }, { id: 8, title: 'Buy a laptop' }, { id: 9, title: 'Go swim' }]},
  ]);
  const [currentBoard, setCurrentBoard] = useState<Board>(boards[0]);
  const [currentItem, setCurrentItem] = useState<Item>(boards[0].items[0]);
  const [isModal, setIsModal] = useState<boolean>(false);

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

  const clearDoneTodos = () => {
    setBoards(boards.map(b => {
      if (b.title === 'Done') {
        b.items.splice(0, b.items.length);

        return b;
      }

      return b;
    }))
  }

  const isModalHandler = () => {
    setIsModal(!isModal);
  };

  const addNewTodo = (titleTodo: string) => {
    if (titleTodo.trim()) {
      boards[0].items.push({
        id: Date.now(),
        title: titleTodo,
      })
    } else {
      window.alert('Enter valid title');
    }

    setBoards(boards);
  }

  return (
    <div className='task-board-page'>
      <div className='task-board-page__buttons'>
        <button 
          className='task-board-page__button'
          onClick={isModalHandler}
        >
          Add new todo
        </button>

        <button
          className='task-board-page__button'
          onClick={() => clearDoneTodos()}
        >
          Clear all done todos
        </button>
      </div>

      <p className='task-board-page__about'>You can drag and drop todos from one board to another</p>

      <div className='task-board-page__container'>
        {boards.map(board =>
          <div
            key={board.id}
            className="board"
            onDragOver={(event) => dragOverHandler(event)}
            onDrop={(event) => dropCardHandler(event, board)}
          >
              <div className="board__title">{board.title}</div>
              
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

      {isModal &&
        <Modal 
          title='Add a new todo' 
          isModalHandler={isModalHandler} 
          addNewTodo={addNewTodo}
        />
      }
    </div>
  );
};

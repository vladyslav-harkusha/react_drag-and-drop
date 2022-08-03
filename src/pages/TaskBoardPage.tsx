import { FC } from 'react';
import '../styles/TaskBoardPage.scss';

export const TaskBoardPage: FC = () => {
  return (
    <div className='task-board-page'>
      <div className="board">
        <div className="board__title">To do</div>
        <div className="board__item">Go shoping</div>
      </div>

      <div className="board">
        <div className="board__title">Check</div>
        <div className="board__item">Tasks</div>
      </div>

      <div className="board">
        <div className="board__title">Done</div>
        <div className="board__item">Clean teeth</div>
        <div className="board__item">Get breakfast</div>
        <div className="board__item">Get dressed</div>
      </div>
    </div>
  );
};

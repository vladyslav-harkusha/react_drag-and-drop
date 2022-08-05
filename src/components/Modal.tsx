import React, { FC, useState } from 'react';
import '../styles/Modal.scss';
import { Board } from '../models';

interface ModalProps {
  title: string;
  isModalHandler: () => void;
  boards: Board[];
  addNewTodo: (titleTodo: string) => void;
}

export const Modal: FC<ModalProps> = ({ isModalHandler, title, boards, addNewTodo }) => {
  const [titleTodo, setTitleTodo] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(event.target.value);
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewTodo(titleTodo);

    isModalHandler();
  };

  return (
    <>
      <div
        className='modal'
        onClick={isModalHandler}
      />

      <div className='modal__window'>
        <h2 className='modal__window-title'>{title}</h2>

        <form className='form' onSubmit={submitHandler}>
          <input
            type="text"
            className='form__input'
            placeholder='Enter todo title'
            value={titleTodo}
            onChange={changeHandler}
          />

          <button 
            type='submit'
            className='form__button'
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

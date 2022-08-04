import React, { FC, useState } from 'react';
import '../styles/DropFilesPage.scss';

export const DropFilesPage: FC = () => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
  }

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    let files = Array.from(event.dataTransfer.files);
    console.log(files);

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', '1');

    //загрузкана файлов на сервер
    // axios.post('url', formData);
    
    setDrag(false);
  }

  return (
    <div className='drop-files-page'>
      {drag
        ? <div
          className='drop-area'
          onDragStart={event => dragStartHandler(event)}
          onDragLeave={event => dragLeaveHandler(event)}
          onDragOver={event => dragStartHandler(event)}
          onDrop={event => onDropHandler(event)}
        >
          Drop files to load it
        </div>

        : <div
            className='drag-area'
            onDragStart={event => dragStartHandler(event)}
            onDragLeave={event => dragLeaveHandler(event)}
            onDragOver={event => dragStartHandler(event)}
          >
            Drag files to the loading area
          </div>
      }
    </div>
  );
};

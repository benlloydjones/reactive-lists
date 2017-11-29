import React from 'react';

const Task = ({task, taskCompleted, handleClick, deleteTask}) => {
  return (
    <li
      className={taskCompleted ? 'taskDone' : 'taskOpen'}
    >
      <p
        onClick={handleClick}
      >
        {task} {''}
      </p>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={deleteTask}
      >
        Delete
      </button>
    </li>
  );
};

export default Task;

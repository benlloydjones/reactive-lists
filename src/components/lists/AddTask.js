import React from 'react';

const AddTask = ({submitTask, handleChange, value}) => {
  return (
    <form onSubmit={submitTask}>
      <div className="form-group">
        <label htmlFor="addTask">Add a new task to the list</label>
        <input onChange={handleChange} type="text" className="form-control" id="addTask" placeholder="Enter task" value={value} />
      </div>
      <buton className="btn btn-primary">Add task</buton>
    </form>
  );
};

export default AddTask;

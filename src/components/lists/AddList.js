import React from 'react';

const AddList = ({submitList, handleChange, value}) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="addTask">Create a new List</label>
        <input onChange={handleChange} type="text" className="form-control" id="addTask" placeholder="Enter list name" value={value} />
      </div>
      <buton className="btn btn-primary" onClick={submitList}>Add list</buton>
    </form>
  );
};

export default AddList;

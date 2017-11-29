import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import Task from './Task';
import AddTask from './AddTask';

class ListShow extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {},
      newTask: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    Axios
      .get(`/api/lists/${this.props.match.params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Auth.getToken()
        }}
      )
      .then(res => this.setState({ list: res.data }))
      .catch(err => console.log(err));
  }

  submitTask(e) {
    e.preventDefault();
    Axios
      .post(`/api/lists/${this.props.match.params.id}/items`,
        {
          task: this.state.newTask,
          taskCompleted: false
        },
        {
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then(res => this.setState({list: res.data, newTask: ''}))
      .catch(err => console.log(err));
  }

  handleChange({ target: { value }}) {
    this.setState({newTask: value});
  }

  toggleCompleted(id, i) {
    Axios
      .put(`/api/lists/${this.props.match.params.id}/items/${id}`,
        {
          task: this.state.list.items[i].task,
          taskCompleted: !this.state.list.items[i].taskCompleted
        },
        {
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then(res => this.setState({list: res.data}, () => console.log(this.state.list)))
      .catch(err => console.log(err));
  }

  deleteTask(e, id) {
    e.preventDefault();
    Axios
      .delete(`/api/lists/${this.props.match.params.id}/items/${id}`,
        {
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then((res) => this.setState( {list: res.data} ))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h3>{this.state.list.name}</h3>
        <ul>
          {this.state.list.id && this.state.list.items.map((item, i) => <Task key={item.id} {...item} handleClick={() => this.toggleCompleted(item.id, i)} deleteTask={(e) => this.deleteTask(e, item.id)} />)}
        </ul>
        <AddTask
          submitTask={this.submitTask}
          handleChange={this.handleChange}
          value={this.state.newTask}
        />
      </div>
    );
  }
}

export default ListShow;

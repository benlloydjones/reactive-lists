import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

import AddList from './AddList';

class ListIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      newList: ''
    };
    this.deleteList = this.deleteList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitList = this.submitList.bind(this);
  }

  componentDidMount() {
    this.getLists();
  }

  getLists() {
    Axios
      .get('/api/lists',
        {
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then(res => {
        const lists = res.data.filter(list => {
          return list.owner.id === Auth.getPayload().userId;
        });
        return this.setState({ lists });
      })
      .catch(err => console.log(err));
  }

  deleteList(e, id) {
    e.preventDefault();
    Axios
      .delete(`/api/lists/${id}`,
        {
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then(() => {
        const lists = this.state.lists.filter(list => list.id !== id);
        this.setState({ lists });
      })
      .catch(err => console.log(err));
  }

  submitList(e) {
    e.preventDefault();
    Axios
      .post('/api/lists/',
        {
          name: this.state.newList,
          owner: Auth.getPayload().userId
        },{
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          }
        }
      )
      .then(res => this.setState({ lists: this.state.lists.concat(res.data), newList: '' }))
      .catch(err => console.log(err));
  }

  handleChange({ target: { value }}) {
    this.setState({newList: value});
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
          </div>
          {this.state.lists.length > 0 && this.state.lists.map(list => {
            return (
              <div key={list.id} className="col-md-4 col-sm-6 co-xs-12">
                <Link to={`/lists/${list.id}`}><h3>{list.name}</h3></Link><button className="btn btn-outline-danger btn-small" onClick={(e) => this.deleteList(e, list.id)}>Delete</button>
              </div>
            );
          })}
        </div>
        <AddList
          handleChange={this.handleChange}
          submitList={this.submitList}
          value={this.state.newList}
        />
      </div>

    );
  }
}

export default ListIndex;

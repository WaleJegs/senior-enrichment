import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampuses } from '../reducers/campus';
import { NavLink} from 'react-router-dom';
import axios from 'axios';

export default class CampusList extends Component {
  constructor(){
    super()
    this.state = {
      campuses: [],
      campusName: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    axios.get('/api/campuses')
      .then(res => res.data)
      .then( campuses => {
        this.setState({campuses})
      });
  }

  render(){
    return (
      <div>
        <div>
          <form onSubmit = {this.handleSubmit}>
            <label> {'New Team'} </label>
            <br /> <br />
            <input value = {this.state.campusName} name = "campusName" placeholder={'Name of Team'} onChange = {this.handleChange} />
            <br /> <br />
            <input value = {this.state.imageUrl} name = "imageUrl" placeholder={'Image Url'} onChange = {this.handleChange} />
            <br /> <br />
            <button type="submit"> {'CREATE'}</button>
          </form>
        </div>
        {this.state.campuses.map(campus => {
            return (
              <div key = {campus.id}>
                <NavLink to ={`/campuses/${campus.id}`}>
                  <h4> {campus.name} </h4>
                </NavLink>
                <div><button onClick = {() => {
                  axios.delete(`/api/campuses/${campus.id}`)
                  .then(() => {
                    history.go(0)
                  })
                }  }> {'DELETE'} </button></div>
                <img src = { campus.image } />
              </div>
            )
          })
        }
      </div>
    )
  }

  handleChange(evt){
    this.setState({campusName: evt.target.campusName.value, imageUrl: evt.target.value.imageUrl.value})
  }

  handleSubmit(evt){
    evt.preventDefault();
    if (evt.target.campusName.value.length && evt.target.imageUrl.value.length){
      axios.post('/api/campuses', {
        name: evt.target.campusName.value,
        image: evt.target.imageUrl.value})
        .then(() => {
          return axios.get('/api/campuses')
        })
        .then(res => res.data)
        .then( campuses => {
          this.setState({campuses, campusName: '', imageUrl: ''});
        })
    }
  }
}


// const mapStateToProps = ({campuses}) => {
//   return {
//     campuses
//   }
// }

// const mapDispatchToProps = () => {
//   return {
//     getCampuses
//   }
// }

// export default connect(mapStateToProps)(CampusList);


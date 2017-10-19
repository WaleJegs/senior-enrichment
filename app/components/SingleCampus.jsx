import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampus } from '../reducers/campus';
import { NavLink} from 'react-router-dom';
import SingleStudent from './SingleStudent'
import axios from 'axios';

export default class SingleCampus extends Component{

  constructor() {
    super();

    this.state  = {
      campus: {},
      campusName: '',
      imageUrl: '',
      studentName: '',
      email: ''
    };

    this.handleChangeAdd = this.handleChangeAdd.bind(this);
    this.handleChangeEdit =  this.handleChangeEdit.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/campuses/${this.props.match.params.campusId}`)
      .then(res => res.data)
      .then(campus => {
        console.log(campus.students)
        this.setState({campus})
      });
  }

  render () {
    console.log(this.state)
    return (<div>

            <form onSubmit = {this.handleSubmitEdit}>
              <label> {'Edit Campus'} </label> <br /> <br />
              <input value = {this.state.campusName} name = "campusName" placeholder = {'Campus Name'} onChange = {this.handleChangeEdit} /> <br /> <br />
              <input value = {this.state.imageUrl} name = "imageUrl" placeholder = {'image url'} onChange = {this.handleChangeEdit} /> <br /> <br />
              <button type="submit"> {'EDIT'}</button> <br /> <br />
            </form>

            <form onSubmit = {this.handleSubmitAdd}>
              <label> {'Add Student'} </label> <br /> <br />
              <input value = {this.state.studentName} name = "studentName" placeholder = {'Name'} onChange = {this.handleChangeAdd} /> <br /> <br />
              <input value = {this.state.email} name = "email" placeholder = {'Email'} onChange = {this.handleChangeAdd} /> <br /> <br />
              <button type="submit"> {'ADD'} </button> <br /> <br />
            </form>

            <div>
              <h3> {this.state.campus.name} </h3>
              <img src = { this.state.campus.image } />
            </div>

            {this.state.campus.students && this.state.campus.students.map( student => {
              return (
              <div key = {student.id}>
              <NavLink to={`/students/${student.id}`} component={SingleStudent}>
                <h4> {student.name} </h4>
              </NavLink>
              <div><button onClick = {() => {
                  axios.delete(`/api/students/${student.id}`)
                  .then(() => {
                    history.go(0)
                  })
                }  }> {'DELETE'} </button></div>
              </div>)
            })}

          </div>
    )
  }

  handleChangeAdd(evt) {
    this.setState({email: evt.target.email, studentName: evt.target.studentName})
  }

  handleChangeEdit(evt) {
    this.setState({campusName: evt.target.campusName, imageUrl: evt.target.imageUrl})
  }

  handleSubmitAdd(evt){
    evt.preventDefault();
    if (evt.target.studentName.value.length && evt.target.email.value.length){
      axios.post('/api/students', {
        name: evt.target.studentName.value,
        email: evt.target.email.value,
        campusId: this.state.campus.id})
        .then( () => {
          this.setState({studentName: '', email: ''});
        })
    }
  }

  handleSubmitEdit(evt){
    evt.preventDefault();
    if (evt.target.campusName.value.length && evt.target.imageUrl.value.length){
      axios.put(`/api/campuses/${this.props.match.params.campusId}`, {
        name: evt.target.campusName.value,
        image: evt.target.imageUrl.value})
        .then( (campus) => {
          this.setState({campus, campusName: '', imageUrl: ''});
        })
    }
  }

}

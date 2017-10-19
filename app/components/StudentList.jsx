import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../reducers/campus';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class StudentList extends Component {

  constructor(){
    super()
    this.state = {
      students: [],
      studentName: '',
      email: '',
      campuses: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    Promise.all([axios.get('/api/students'), axios.get('/api/campuses')])
    .then(promises => {
      console.log(promises[1].data)
      this.setState({students: promises[0].data, campuses: promises[1].data})
    })
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit = {this.handleSubmit}>
            <label> {'New Student'} </label>
            <br /> <br />
            <input value = {this.state.studentName} name = "studentName" placeholder={'Full Name'} onChange = {this.handleChange} />
            <br /> <br />
            <input value = {this.state.email} name = "email" placeholder={'Email'} onChange = {this.handleChange} />
            <br /> <br />
            <select name = "currentCampus">
              {this.state.campuses.map(campus => {
                return (<option selected={true} key = {campus.id} value = {campus.id}> {campus.name} </option>)
              })}
            </select>
            <br /> <br />
            <button type="submit"> {'CREATE'}</button>
          </form>
        </div>
        {this.state.students.map(student => {
            return (
              <div key = {student.id}>
                <NavLink to = {`/students/${student.id}`}>
                  <h4> {student.name} </h4>
                </NavLink>
                <div><button onClick = {() => {
                  axios.delete(`/api/students/${student.id}`)
                  .then(() => {
                    history.go(0)
                  })
                }  }> {'DELETE'} </button></div>
              </div>
            )
          })
        }
      </div>
    )
  }

  handleChange(evt){
    this.setState({studentName: evt.target.studentName, email: evt.target.email})
  }

  handleSubmit(evt){
    evt.preventDefault();
    if (evt.target.studentName.value.length && evt.target.email.value.length){
      axios.post('/api/students', {
        name: evt.target.studentName.value,
        email: evt.target.email.value,
        campusId: evt.target.currentCampus.value})
        .then(() => {
          return axios.get('/api/students')
        })
        .then(res => res.data)
        .then( students => {
          this.setState({students, studentName: '', email: ''});
        })
    }
  }

}

// const mapStateToProps = ({students}) => {
//   return {
//     students
//   }
// }

// const mapDispatchToProps = () => {
//   return {
//     getStudents
//   }
// }

// export default connect(mapStateToProps)(StudentList);

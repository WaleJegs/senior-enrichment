import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampus } from '../reducers/campus';
import { NavLink} from 'react-router-dom';
import SingleCampus from './SingleCampus'
import axios from 'axios';

export default class SingleStudent extends Component {
  constructor(){
    super()
    this.state = {
      student: {},
      campusName: '',
      studentName: '',
      email: '',
      campuses: [],
      currentCampus: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const student = this.props.match.params.studentId;
    Promise.all([axios.get(`/api/students/${student}`), axios.get('/api/campuses')])
      .then(promises => {
        this.setState({student: promises[0].data, campuses: promises[1].data })
        return axios.get(`/api/campuses/${promises[0].data.campusId}`)
      })
      .then(res => {
            this.setState({campusName: res.data.name})
      });
  }

  render() {
    return (
      <div>
        <h3> {this.state.student.name} </h3>
        <h4> { this.state.student.email } </h4>
        <NavLink to = {`/campuses/${this.state.student.campusId}`} component = {SingleCampus}>
          <h4> {this.state.campusName} </h4>
        </NavLink>

        <form onSubmit = {this.handleSubmit}>
          <label> {'Edit Student'} </label>
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
          <button type="submit"> {'EDIT'}</button>
      </form>
    </div>
    )
  }

  handleChange(evt){
    this.setState({studentName: evt.target.studentName, email: evt.target.email})
  }

  handleSubmit(evt){
    evt.preventDefault();
    if (evt.target.studentName.value.length && evt.target.email.value.length){
      axios.put(`/api/students/${this.state.student.id}`, {
        name: evt.target.studentName.value,
        email: evt.target.email.value,
        campusId: evt.target.currentCampus.value})
        .then((student) => {
          this.setState({student, studentName: '', email: ''});
        })
    }
  }
}

import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import CampusList from './CampusList';
import StudentList from './StudentList';
import axios from 'axios';
import store from '../store';
import { fetchStudents } from '../reducers/student';
import { fetchCampuses } from '../reducers/campus';

export default class Home extends Component {
    constructor(){
        super()

        // this.state = store.getState();
        this.state = {campuses: [], students: []}
    }


    componentDidMount(){
        // store.dispatch(fetchCampuses());
        // store.dispatch(fetchStudents());
        axios.get('api/students')
        .then(res => res.data)
        .then(students => {
            this.setState({students: students})
        })

        axios.get('api/campuses')
        .then(res => res.data)
        .then(campuses => {
            this.setState({campuses: campuses})
        })
    }


    render() {
        return (
        <div >
           <CampusList campuses = {this.state.campuses} />
           <StudentList students = {this.state.students} />
        </div>)
        }
    }

import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import CampusList from './CampusList';
import StudentList from './StudentList';
import axios from 'axios';
import store from '../store';
import { fetchStudents } from '../reducers/student';
import { fetchCampuses } from '../reducers/campus';
import { NavLink } from 'react-router-dom'

export default class Home extends Component {

    render() {
        return (
        <div >
          <h1> {'Welcome To International Interdisciplinary Academy'} </h1>
          <img src={'Facade DH.JPG'} />
        </div>)
        }
    }

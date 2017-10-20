import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import CampusList from './CampusList';
import StudentList from './StudentList';
import Home from './Home';
import axios from 'axios';
import store from '../store';
import { fetchStudents } from '../reducers/student';
import { fetchCampuses } from '../reducers/campus';
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

    render() {
        return (
        <div >
          <div>
            <NavLink to="/" component= {Home}>
              <h2> {'Home'} </h2>
            </NavLink>
          </div>
          <div>
            <NavLink to="/campuses" component= {CampusList}>
                <h2> {'Teams'} </h2>
            </NavLink>
          </div>
          <div>
            <NavLink to="/students" component= {StudentList}>
                <h2> {'Players'} </h2>
            </NavLink>
          </div>
        </div>)
        }
    }

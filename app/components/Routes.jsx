import CampusList from './CampusList';
import StudentList from './StudentList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Nav from  './Nav';

export default class Router extends Component {

  render(){
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path={'/'} component = {Home} />
            <Route exact path={'/campuses'} component = {CampusList} />
            <Route exact path={'/campuses/:campusId'} component = {SingleCampus} />
            <Route exact path={'/students'} component = {StudentList} />
            <Route exact path={'/students/:studentId'} component = {SingleStudent} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

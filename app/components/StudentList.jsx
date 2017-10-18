import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../reducers/campus';
import { NavLink } from 'react-router-dom';

export default function StudentList (props) {

  const { students } = props;

  return (
    <div>
      {props.students.map(student => {
          return (
            <div key = {student.id}>
              {/* <NavLink to = {`/students/${student.id}`}> */}
                <h2> {student.name} </h2>
              {/* </NavLink> */}
            </div>
          )
        })
      }
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     students: state.students
//   }
// }

// const mapDispatchToProps = () => {
//   return {
//     getStudents
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

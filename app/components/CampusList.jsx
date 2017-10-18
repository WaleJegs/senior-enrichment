import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampuses } from '../reducers/campus';
import { NavLink} from 'react-router-dom';

export default function CampusList (props) {

  const { campuses } = props;
  console.log(props)

  return (
    <div>
      {props.campuses.map(campus => {
          return (
            <div key = {campus.id}>
              {/* <NavLink to ={`/campuses/${campus.id}`}> */}
                <h3> {campus.name} </h3>
              {/* </NavLink> */}
              <img src = { campus.image } />
            </div>
          )
        })
      }
    </div>
  )
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

// export default connect(mapStateToProps, mapDispatchToProps)(CampusList);


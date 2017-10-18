import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

export function getStudents (students){
  const action = {type: GET_STUDENTS, students}
  return action;
}

export function fetchStudents () {
  return (dispatch) => {
    axios.get('api/students')
    .then(res => res.data)
    .then(students => {
        dispatch(getStudents(students));
    })
  }
}

export default function reducer (state = [], action){
  switch (action.type) {

    case GET_STUDENTS:
      return action.students

    default:
      return state;

  }
}

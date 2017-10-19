import axios from 'axios';

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// action creators
export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses }
    return action;
}

export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus }
    return action;
}

export function updateCampus(campus) {
    const action = { type: UPDATE_CAMPUS, campus }
    return action;
}

// thunks
export function fetchCampuses() {
    return (dispatch) => {
        axios.get('api/campuses')
            .then(res => res.data)
            .then(campuses => {
                dispatch(getCampuses(campuses));
            })
    }
}

export function fetchCampus() {
    return (dispatch) => {
        axios.get('api/campuses')
            .then(res => res.data)
            .then(campus => {
                dispatch(getCampuses(campus));
            })
    }
}

export function editCampus(id, changes) {
    return dispatch => {
        axios.update(`api/campuses${id}`, changes)
            .then(res => res.date)
    }
}

// reducer
export default function reducer(state = [], action) {
    switch (action.type) {

        case GET_CAMPUSES:
            return action.campuses;

        case GET_CAMPUS:
            return action.campus;

        default:
            return state;

    }
}
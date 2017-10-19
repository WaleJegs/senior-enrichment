import axios from 'axios';

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

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

export function deleteCampus(id) {
    const action = { type: DELETE_CAMPUS, id }
    return action;
}

export function createCampus(campus) {
    const action = { type: CREATE_CAMPUS, campus }
    return action;
}

// thunks
export function fetchCampuses() {
    return (dispatch) => {
        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                dispatch(getCampuses(campuses));
            })
    }
}

export function fetchCampus() {
    return (dispatch) => {
        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campus => {
                dispatch(getCampuses(campus));
            })
    }
}

export function editCampus(id, changes) {
    return dispatch => {
        axios.update(`/api/campuses${id}`, changes)
            .then(res => res.data)
            .then(newCampus => {
                dispatch(updateCampus(newCampus))
            })
    }
}

export function removeCampus(id) {
    return dispatch => {
        dispatch(deleteCampus(id))
        axios.delete(`/api/campuses/${id}`)
    }
}

export function newCampus(campus) {
    return dispatch => {
        axios.post('/api/campuses', campus)
            .then(res => {
                dispatch(createCampus(res.data))
            })
    }
}

// reducer
export default function reducer(campuses = [], action) {
    switch (action.type) {

        case GET_CAMPUSES:
            return action.campuses;

        case GET_CAMPUS:
            return action.campus;

        case UPDATE_CAMPUS:
            return campuses.map(campus => (
                action.campus.id === campus.id ? action.campus : campus
            ))

        case DELETE_CAMPUS:
            return campuses.filter(campus => campus.id !== action.id)

        case CREATE_CAMPUS:
            return [...campuses, action.campus]

        default:
            return campuses;

    }
}
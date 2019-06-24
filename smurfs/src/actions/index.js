// import dependencies
import axios from 'axios';

// define action types
export const REQUESTING = 'REQUESTING';
export const FETCHING_SMURFS_SUCCESS = 'FETCHING_SMURFS_SUCCESS';
export const SAVING_SMURFS_SUCCESS = 'SAVING_SMURFS_SUCCESS';
export const FAILURE = 'FAILURE';

// define base url
const baseUrl = 'http://localhost:3333';

// define action creator functions
const requesting = () => {
  return {
    type: REQUESTING
  };
};
const requestFailed = payload => {
  return {
    type: FAILURE,
    payload
  };
};
const fetchingSmurfsSuccess = payload => {
  return {
    type: FETCHING_SMURFS_SUCCESS,
    payload
  };
};
const savingSmurfSuccess = payload => {
  return {
    type: SAVING_SMURFS_SUCCESS,
    payload
  };
};

export const fetchSmurfs = () => dispatch => {
  dispatch(requesting());
  axios.get(`${baseUrl}/smurfs`)
    .then(res => {
      dispatch(fetchingSmurfsSuccess(res.data));
    })
    .catch(err => {
      dispatch(requestFailed(err.message));
    });
};

export const addNewSmurf = payload => dispatch => {
  dispatch(requesting());
  return axios.post(`${baseUrl}/smurfs`, payload)
    .then(res => {
      dispatch(savingSmurfSuccess(res.data));
    })
    .catch(err => {
      dispatch(requestFailed(err.message));
    });
};

export const updateSmurf = payload => dispatch => {
  const { name, age, height, id } = payload;
  dispatch(requesting());
  return axios.put(`${baseUrl}/smurfs/${id}`, { name, age, height })
    .then(res => {
      dispatch(savingSmurfSuccess(res.data));
    })
    .catch(err => {
      dispatch(requestFailed(err.message));
      return alert('Smurf Updated! You\'re on a roll!!')
    });
}

export const deleteSmurf = smurfId => dispatch => {
  dispatch(requesting());
  return axios.delete(`${baseUrl}/smurfs/${smurfId}`)
    .then(res => {
      dispatch(savingSmurfSuccess(res.data));
    }).catch(err => {
      dispatch(requestFailed(err.message));
    })
}
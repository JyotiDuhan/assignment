const USER_ADDING = 'USER_ADDING'
const USER_ADDING_FAILURE = 'USER_ADDING_FAILURE'
const USER_ADDING_SUCCESS = 'USER_ADDING_SUCCESS'

/**
 * Action Creator: Start User Login Process
 *
 *
 * @returns {Object}  fetchUser Action
 */
export function addUser() {
  return {
    type : USER_ADDING
  }
}

/**
 * Action Creator: User Login Failed
 *
 * @param {String} error if there is error in user login
 *
 * @returns {Object}     USER_ADDING_FAILURE Action
 */
export function addUserFailure(error = 'Error in User Fetching') {
  return {
    type : USER_ADDING_FAILURE,
    error
  }
}

/**
 * Action Creator: User Login Successful
 *
 * @param {Object} userInfo user data
 *
 * @returns {Object}        USER_FETCHING_SUCCESS Action
 */
function addUserSuccess(userInfo) {
  return {
    type : USER_ADDING_SUCCESS,
    userInfo
  }
}

// Async Action Creators Starts

/**
 * Tobe Async Action Creator: Triggers Network Call to login the user
 *
 * @param {String} userId    user userId
 * @param {String} buttonsInfo user buttonsInfo
 *
 * @returns {Promise}       login call promise
 */
export function usersInfo(userId, buttonsInfo) {
  return (dispatch) => {
    dispatch(addUser())
    dispatch(addUserSuccess({
      [userId] : buttonsInfo
    }))
  }
}

// Async Action Creators Ends
const initialState = {
  isUpdating  : false,
  error       : '',
  userInfo    : {}
}

/**
 * Reducer: Generates `user` state of application state
 *
 * @param {Object} state  user state, default to initialState
 * @param {Object} action action generated by related action creator
 *
 * @returns {Object}      Updated User state.
 */
export default function users(state = initialState, action) {
  const options = {
    USER_ADDING : () => ({
      ...state,
      isUpdating : true
    }),
    USER_ADDING_FAILURE : () => ({
      ...state,
      isUpdating : false,
      error      : action.error
    }),
    USER_ADDING_SUCCESS : () => {
      const currentUsersState = Object.assign({}, state.userInfo)
      const updatesUsersState = Object.assign(currentUsersState, action.userInfo)

      return {
        ...state,
        isUpdating : false,
        error      : '',
        userInfo   : updatesUsersState
      }
    }
  }

  return (action.type && options[action.type]) ? options[action.type]() : state
}

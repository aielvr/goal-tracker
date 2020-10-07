import * as API from '../api/index'

export const GET_GOALS_BEGIN = 'GET_GOALS_BEGIN';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';
export const GET_GOAL_DETAILS = 'GET_GOAL_DETAILS';
export const GET_GOAL_DETAILS_BEGIN = 'GET_GOAL_DETAILS_BEGIN';
export const GET_GOAL_DETAILS_FAILURE = 'GET_GOAL_DETAILS_FAILURE';
export const GET_GOAL_DETAILS_SUCCESS = 'GET_GOAL_DETAILS_SUCCESS';
export const GET_GOAL_PROGRESS = 'GET_GOAL_PROGRESS';
export const PATCH_GOAL_BEGIN = 'PATCH_GOAL_BEGIN';
export const PATCH_GOAL_SUCCESS = 'PATCH_GOAL_SUCCESS';
export const PATCH_GOAL_FAILURE = 'PATCH_GOAL_FAILURE';
export const CHANGE_GOAL_PROP_VALUE = 'CHANGE_GOAL_PROP_VALUE';
export const TOGGLE_GOALS = 'TOGGLE_GOALS';
export const TOGGLE_COMPLETED_GOALS = 'TOGGLE_COMPLETED_GOALS';
export const CREATE_NEW_GOAL_BEGIN = 'CREATE_NEW_GOAL_BEGIN';
export const CREATE_NEW_GOAL_SUCCESS = 'CREATE_NEW_GOAL_SUCCESS';
export const CREATE_NEW_GOAL_FAILURE = 'CREATE_NEW_GOAL_FAILURE';
export const CHANGE_NEW_GOAL_PROP_VALUE = 'CHANGE_NEW_GOAL_PROP_VALUE';
export const DELETE_GOAL_BEGIN = 'DELETE_GOAL_BEGIN';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';
export const CHANGE_GOAL_DETAILS = 'CHANGE_GOAL_DETAILS';
export const LOAD_GOAL_DETAILS = 'LOAD_GOAL_DETAILS';

export function getGoalsSuccess({ goalList, completedGoals }) {
    return {
      type: GET_GOALS_SUCCESS,
      payload: {
        goals: goalList,
        completedGoals: completedGoals,
        loading: false
      }
    };
}
  
export function getGoalsFailure(error) {
    return {
        type: GET_GOALS_FAILURE,
        error
    };
}

export function getGoals(userId) {
    return dispatch => {
      dispatch({ type: GET_GOALS_BEGIN });
      API.getGoals(userId)
        .then(res => {
          dispatch(getGoalsSuccess(res))
        })
        .catch(error => dispatch(getGoalsFailure(error)));
    };
}

// export function getGoalDetails(userId, goalId) {
//   return dispatch => {
//     dispatch({ type: GET_GOAL_DETAILS_BEGIN });
//     API.getGoalDetails(userId, goalId)
//       .then(res => {
//         console.log('response', res);
//         dispatch(getGoalDetailsSuccess(res.goalDetails))
//       })
//       .catch(error => dispatch(getGoalDetailsFailure(error)));
//   };
// }

// export function getGoalDetailsSuccess(goalsResponse) {
//   console.log('goalsResponse', goalsResponse);
//   return {
//     type: GET_GOAL_DETAILS_SUCCESS,
//     payload: {
//       goalDetails: goalsResponse,
//       loading: false
//     }
//   };
// }

// export function getGoalDetailsFailure(error) {
//   return {
//       type: GET_GOAL_DETAILS_FAILURE,
//       error
//   };
// }

export function getGoalProgress(goal) {
  return {
    type: GET_GOAL_PROGRESS,
    goal: goal,
  }
}

export function deleteGoal(userId, goalId) {
  return dispatch => {
    dispatch({ type: DELETE_GOAL_BEGIN });
    API.deleteGoal(userId, goalId)
      .then(res => {
        dispatch(deleteGoalSuccess(goalId));
      })
      .catch(error => dispatch(deleteGoalFailure(error)));
  };
}

export function deleteGoalSuccess(goalId) {
  return {
    type: DELETE_GOAL_SUCCESS,
    payload: {
      goalId,
    }
  }
}

export function deleteGoalFailure(error) {
  return {
    type: DELETE_GOAL_FAILURE,
    error,
  }
}

export function getGoalDetails() {
  return {
    type: GET_GOAL_DETAILS,
  }
}

export function patchGoal(userId, patchedGoal) {
  console.log('patchGoal', patchGoal);
  return dispatch => {
    dispatch({ type: PATCH_GOAL_BEGIN });
    API.patchGoal(userId, patchedGoal)
      .then(res => {
        dispatch(patchGoalSuccess(patchedGoal));
      })
      .catch(error => dispatch(patchGoalFailure(error)));
  };
}

export function patchGoalSuccess(goal) {
  return {
    type: PATCH_GOAL_SUCCESS,
    payload: {
      goal,
    }
  }
}

export function patchGoalFailure(error) {
  return {
    type: PATCH_GOAL_FAILURE,
    error
  }
}

export function changeGoalPropVal(property, propertyValue, isPropValid, propError) {
  console.log('isPropValid', isPropValid, 'propError', propError);
  return {
    type: CHANGE_GOAL_PROP_VALUE,
    payload: {
      property: property,
      propertyValue: propertyValue,
      isPropValid,
      propError,
    }
  }
}



export function toggleGoals() {
  return {
    type: TOGGLE_GOALS,
  }
}

export function toggleCompletedGoals() {
  return {
    type: TOGGLE_COMPLETED_GOALS,
  }
}

export function createNewGoal(userId=1, goal) {
  return dispatch => {
    dispatch({ type: CREATE_NEW_GOAL_BEGIN });
    API.createNewGoal(userId, goal)
      .then(res => {
        dispatch(createNewGoalSuccess(goal))
      })
      .catch(error => dispatch(createNewGoalFailure(error)));
  };
}

export function createNewGoalSuccess(newGoal) {
  return {
    type: CREATE_NEW_GOAL_SUCCESS,
    payload: {
      newGoal: newGoal,
    }
  }
}

export function createNewGoalFailure(error) {
  return {
    type: CREATE_NEW_GOAL_FAILURE,
    payload: {
      error: error,
    }
  }
}

export function changeGoalDetails(goalId, dateNote) {
  return {
    type: CHANGE_GOAL_DETAILS,
    payload: {
      goalId: goalId,
      dateNote: dateNote,
    }
  }
}

export function loadGoalDetails(goalDetails) {
  return {
    type: LOAD_GOAL_DETAILS,
    payload: {
      goalDetails: goalDetails,
    }
  }
}
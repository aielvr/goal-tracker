import { combineReducers } from 'redux';
import {
  GET_GOAL_DETAILS_BEGIN, GET_GOAL_DETAILS, GET_GOAL_DETAILS_SUCCESS, GET_GOAL_DETAILS_FAILURE,
  GET_GOALS_BEGIN, GET_GOALS_SUCCESS, GET_GOALS_FAILURE, GET_GOAL_PROGRESS
  , PATCH_GOAL_BEGIN, PATCH_GOAL_SUCCESS, PATCH_GOAL_FAILURE, CHANGE_GOAL_PROP_VALUE,
  TOGGLE_GOALS, TOGGLE_COMPLETED_GOALS, CREATE_NEW_GOAL_SUCCESS
  , CREATE_NEW_GOAL_BEGIN, CREATE_NEW_GOAL_FAILURE,
  DELETE_GOAL_BEGIN, DELETE_GOAL_SUCCESS, DELETE_GOAL_FAILURE, CHANGE_GOAL_DETAILS,
  LOAD_GOAL_DETAILS
} from './actions';

const initialGoalsState = {
    goals: [],
    completedGoals: [],
    toggleGoals: true,
    toggleCompletedGoals: false,
    goalDetails: {},
    isLoading: false,
    isEditing: false,
    error: null
}

export function goalsReducer(state = initialGoalsState, action) {
  switch(action.type) {
    case GET_GOAL_DETAILS_BEGIN:
    case GET_GOALS_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case GET_GOAL_DETAILS:
      return {
        ...state,
      };
    case GET_GOALS_SUCCESS:
      return {
        ...state,
        goals: action.payload.goals,
        completedGoals: action.payload.completedGoals,
        isLoading: false,
        error: null
      };
    case GET_GOALS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case PATCH_GOAL_BEGIN: 
      return {
        ...state,
        isEditing: true,
      }; 
    case PATCH_GOAL_SUCCESS:
      return {
        ...state,
        goals: state.goals.map((goal) => { return (action.payload.goal.goalId === goal.id) ? 
          { id: goal.id,
              name: action.payload.goal.name,
              DateBegin: action.payload.goal.DateBegin,
              dayQuantity: action.payload.goal.dayQuantity,
              description: action.payload.goal.description,
              }
          : goal }),
        isEditing: false,
      };
    case PATCH_GOAL_FAILURE:
      return {
        ...state,
        isEditing: false,
        error: action.error
      };
    // case CHANGE_GOAL_PROP_VALUE:
    //   switch (action.payload.property) {
    //     case 'goalName':
    //       return {
    //         ...state,
    //         goals: state.goals.map(goal => {
    //           if (goal.id == action.payload.goalId) return Object.assign({}, goal, { name: action.payload.propertyValue, })
    //           else return goal
    //         })
    //       }
    //   }
    case TOGGLE_GOALS:
      return {
        ...state,
        toggleGoals: true,
        toggleCompletedGoals: false,
      }
    case TOGGLE_COMPLETED_GOALS:
      return {
        ...state,
        toggleGoals: false,
        toggleCompletedGoals: true,
      }
    case CREATE_NEW_GOAL_BEGIN:
      return {
        ...state,
        isEditing: true,
      }
    case CREATE_NEW_GOAL_SUCCESS:
      state.goals.push(action.payload.newGoal)
      return {
        ...state,
        goals: state.goals,
        isEditing: false,
      }
    case CREATE_NEW_GOAL_FAILURE:
      return {
        ...state,
        isEditing: false,
        error: action.error,
      }
    case DELETE_GOAL_BEGIN:
        return {
          ...state,
          isEditing: true,
        }
    case DELETE_GOAL_SUCCESS:
        return {
          ...state,
          goals: state.goals.filter(goal => goal.id !== action.payload.goalId),
          isEditing: false,
        }
    case DELETE_GOAL_FAILURE:
        return {
          ...state,
          isEditing: false,
          error: action.error,
        }
    default:
      return state;
  }
}

const initialGoalProgressState = {
  goal: null,
}

export function goalProgress(state=initialGoalProgressState, action) {
  switch (action.type) {
    case GET_GOAL_PROGRESS:
      return {
        ...state,
        goal: action.goal,
      };
    default:
      return state;
  }
}

const initialGoalState = {
  id: '',
  name: '',
  DateBegin: '',
  dayQuantity: '',
  description: '',
  isNameValid: false,
  isDateBeginValid: false,
  isDayQuantityValid: false,
  isValid: false,
  formErrors: {
    name: '',
    dateBegin: '',
    dayQuantity: '',
  },
}

export function goalState(state=initialGoalState, action) {
  switch (action.type) {
    case CHANGE_GOAL_PROP_VALUE:
      switch (action.payload.property) {
        case 'goalId':
          return {
            ...state,
            id: action.payload.propertyValue,
          }
        case 'goalName':
          return {
            ...state,
            name: action.payload.propertyValue,
            isNameValid: action.payload.isPropValid,
            isValid: action.payload.isPropValid && state.isDateBeginValid && state.isDayQuantityValid,
            formErrors: {
              ...state.formErrors,
              name: action.payload.propError,
            },
          }
        case 'goalDateBegin':
          return {
            ...state,
            DateBegin: action.payload.propertyValue,
            isDateBeginValid: action.payload.isPropValid,
            isValid: action.payload.isPropValid && state.isNameValid && state.isDayQuantityValid,
            formErrors: {
              ...state.formErrors,
              dateBegin: action.payload.propError,
            },
          }
        case 'goalDayQuantity':
          return {
            ...state,
            dayQuantity: action.payload.propertyValue,
            isDayQuantityValid: action.payload.isPropValid,
            isValid: action.payload.isPropValid && state.isNameValid && state.isDateBeginValid,
            formErrors: {
              ...state.formErrors,
              dayQuantity: action.payload.propError,
            },
          }
        case 'goalDescription':
          return {
            ...state,
            description: action.payload.propertyValue,
          }
      }
    default:
      return state;
  }
}

const initialGoalDetails = {
  goalDetails: [],
  isLoaded: false,
}

export function goalsDetails(state=initialGoalDetails, action) {
  switch (action.type) {
    case CHANGE_GOAL_DETAILS:
      return {
        ...state,
        goalDetails: state.goalDetails.map(el => goalDetails(el, action)),
      }
    case LOAD_GOAL_DETAILS:
      return {
        ...state,
        goalDetails: action.payload.goalDetails,
        isLoaded: true,
      }
    default:
      return state;
  }
}

export function goalDetails(state={}, action) {
  switch (action.type) {
    case CHANGE_GOAL_DETAILS:
      return (state.id === action.payload.goalId) ?
      {
        ...state,
        dateNote: action.payload.dateNote,
      }
      :
      state

    default:
      return state;
  }
}

export default combineReducers({
    goalsState: goalsReducer,
    goalProgress: goalProgress,
    goalState: goalState,
    goalsDetails: goalsDetails,
});

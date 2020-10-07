import axios from 'axios';
// import MockAxios from 'axios-mock-adapter';
import GoalList from '../fixtures/GoalList.json';

const USE_STATIC_DATA = true;

// if(USE_STATIC_DATA) {
//   let mock = new MockAxios(axios);

//   mock.onGet('https://localhost:3000/goals/EIAkhmetianova')
//     .reply(200, GoalList);
// }

export function getGoals(userId = 1) {
    const url = `http://localhost:5000/users/${userId}/goals`;
    return axios.get(url)
      .then(res => {
        let goalList = [];
        let completedGoals = [];
        const goalsArray = res.data;
        if (goalsArray.length > 0) {
          goalsArray.forEach(goal => {
            let bDate = new Date(goal.DateBegin).getDate();
            if (new Date(goal.DateBegin).setDate(bDate + Number(goal.dayQuantity)) > new Date().getTime()) goalList.push(goal)
            else completedGoals.push(goal);
          })
        }
        return {
            goalList,
            completedGoals
        }
      })
      .catch(err => Promise.reject(err));
}

export function getGoalDetails(userId = 1, goalId = 1) {
  const url = `http://localhost:5000/users/${userId}/goals`;
  return axios.get(url)
    .then(res => {
      let data;
      res.data.forEach(element => {
        if (element.id === goalId) data = element;
      });
      return {
          goalDetails: data,
      }
    })
    .catch(err => Promise.reject(err));
}

export function patchGoal(userId=1, { goalId, name, DateBegin, dayQuantity, description, details }) {
  const url = `http://localhost:5000/users/${userId}/goals/${goalId}`;
  return axios.patch(url, {
      "name": name,
      "DateBegin": DateBegin,
      "dayQuantity": dayQuantity,
      "description": description,
      "details": details
  })
    .then(res => {
      return res;
    })
    .catch(err => Promise.reject(err));
}

export function deleteGoal(userId=1, goalId) {
  const url = `http://localhost:5000/users/${userId}/goals/${goalId}`;
  return axios.delete(url)
    .then(res => {
      return res;
    })
    .catch(err => Promise.reject(err));
}

export function createNewGoal(userId=1, { name, DateBegin, dayQuantity, description, details }) {
  const url = `http://localhost:5000/users/${userId}/goals`;
  return axios.post(url, {
      "name": name,
      "DateBegin": DateBegin,
      "dayQuantity": dayQuantity,
      "description": description,
      "details": details,
  })
    .then(res => {
      console.log('res from createNewGoal func', res);
      return res;
    })
    .catch(err => Promise.reject(err));
}


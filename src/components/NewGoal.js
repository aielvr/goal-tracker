import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import FormErrors from './FormErrors';
import {
  changeGoalPropVal
  , createNewGoal
} from '../redux/actions';
import './NewGoal.css';

export class NewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();

    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeDateBegin = this.handleOnChangeDateBegin.bind(this);
    this.handleOnChangeDayQuantity = this.handleOnChangeDayQuantity.bind(this);
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    this.setId = this.setId.bind(this);
    // this.submit = this.submit.bind(this);
    // this.routeChange = this.routeChange.bind(this);
  }

  handleOnChangeName(event) {
    const { changeGoalPropVal } = this.props;
    const isNameValid = event.target.value ? true : false;
    const propError = isNameValid ? '' : 'Наименование цели не может быть пустым';
    changeGoalPropVal('goalName', event.target.value, isNameValid, propError);
  }

  handleOnChangeDateBegin(event) {
    const { changeGoalPropVal } = this.props;
    const isDateBeginValid = event.target.value ? true : false;
    const propError = isDateBeginValid ? '' : 'Дата начала не может быть пустой';
    changeGoalPropVal('goalDateBegin', event.target.value, isDateBeginValid, propError);
  }

  handleOnChangeDayQuantity(event) {
    const { changeGoalPropVal } = this.props;
    const isDayQuantityValid = event.target.value && event.target.value > 0 ? true : false;
    const propError = isDayQuantityValid ? '' :
                      event.target.value < 0 ? 'Количество дней не может принимать отрицательное значение':
                      'Количество дней не может быть пустым / принимать нулевое значение';
    changeGoalPropVal('goalDayQuantity', event.target.value, isDayQuantityValid, propError);
  }

  handleOnChangeDescription(event) {
    const { changeGoalPropVal } = this.props;
    changeGoalPropVal('goalDescription', event.target.value);
  }

  routeChange() {
    const { history, userId } = this.props;
    let path = `/users/${userId}`;
    history.push(path);
  }

  setId(goals) {
    const id = goals.reduce((acc, curValue) => { if(acc < curValue.id) acc = curValue.id; return acc
    }, 1);
    return id + 1;
  }

  createGoalDetails(bdate, quantity) {
    bdate = new Date(bdate);

    const result = [],
          firstDay = bdate.getDate(),
          edate = new Date(bdate);
          edate.setDate(firstDay + Number(quantity));
    let id = 1;

    while (bdate < edate) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      result.push({ id, date: bdate.toLocaleString('en-US', options), dateNote: '' });
      bdate.setDate(bdate.getDate()+1);
      id++;
    }
    return result;
  }

  // const submit = () => {
  //   console.log('ref', nameRef);
  //   console.log('test');
  //   // createNewGoal(1, {
  //   //   'name': this.nameRef.value,
  //   // })
  // }

  // let nameRef = useRef(null);

  render() {
    const { name, DateBegin, dayQuantity, goals, createNewGoal, description,
            formErrors, isValid, userId
          } = this.props;

    return (
      <form id="goal-editing-page">
        <FormErrors formErrors={formErrors} />
        <div className='row goal-properties'>
          <div className='col-12 first-row'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Name</span>
              </div>
              <input type="text" className="form-control" onChange={this.handleOnChangeName} placeholder="Goal name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Date begin</span>
              </div>
              <input type="date" className="form-control" onChange={this.handleOnChangeDateBegin} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">How much days?</span>
              </div>
              <input type="number" className="form-control" onChange={this.handleOnChangeDayQuantity} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Description</span>
              </div>
              <textarea type="text" className="form-control" onChange={this.handleOnChangeDescription} placeholder="Goal description" aria-label="Goal description" aria-describedby="basic-addon1" />
          </div>
          {/* Составить объект из данных формы */}
          <input type='button' className='btn btn-outline-primary' value='Save' disabled={!isValid} onClick={() => {
            const id = this.setId(goals);
            createNewGoal(userId, { name, DateBegin, dayQuantity, description, details: this.createGoalDetails(DateBegin, dayQuantity) });
            this.routeChange();
          }} />
      </form>
    );
  }
}

// IssueListPage.propTypes = {
//   org: PropTypes.string.isRequired,
//   repo: PropTypes.string.isRequired,
//   issues: PropTypes.array.isRequired,
//   openIssuesCount: PropTypes.number.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   pageCount: PropTypes.number.isRequired
// };

// const selectGoal = (goals, goalId) => {
//   let currentGoal = null;
//   goals.forEach(goal => { if (goal.id == goalId) currentGoal = goal; })
//   return currentGoal;
// }

const mapStateToProps = ({ goalState }, ownProps) => {
  const goalId = ownProps.match.params.goalId;
  const userId = ownProps.match.params.userId;
  console.log('goalState.formErrors', goalState.formErrors);
  return {
    goals: ownProps.location.propsSearch,
    name: goalState.name,
    DateBegin: goalState.DateBegin,
    dayQuantity: goalState.dayQuantity,
    description: goalState.description,
    isNameValid: goalState.isNameValid,
    isDateBeginValid: goalState.isDateBeginValid,
    isDayQuantityValid: goalState.isDayQuantityValid,
    isValid: goalState.isValid,
    formErrors: goalState.formErrors,
    userId: userId,
  }
};

const mapDispatchToProps = { changeGoalPropVal, createNewGoal };

export default connect(mapStateToProps, mapDispatchToProps)(NewGoal);

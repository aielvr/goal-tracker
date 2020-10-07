import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormErrors from '../components/FormErrors';
import {
  patchGoal
  , getGoalDetails
  , changeGoalPropVal
} from '../redux/actions';
import '../components/NewGoal.css';

export class GoalEditingPage extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeDateBegin = this.handleOnChangeDateBegin.bind(this);
    this.handleOnChangeDayQuantity = this.handleOnChangeDayQuantity.bind(this);
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    // this.recalcGoalDetails = this.recalcGoalDetails.bind(this);
    // this.routeChange = this.routeChange.bind(this);
  }

  componentDidMount() {
    const { editedGoal, changeGoalPropVal } = this.props;
    changeGoalPropVal('goalId', editedGoal.id, true, '');
    changeGoalPropVal('goalName', editedGoal.name, true, '');
    changeGoalPropVal('goalDateBegin', editedGoal.DateBegin, true, '');
    changeGoalPropVal('goalDayQuantity', editedGoal.dayQuantity, true, '');
    changeGoalPropVal('goalDescription', editedGoal.description);
  }

  componentWillReceiveProps(newProps) {
    // const {getIssues, org, repo, location} = newProps;

    // // Fetch new issues whenever the page changes
    // if(location.query.page !== this.props.location.query.page) {
    //   getIssues(org, repo, location.query.page);
    // }
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
    const { history, goalId, userId } = this.props;
    let path = `/users/${userId}`;
    history.push(path);
    // history.goBack();
  }

  recalcGoalDetails(bdate, quantity) {
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

  render() {
    const {
      editedGoal,
      goal,
      formErrors,
      isValid,
      goals,
      patchGoal,
      goalId,
      userId
    } = this.props;

    if (goal) {
      return (
        <form id="goal-editing-page">
        <FormErrors formErrors={formErrors} />
        <div className='row goal-properties'>
          <div className='col-12 first-row'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Name</span>
              </div>
              <input type="text" className="form-control" value={goal.name} onChange={this.handleOnChangeName} placeholder="Goal name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Date begin</span>
              </div>
              <input type="date" className="form-control" value={goal.DateBegin} onChange={this.handleOnChangeDateBegin} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">How much days?</span>
              </div>
              <input type="number" className="form-control" value={goal.dayQuantity} onChange={this.handleOnChangeDayQuantity} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Description</span>
              </div>
              <textarea type="text" className="form-control" value={goal.description} onChange={this.handleOnChangeDescription} placeholder="Goal description" aria-label="Goal description" aria-describedby="basic-addon1" />
          </div>
          {/* Составить объект из данных формы */}
          <input type='button' className='btn btn-outline-primary' value='Save' disabled={!isValid} onClick={() => {
            const details = (editedGoal.DateBegin !== goal.DateBegin || editedGoal.dayQuantity !== goal.dayQuantity) ?
            this.recalcGoalDetails(goal.DateBegin, goal.dayQuantity) : goal.details;
            patchGoal(userId, {
              goalId: goal.id,
              name: goal.name,
              DateBegin: goal.DateBegin,
              dayQuantity: goal.dayQuantity,
              description: goal.description,
              details: details,
            });
            this.routeChange();
            }} />
        </form>
      );
    }
    else return (
      <>Цель отсутствует</>
    )
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

const selectGoal = (goals, goalId) => {
  let currentGoal = null;
  goals.forEach(goal => { if (goal.id == goalId) currentGoal = goal; })
  return currentGoal;
}

const mapStateToProps = ({ goalsState, goalState }, ownProps) => {
  const goalId = ownProps.match.params.goalId;
  const userId = ownProps.match.params.userId;
  console.log('goalState', goalState);
  return {
    editedGoal: selectGoal(goalsState.goals, goalId),
    goal: goalState,
    goals: [...goalsState.goals, ...goalsState.completedGoals],
    isNameValid: goalState.isNameValid,
    isDateBeginValid: goalState.isDateBeginValid,
    isDayQuantityValid: goalState.isDayQuantityValid,
    isValid: goalState.isValid,
    formErrors: goalState.formErrors,
    goalId: goalId,
    userId: userId
  }
};

const mapDispatchToProps = { getGoalDetails, patchGoal, changeGoalPropVal };

export default connect(mapStateToProps, mapDispatchToProps)(GoalEditingPage);

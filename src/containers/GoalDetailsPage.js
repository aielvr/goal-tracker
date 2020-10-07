import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGoalDetails, changeGoalDetails, loadGoalDetails,
    patchGoal
} from '../redux/actions';
import './GoalDetailsPage.css';
import CalnedarCanvas from '../components/CalendarCanvas';

const GoalDetailsPage = (props) => {
    const { goalDetails, changeGoalDetails, goal, userId, patchGoal, history } = props;
    const goalDetailList = goalDetails.map((el) =>
        <li /*className='list-group-item'*/ key={el.id}>
            <div>{el.date}</div>
            {/* <span>Комментарий<input type='text' value={el.dateNote} onChange={(event) => changeGoalDetails(el.id, event.target.value)}/></span> */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Comment</span>
                </div>
                <textarea className="form-control" value={el.dateNote} onChange={(event) => changeGoalDetails(el.id, event.target.value)} aria-label="Comment"></textarea>
            </div>
        </li>
    )

    let dateEnd = new Date(goal.DateBegin);
    dateEnd.setDate(dateEnd.getDate() + Number(goal.dayQuantity));

    useEffect(() => {
        const { loadGoalDetails, goal, isLoaded } = props;
        if (!isLoaded) loadGoalDetails(goal.details);
    })

    return (
        <div className='row details-container' >
            <div className='col-6'>
                <ul className='details-list'>
                    { goalDetailList }
                </ul>
                <button className='save-btn' type="button" onClick={() => { patchGoal(userId, {
                goalId: goal.id,
                name: goal.name,
                DateBegin: goal.DateBegin,
                dayQuantity: goal.dayQuantity,
                description: goal.description,
                details: goalDetails,
                })
                let path = `/users/${userId}`;
                history.push(path);
                }
                }>Сохранить</button>
            </div>
            <div className='col-6 calendar-side'>
                <CalnedarCanvas bdate={goal.DateBegin} edate={dateEnd} />
            </div>
        </div>
    )

}

const selectGoal = (goals, goalId) => {
    let currentGoal = null;
    goals.forEach(goal => { if (goal.id == goalId) currentGoal = goal; })
    return currentGoal;
}

const mapStateToProps = ({ goalsState, goalsDetails }, ownProps) => {
    const goalId = ownProps.match.params.goalId;
    const userId = ownProps.match.params.userId;
    return {
        goal: selectGoal(goalsState.goals, goalId),
        goalDetails: goalsDetails.goalDetails,
        isLoaded: goalsDetails.isLoaded,
        goalId: goalId,
        userId: userId
    }
};
  
const mapDispatchToProps = { getGoalDetails, changeGoalDetails, loadGoalDetails, patchGoal };

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetailsPage);
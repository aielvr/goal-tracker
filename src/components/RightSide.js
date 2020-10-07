import React, { Component } from 'react';
import './RightSide.css'
import { connect } from 'react-redux';
import {
    getGoalProgress
    // , getRepoDetails
} from '../redux/actions';

export class RightSide extends Component {
    componentDidMount() {
    }

    render() {
        const { percentCompleted, goal, dateEnd } = this.props;
        const percentCompleted_ = percentCompleted ? `${percentCompleted}%` : `0%`;
        const monthArr = [];
        if (goal) monthArr.push(new Date(goal.DateBegin));

        return (
            <>
                { goal
                ?
                <div className='col-6 details-container'>
                    <div className='progress progress-bar-wrapper'>
                        <div className='progress-bar' style={{width: percentCompleted_ }}>
                            {/* This progress bar completed on */}
                            {percentCompleted ? percentCompleted: '0'}%
                        </div>
                    </div>
                </div>
                : <></>
                }
            </>
        )
    }
}

const calcPercentCompleted = (dateBegin, dayQuantity) => {
    if (dateBegin && dayQuantity) {
      const curDate = new Date();
      const dateDiff = Math.abs(curDate.getTime() - new Date(dateBegin).getTime()) / (1000 * 3600 * 24);
      return Math.ceil(dateDiff * 100/dayQuantity) ;
    }
    return;
}

const mapStateToProps = ({ goalProgress }, ownProps) => {
    // const goalNum = ownProps.match.params.goalId;
    const goal = goalProgress.goal;
    let dateEnd; 
    if (goal) {
        const dateBegin = new Date(goal.DateBegin);
        dateEnd = new Date(dateBegin);
        dateEnd.setDate(dateBegin.getDate() + Number(goal.dayQuantity));
    }

    return {
      goal: goal,
      dateEnd: dateEnd,
      percentCompleted: calcPercentCompleted(goal ? goal.DateBegin : null, goal ? goal.dayQuantity : null),
    //   goalsError: goalsState.error,
    }
};

const mapDispatchToProps = { getGoalProgress };

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);
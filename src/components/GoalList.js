import React from 'react';
import { getGoalDetails, getGoals } from '../api/index';
import '../containers/GoalListPage.css';
import { Link } from 'react-router-dom';

export default function GoalList({ goals, getGoalProgress, deleteGoal, userId }) {

    return (
        <>
            { goals.length > 0 ?
            <ul className='list-group'>
                {goals.map(goal => {
                    return (
                    <li className='list-group-item' key={goal.id}>
                        {/* userId needed */}
                        <Link className='upd-link' to={`/users/${userId}/goals/${goal.id}/edit`}>
                            Upd
                        </Link>
                        <Link className='li-text' to={`/users/${userId}/goals/${goal.id}`} onMouseEnter={() => getGoalProgress(goal)} onMouseLeave={() => getGoalProgress(null)} >{goal.name}</Link>
                        <button className='delete-btn' type="button" onClick={() => deleteGoal(userId, goal.id)}>X</button>
                    </li>
                    )
                })}
            </ul>
            :
            <div className='empty-list'>The list is empty</div>
            }
        </>
    );
}

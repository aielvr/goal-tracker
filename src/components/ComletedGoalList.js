import React from 'react';
import { getGoals } from '../api/index';
import '../containers/GoalListPage.css';
import { Link } from 'react-router-dom';

export default function GoalList({ completedGoals }) {

    return (
        <>
            { completedGoals.length > 0 ?
            <ul className='goals list-group'>
                {completedGoals.map(goal => {
                    return (
                    <li className='list-group' key={goal.id}>
                        <div className='li-text'>{goal.name}</div>
                        {/* <Link to={`/users/${userId}/goals/${goal.id}`}> */}
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GoalList from '../components/GoalList';
import ComletedGoalList from '../components/ComletedGoalList';
import {
    getGoals
    , getGoalProgress
    , deleteGoal
    , toggleGoals
    , toggleCompletedGoals
} from '../redux/actions';
// import Paginate from 'react-paginate';
// import FakeIssueList from '../components/FakeIssueList';
import './GoalListPage.css';
import RightSide from '../components/RightSide';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

// function Header({ openIssuesCount, org, repo }) {
//   if(openIssuesCount === -1) {
//     return (
//       <h1>
//         Open issues for <OrgRepo org={org} repo={repo}/>
//       </h1>
//     );
//   } else {
//     const pluralizedIssue = openIssuesCount === 1 ? 'issue' : 'issues';
//     return (
//       <h1>
//         <span className="header__openIssues">{openIssuesCount}</span> open {pluralizedIssue} for <OrgRepo org={org} repo={repo}/>
//       </h1>
//     );
//   }
// }

// function OrgRepo({ org, repo }) {
//   return (
//     <span>
//       <span className="header__org">{org}</span>
//       {' / '}
//       <span className="header__repo">{repo}</span>
//     </span>
//   )
// }

export class GoalListPage extends Component {
  constructor(props) {
    super(props);
    this.handleGoalProgress = this.handleGoalProgress.bind(this);
    // this.handleGoalDeleting = this.handleGoalDeleting.bind(this);
  }
//   static contextTypes = {
//     router: PropTypes.object.isRequired
//   };

  componentDidMount() {
    const { getGoals, isEditing } = this.props;
    // забирать userId из router
    if (!isEditing) getGoals(1);
  }

  componentWillReceiveProps(newProps) {
    // const {getIssues, org, repo, location} = newProps;

    // // Fetch new issues whenever the page changes
    // if(location.query.page !== this.props.location.query.page) {
    //   getIssues(org, repo, location.query.page);
    // }
  }

  handleGoalProgress(goal) {
    const { getGoalProgress } = this.props;
    getGoalProgress(goal);
    // const curDate = new Date();
    // const dateDiff = Math.ceil(Math.abs(curDate.getTime() - dateBegin.getTime()) / (1000 * 3600 * 24));
    // const percentCompleted = (dateDiff * 100)/dayQuantity ;
    // console.log('dateDiff', dateDiff, 'percentCompleted', percentCompleted);
  }

  // handleGoalDeleting(goalId) {
  //   const { deleteGoal, userId, goals } = this.props;
  //   const editedGoalsArray = goals.slice();
  //   let deletedElementIndex;
  //   editedGoalsArray.forEach((element, index) => {
  //     if (element.id === Number(goalId)) { deletedElementIndex = index; }
  //   });
  //   editedGoalsArray.splice(deletedElementIndex, 1);
  //   console.log('editedGoalsArray', editedGoalsArray);
  //   deleteGoal(userId, editedGoalsArray);
  // }

  render() {
    const {
      isLoading, goals, completedGoals,
      goalsError, percentCompleted,
      toggleGoals, toggleCompletedGoals,
      completedGoalsVisible, goalsVisible,
      userId, isEditing, deleteGoal
    } = this.props;

    // const goalsVisible = {
    //   if (toggleGoals) {
    //     return { display: 'none' }
    //   }
    // };
    // const completedGoalsVisible = {
    //   if (toggleCompletedGoals) {
    //     return { display: 'block' }
    //   }
    // };

    if(goalsError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <div>{goalsError.toString()}</div>
        </div>
      );
    }

    return (
      <>
        {/* <Header openIssuesCount={openIssuesCount} org={org} repo={repo}/> */}
            {isLoading
              ? <>Ошибка</>
              : <div class='row'>
                  <div class='col-6'>
                    <div className='button-container'>
                      <Link className='btn btn-outline-primary' to={{
                        pathname: `/users/${userId}/newGoal`,
                        propsSearch: [...goals, ...completedGoals],
                      }}>+ 
                      </Link>
                    </div>
                    <div className='goal-list'>
                      <div className='goal-tab'>
                        <a style={ goalsVisible ? { background: '#eefbeab8' } : {}} onClick={toggleGoals}>Goals in active</a>
                        <a style={ completedGoalsVisible ? { background: '#eefbeab8' } : {}} onClick={toggleCompletedGoals}>Goals completed</a>
                      </div>
                      <section className='list-section'>
                        { goalsVisible ? <GoalList style={goalsVisible} goals={goals} getGoalProgress={this.handleGoalProgress} deleteGoal={deleteGoal} userId={userId} />
                        : <></>
                        }
                        { completedGoalsVisible ? <ComletedGoalList completedGoals={completedGoals} />
                        : <></>
                        }
                      </section>
                    </div>
                  </div>
                  <RightSide />
                </div>
            }
      </>
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

const selectIssues = issues =>
  issues.currentPageIssues.map(number => issues.issuesByNumber[number]);

// const mapStateToProps = ({ issues, repo }, ownProps) => ({
//   issues: selectIssues(issues),
//   issuesError: issues.error,
//   openIssuesCount: repo.openIssuesCount,
//   isLoading: issues.isLoading,
//   pageCount: issues.pageCount,
//   org: ownProps.params.org,
//   repo: ownProps.params.repo
// });

const mapStateToProps = ({ goalsState }, ownProps) => {
  // const goalNum = ownProps.match.params.goalId;
  const userId = ownProps.match.params.userId;
  // console.log('goalsState.goals', goalsState.goals);
  return {
    goals: goalsState.goals,
    completedGoals: goalsState.completedGoals,
    goalsError: goalsState.error,
    isLoading: goalsState.isLoading,
    isEditing: goalsState.isEditing,
    completedGoalsVisible: goalsState.toggleCompletedGoals,
    goalsVisible: goalsState.toggleGoals,
    userId: userId,
  }
};

const mapDispatchToProps = { getGoals, getGoalProgress, deleteGoal, toggleCompletedGoals, toggleGoals };

export default connect(mapStateToProps, mapDispatchToProps)(GoalListPage);

import React from 'react';

export default class SubDredditMenu extends React.Component {
  render() {
    const { sub } = this.props;

    return (
      <div className='sub-info'>
        <div className='sub-info-head'>
          COMMUNITY DETAILS
          </div>
        <div className='sub-info-content'>
          <div className='sub-info-brand'>
            <div className='sub-logo'>
            </div>
            <h1>{sub.title}</h1>
          </div>
          <div className='sub-info-description'>
            <p>{sub.description}</p>
          </div>
          <div className='sub-info-buttons'>
            {this.props.renderFollowButton()}
            <button
              className='sub-create-post'
              onClick={() => this.props.history.push(`/submit/${sub._id}`)}>
              CREATE POST
              </button>
          </div>
        </div>
      </div>
    )
  }
}
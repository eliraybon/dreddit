import React from 'react';

class SubDredditShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchSubDreddit(this.props.match.params.subId);
  }

  render(){
    console.log(this.props);
    return (
      <div>
        <h1>I am a subDreddit!</h1>
      </div>
    )
  }
}

export default SubDredditShow;
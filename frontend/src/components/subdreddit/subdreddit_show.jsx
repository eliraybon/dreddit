import React from 'react';

class SubDredditShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchSubDreddit(1);
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
import React from 'react';
import PostForm from '../post/create_post_form_container';
import PostIndex from '../post/post_index_container';
import { Link } from 'react-router-dom';

class SubDredditShow extends React.Component {
  componentDidMount(){
    debugger;
    this.props.fetchSubDreddit(this.props.match.params.subId);
  }

  componentDidUpdate(prevProps) {
    debugger;
    if (this.props.subId !== prevProps.subId) {
      this.props.fetchSubDreddit(this.props.subId);
    }
  }

  render(){
    const { sub } = this.props;
    debugger;
    if (!sub) return null; 

    return (
      <div className="sub-dreddit">
        <h1>{sub.title}</h1>

        <PostForm subId={sub._id} />
        <PostIndex posts={this.props.posts} />

        <Link to={`/subdreddits/5dddf4842d6ef52836428198`}>
          Test
        </Link>
      </div>
    )
  }
}

export default SubDredditShow;
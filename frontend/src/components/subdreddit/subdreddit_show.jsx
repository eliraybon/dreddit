import React from 'react';
import PostForm from '../post/create_post_form_container';
import PostIndex from '../post/post_index_container';

class SubDredditShow extends React.Component {
  componentDidMount(){
    this.props.fetchSubDreddit(this.props.match.params.subId);
  }

  render(){
    const { sub } = this.props;
    if (!sub) return null; 

    return (
      <div className="sub-dreddit">
        <h1>{this.props.sub.title}</h1>

        <PostForm subId={sub._id} />
        <PostIndex posts={this.props.posts} />
      </div>
    )
  }
}

export default SubDredditShow;
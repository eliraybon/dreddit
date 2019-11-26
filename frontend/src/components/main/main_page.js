import React from 'react';
import PostIndex from '../post/post_index_container';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <PostIndex />
        {/* <h1>A Reddit Clone</h1>
        <footer>
          Copyright &copy; 2019 Dreddit Inc.
        </footer> */}
      </div>
    );
  }
}

export default MainPage;
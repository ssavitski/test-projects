import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <h2>List of blog posts</h2>
    );
  }
}

export default connect(null, { fetchPosts })(PostsIndex);
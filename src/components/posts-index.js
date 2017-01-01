import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <Link to="/posts/new" className="btn btn-primary pull-right">
          Add new post
        </Link>
        <h2>List of blog posts</h2>
      </div>
    );
  }
}

export default connect(null, { fetchPosts })(PostsIndex);
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onDeletePost = this.onDeletePost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeletePost() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <br/>
        <button onClick={this.onDeletePost} className="pull-right btn btn-danger">Delete</button>
        <Link to="/" className="pull-left btn btn-default">&lt; Back to posts</Link>
        <div className="clearfix" ></div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  highlightField(field) {
    return field.touched && field.invalid ? 'has-error' : '';
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const {
      fields: {
        title,
        categories,
        content,
      },
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create new Post</h3>

        <div className={`form-group ${this.highlightField(title)}`}>
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Title" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${this.highlightField(categories)}`}>
          <label htmlFor="exampleInputEmail1">Categories</label>
          <input type="text" className="form-control" id="categories" placeholder="Categories" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${this.highlightField(content)}`}>
          <label htmlFor="content">Content</label>
          <textarea className="form-control" id="content" placeholder="Content" {...content}></textarea>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-default btn-cancel">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a username";
  }

  if (!values.categories) {
    errors.categories = "Enter categories";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }

  return errors;
}

export default reduxForm(
  {
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
  },
  null,
  {
    createPost,
  }
)(PostsNew);

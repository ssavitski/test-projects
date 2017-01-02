import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetails extends Component {
  render() {
    if (!this.props.book) {
      return <div>Please select a book to get started.</div>
    }

    return (
      <div>
      <h3>Details for:</h3>
    <div><strong>Title:</strong> {this.props.book.title}</div>
    <div><strong>Pages:</strong> {this.props.book.pages}</div>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.activeBook,
  };
};

export default connect(mapStateToProps)(BookDetails);
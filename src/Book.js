import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, books } = this.props
    const title = book.title ? book.title : "No title available"

    return (
      <li>
                  <div className="book">
                    <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                      }}
                    />
                    <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => this.props.onChangeShelf(book.id, e)}>
                    <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>

                    </div>
                    <div className="book-title">{ title }</div>
                    { /* Check for authors and render each on separate line if exist*/
                      book.authors && book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>{author}</div>
                    ))}
                  </div>
                </li>
    )
  }

}

export default Book

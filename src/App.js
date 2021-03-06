import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BooksList from "./BooksList";
import SearchBooks from "./SearchBooks";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI"; //import files

class BooksApp extends React.Component {
  state = {

    books:[]
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  };
//components
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  handleChangeShelf = (book: any, shelf: string) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }))
})
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksList booksOnShelf={this.state.books} />} />
        <Route
          path="/search" render={() =>
            <SearchBooks onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;

import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import BooksList from "./BooksList";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";

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

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }



  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksList booksOnShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchBooks onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
        />

      </div>
    );
  }
}

export default BooksApp;

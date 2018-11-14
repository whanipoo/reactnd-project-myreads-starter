import React, { Component } from "react";
import { Link } from "react-router-dom";
import{search, getAll} from "../BooksAPI"

import Book from "./Book.js";

export default class SearchPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: "",
      books: []

    }
  }
  //As soon as the page loaded, get all books
  async componentDidMount(){
    try {
      const books = await getAll();
      this.props.addBooks(books);

    } catch(err) {
      console.log(err);
    }
  }

  //Handles changing query and update list of books being displayed
  handleQueryChange = async e => {
    try {
      const query = e.target.value;
      this.setState({query});

      if(query.trim()){
        const results = await search(query);

        if(results.error){
          this.setState({books: []});
        }
        else {
          this.setState({books: results})
        }
      } else {
        this.setState({books: []});
      }

    } catch (err) {
      console.log(err);
    }
  }


  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleQueryChange} value={this.state.query} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 && this.state.books.map(book => {
              const foundShelf = this.props.books.find(
                searchBook => searchBook.id === book.id
              );
              if(foundShelf){
                book.shelf = foundShelf.shelf;
              }
              else {
                book.shelf = "none";
              }

              return (
                <li key={book.id}>
                  <Book key={book.id} {...book} moveBook={this.props.moveBook} />
                </li>
              )
            }
            )}
            {this.state.books.length === 0 && <h1 style={{textAlign: "center"}}>No results found</h1>}
          </ol>
        </div>
      </div>
    )
  }
}

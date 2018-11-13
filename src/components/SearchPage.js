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
          //Arrow that will link to the homepage
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            //Search input
            <input type="text" placeholder="Search by title or author" onChange={this.handleQueryChange} value={this.state.query} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            //Map through all the searched books and display them
            {this.state.books.length > 0 && this.state.books.map(book => {
              const foundShelf = this.props.books.find(
                searchBook => searchBook.id === book.id
              );
              //Check is the book aleady have a shelf or not
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

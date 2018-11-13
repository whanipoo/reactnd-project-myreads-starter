import React, { Component } from "react";
import {Link} from "react-router-dom";
import Shelf from "./Shelf.js";

import { getAll } from "../BooksAPI.js";


export default class HomePage extends Component {
  //As soon as the page loaded, get all books
  async componentDidMount(){
    try {
      const books = await getAll();
      this.props.addBooks(books);

    } catch(err) {
      console.log(err);
    }
  }

//Rendering all shelves
  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.props.currentlyReading} moveBook={this.props.moveBook} />
            <Shelf title="Want to Read" books={this.props.wantToRead} moveBook={this.props.moveBook} />
            <Shelf title="Read" books={this.props.read} moveBook={this.props.moveBook} />
          </div>
        </div>
        //"+" linking to the search page to add books
        <div className="open-search">
          <Link to="/search"/>
        </div>
      </div>
    )
  }
}

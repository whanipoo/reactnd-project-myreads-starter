import React, { Component } from "react";
import Book from "./Book.js";

export default class Shelf extends Component {
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {this.props.books &&
                this.props.books.map(book => <li  key={book.id}><Book key={book.id} {...book} moveBook={this.props.moveBook} /></li> )}

          </ol>
        </div>
      </div>
    )
  }
}

import React, { Component } from "react";
export const MyContext = React.createContext();
export default class index extends Component {
  constructor(){
    super();
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      //Filter books for each shelf
      addBooks: books => {
        const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
        const wantToRead = books.filter(book => book.shelf === "wantToRead");
        const read = books.filter(book => book.shelf === "read");
        //Update states with current books on each shelf
        this.setState({
          books,
          currentlyReading,
          wantToRead,
          read
        });
      },
      //Function that move books
      moveBook: (book, newShelf, allShelfs) => {

          const newBooks = this.state.books.map(allBooks => {
            //Find book by id then update shelf
            if(book.id === allBooks.id){
              allBooks.shelf = newShelf;
            }
            return allBooks;
          });
          //Update list of books
          this.state.addBooks(newBooks);

      }
    }
  }

  render(){
    return (
      <MyContext.Provider value={{...this.state}}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

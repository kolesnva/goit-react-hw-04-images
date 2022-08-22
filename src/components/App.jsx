import { Component } from 'react';
import { fetchImages } from "./API's/pixabayAPI";
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, items, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' });
    }

    fetchImages(query, page)
      .then(newItems => {
        this.setState(({ items }) => ({
          items: [...items, ...newItems],
        }));
      })
      .finally(() => {
        this.setState({ status: 'idle' });
      });
  }

  handleSearch = query => {
    this.setState({ query, page: 1, items: [] });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch}></SearchBar>
      </div>
    );
  }
}

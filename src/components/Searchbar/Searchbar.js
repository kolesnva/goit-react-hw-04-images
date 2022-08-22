import PropTypes from 'prop-types';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    query: '',
    isDisabled: false,
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (query !== prevState.query) {
      this.setState({ isDisabled: false });
    }
  }

  submitSearch = event => {
    event.preventDefault();

    const { onSearch } = this.props;
    onSearch(this.state.query);

    this.setState({ isDisabled: true });
  };

  onChange = event => {
    this.setState({ query: event.target.value.trim() });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form">
          <button
            type="submit"
            className="button"
            disabled={this.state.isDisabled}
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

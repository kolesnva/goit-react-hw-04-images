import PropTypes from 'prop-types';

export function SearchBar({ onSearch }) {
  const searchPics = event => {
    const input = event.target.elements.input;

    event.preventDefault();

    if (input.value !== '') {
      return;
    }

    onSearch(input.value);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={searchPics}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

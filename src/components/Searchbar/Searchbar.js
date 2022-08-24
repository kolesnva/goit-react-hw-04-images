import PropTypes from 'prop-types';
import { Header, SearchForm, SearchBtn, SearchInput } from './SearchbarStyled';

export function Searchbar({ onSubmit }) {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          type="text"
          name="name"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        ></SearchInput>
        <SearchBtn type="submit" aria-label="search">
          Search
        </SearchBtn>
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

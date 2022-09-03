import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Form,
  BtnLabel,
  Header,
  Input,
  SubmitBtn,
  SearchIcon,
} from './SearchbarStyled';

export function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [query]);

  const submitQuery = event => {
    event.preventDefault();
    onSearch(query);
    setDisabled(true);
  };

  const onChange = event => {
    setQuery(event.target.value.trim());
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={submitQuery}>
        <SubmitBtn type="submit" className="button" disabled={disabled}>
          <SearchIcon />
          <BtnLabel className="button-label"></BtnLabel>
        </SubmitBtn>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={onChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { Component } from 'react';
import { Form, BtnLabel, Header, Input, SubmitBtn } from './SearchbarStyled';

export class Searchbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    disabled: false,
  };

  componentDidUpdate(_, prevState) {
    const { query } = this.state;

    if (query !== prevState.query) {
      this.setState({ disabled: false });
    }
  }

  submitQuery = event => {
    event.preventDefault();

    const { onSearch } = this.props;
    const { query } = this.state;

    onSearch(query);
    this.setState({ disabled: true });
  };

  onChange = event => {
    this.setState({ query: event.target.value.trim() });
  };

  render() {
    const { disabled, query } = this.state;
    return (
      <Header className="searchbar">
        <Form className="form" onSubmit={this.submitQuery}>
          <SubmitBtn type="submit" className="button" disabled={disabled}>
            <BtnLabel className="button-label">Search</BtnLabel>
          </SubmitBtn>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={this.onChange}
          />
        </Form>
      </Header>
    );
  }
}

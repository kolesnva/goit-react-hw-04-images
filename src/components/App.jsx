import { Component } from 'react';
import { fetchImages } from "./API's/pixabayAPI";
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    status: 'idle',
    items: [],
    inputValue: '',
    currentPage: 1,
    modalImage: '',
    isModalShown: false,
    totalHits: '',
  };

  getInputValue = inputValue => {
    this.setState({
      inputValue: inputValue,
      items: [],
      currentPage: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, currentPage } = this.state;

    if (this.props.inputValue === '') {
      return;
    }

    if (
      prevState.inputValue !== inputValue ||
      prevState.currentPage !== currentPage
    ) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { inputValue, currentPage } = this.state;
    this.setState({
      status: 'pending',
    });
    try {
      const { hits, totalHits } = await fetchImages(inputValue, currentPage);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        totalHits: totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
      });
      alert();
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  loadLargeImage = url => {
    this.toggleModal();
    this.setState({ modalImage: url });
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({
      isModalShown: !isModalShown,
    }));
  };

  render() {
    const { status, items, currentPage, modalImage, totalHits, isModalShown } =
      this.state;
    const lastHits = currentPage * 12 >= totalHits;
    return (
      <div>
        <SearchBar onSearch={this.getInputValue} />
      </div>
    );
  }
}

import fetchImages from 'APIs/pixabayAPI';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { SearchError } from './SearchError/SearchError';
export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    status: 'idle',
    currentImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page, items, status } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' });

      try {
        fetchImages(query, page).then(newItems => {
          this.setState(({ items }) => ({
            items: [...items, ...newItems],
          }));
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log('Your request was unsuccesfull');
      } finally {
        this.setState({ status: 'idle' });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query, page: 1, items: [] });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  previewClickHandle = ({ image }) => {
    this.setState({ currentImage: image, status: 'modal' });
  };

  modalCloseHandle = () => {
    this.setState({ status: 'idle' });
  };

  render() {
    const { items, status, currentImage } = this.state;

    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        {status === 'pending' && <Loader />}
        {items.length === 0 && status === 'resolved' && <SearchError />}

        {items.length > 0 && (
          <>
            <ImageGallery items={items} onClick={this.previewClickHandle} />
          </>
        )}
        {items.length >= 12 && <Button onClick={this.loadMore} />}
        {status === 'modal' && (
          <Modal
            closeFunction={this.modalCloseHandle}
            imageURL={currentImage.imageURL}
            tags={currentImage.tags}
          />
        )}
      </div>
    );
  }
}

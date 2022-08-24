import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import API from "./API's/pixabayAPI";

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    status: 'idle',
    page: 1,
    error: null,
    largeImageURL: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      this.state.page > prevState.page
    ) {
      this.setState({ status: 'pending' });

      try {
        const { hits } = await API.fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        const loadedImages = images => {
          return images.map(({ tags, webformatURL, largeImageURL, id }) => ({
            tags,
            webformatURL,
            largeImageURL,
            id,
          }));

          this.setState(state => ({
            images: state.images
              ? [...this.state.images, ...loadedImages]
              : loadedImages,
          }));
        };
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ status: 'idle' });
      }
    }

    if (prevState.images !== this.state.images) {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = event.target.elements;
    const query = form.name.value;

    if (this.state.searchQuery === query || query.trim() === '') {
      return;
    }

    this.setState(state => ({
      images: [],
      searchQuery: query,
      page: 1,
    }));
  };

  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  handleModalOpen = image => {
    this.setState({ largeImageURL: image });
  };

  handleModalClose = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, error, largeImageURL, status } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>

        {error && <div>Whoops, there's nothing was found by your request!</div>}

        {images.length !== 0 && (
          <ImageGallery
            images={images}
            onClick={this.handleModalOpen}
          ></ImageGallery>
        )}

        {status === 'pending' && <Loader />}

        {images.length !== 0 && (
          <Button onClick={this.handleLoadMore} caption="Load more"></Button>
        )}

        {largeImageURL && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImageURL} alt="Image" />
          </Modal>
        )}
      </div>
    );
  }
}

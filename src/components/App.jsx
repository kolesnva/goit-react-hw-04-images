import fetchImages from 'APIs/pixabayAPI';
import { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { SearchError } from './SearchError/SearchError';

export function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (!page) return;
    setStatus('pending');
    fetchImages(query, page).then(newItems => {
      setItems(items => [...items, ...newItems]);
      setStatus('resolved');
    });
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const previewClickHandle = ({ image }) => {
    setCurrentImage(image);
    setStatus('modal');
  };

  const modalCloseHandle = () => {
    setStatus('idle');
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />

      {items.length === 0 && status === 'resolved' && <SearchError />}

      {items.length > 0 && (
        <>
          <ImageGallery items={items} onClick={previewClickHandle} />
        </>
      )}
      {status === 'pending' && <Loader />}
      {items.length >= 12 && <Button onClick={loadMore} />}
      {status === 'modal' && (
        <Modal
          closeFunction={modalCloseHandle}
          imageURL={currentImage.imageURL}
          tags={currentImage.tags}
        />
      )}
    </div>
  );
}

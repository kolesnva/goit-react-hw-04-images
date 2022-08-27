const API_KEY = '28415158-90f05cd520acc7bacb808566f';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(searchQuery, page) {
  const searchParams = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&per_page=12&page=${page}`,
    searchParams
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Something is wrong!'));
    })
    .then(json =>
      json.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        previewURL: webformatURL,
        imageURL: largeImageURL,
        tags,
      }))
    )
    .catch(error => console.error(error));
}

export default fetchImages;

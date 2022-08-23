const API_KEY = '28415158-90f05cd520acc7bacb808566f';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page) {
  const searchOptions = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  };
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}`,
    searchOptions
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(
          'Ooops! Something is wrong:-( Please, refresh page and try again.'
        )
      );
    })
    .then(response => {
      return {
        hits: response.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => ({
            id,
            largeImageURL,
            webformatURL,
            tags,
          })
        ),
        totalHits: response.totalHits,
      };
    });
}

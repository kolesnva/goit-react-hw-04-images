import axios from 'axios';

const API_KEY = '28415158-90f05cd520acc7bacb808566f';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (name, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return response.data;
};

export default { fetchImages };

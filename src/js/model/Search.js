import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getCities() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios(`${proxy}https://api.openaq.org/v1/cities?country=${this.query}&limit=10`);
      this.result = response.data.results;
    } catch (error) {
      alert(`ERROR SEARCH: ${error}`);
    }
  }
}
import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios(`${proxy}https://api.openaq.org/v1/cities?limit=10&country=${this.query}&order_by=count&sort=desc`);
      // const sorted = response.data.results.sort((a, b) => {
      //   return a.count > b.count ? -1 : 1;
      // });
      this.result = response.data.results;
    } catch (error) {
      alert(`ERROR SEARCH: ${error}`);
    }
  }
}
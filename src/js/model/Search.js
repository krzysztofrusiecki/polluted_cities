import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getCities() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios(`${proxy}https://api.openaq.org/v1/cities?country=${this.query}&order_by=count&sort=desc&limit=10`);
      this.result = response.data.results;
      // const response = await axios(`${proxy}https://api.openaq.org/v1/latest?country=${this.query}&parameter=pm10&order_by=measurements[0][value]&sort=desc&limit=10`);
      // this.result = response.data
    } catch (error) {
      if (!alert(`SOMETHING WENT WRONG!`)) {
        window.location.reload();
        window.localStorage.clear()
      }
    }
  }
}
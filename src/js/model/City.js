import axios from 'axios';

export default class City {
  constructor(cityNames) {
    this.cityNames = cityNames;
  }

  async getDescr() {
    try {
      for (let city of this.cityNames) {
        // console.log(city);
        const response = await axios(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=description&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${city.city}`);
        city.snippet = response.data.query.search;
      }
    } catch (error) {
      alert(`ERROR CITY: ${error}`);
    }
  }
}
import axios from 'axios';

export default class City {
  constructor(cityNames, lang) {
    this.cityNames = cityNames;
    this.lang = lang;
  }

  async getDescr() {
    try {
      for (let city of this.cityNames) {
        const regex = / /gi;
        const place = city.city.replace(regex, '_');
        const trans1 = place.toLowerCase();
        // console.log(trans)
        const trans2 = trans1.charAt(0).toUpperCase() + trans1.slice(1);
        console.log(trans2)
        let trans3;
        for (let letter = 0; letter < trans2.length; letter++) {
          if (trans2[letter] === '-') trans3 = trans2[letter++].toUpperCase();
          else if (trans2[letter] === '_') trans3 = trans2[letter++].toUpperCase();
          else trans3 = trans2;
        }
        const response = await axios(`https://${this.lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&utf8=&format=json&origin=*&titles=${place}`);
        console.log(response)
        const key = Object.keys(response.data.query.pages)[0];
        city.key = key;
        city.data = response.data.query.pages[key];
        city.url = `https://${this.lang}.wikipedia.org/wiki/${place}`;
      }
    } catch (error) {
      alert(`ERROR CITY: ${error}`);
    }
  }
}
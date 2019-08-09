import axios from 'axios';

export default class City {
  constructor(cityNames, lang) {
    this.cityNames = cityNames;
    this.lang = lang;
  }

  async getDescr() {
    try {
      for (let city of this.cityNames) {
        const regexSlahed = /\/.+/gi;
        const regexSpace2Underscore = /\ /gi;
        const regexSpace = / [a-z]/gi;
        const regexHyphen = /\-[a-z]/gi;
        const regexUnderscore = /\_[a-z]/gi;
        const regexValencia = /Valencia.+/gi;

        let place = city.city;
        console.log(place)

        if (this.lang == 'ES') {
          if (place.includes('CCAA')) place = place.replace('CCAA ', '');
          if (place.includes('Com.')) place = place.replace('Com. ', '');
        }

        place = place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
        place = place.replace(regexSlahed, '');
        if (place.includes(' ')) place = place.replace(regexSpace, `${place.match(regexSpace).join('').toUpperCase()}`);
        if (place.includes('-') && this.lang !== 'FR') place = place.replace(regexHyphen, `${place.match(regexHyphen).join('').toUpperCase()}`);
        if (place.includes('_')) place = place.replace(regexUnderscore, `${place.match(regexUnderscore).join('').toUpperCase()}`);
        place = place.replace(regexSpace2Underscore, '_');
        console.log(place)
        if (this.lang == 'FR') place = city.city;
        console.log(place);
        if (this.lang == 'ES' && place.match(regexValencia)) place = 'Provincia_de_Valencia';
        console.log(place)
        const response = await axios(`https://${this.lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&utf8=&format=json&origin=*&titles=${place}`);
        console.log(response);
        const key = Object.keys(response.data.query.pages)[0];
        city.key = key;
        city.data = response.data.query.pages[key];
        city.url = `https://${this.lang}.wikipedia.org/wiki/${place}`;
      }
    } catch (error) {
      if (!alert(`SOMETHING WENT WRONG! ${error}`)) {
        // window.location.reload();
        window.localStorage.clear()
      }
    }
  }
}
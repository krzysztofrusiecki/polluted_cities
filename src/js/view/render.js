import {
  elements
} from './base';

export const renderCity = (cityName, cityDescr) => {
  const html = `<div class="cities__city">
  <div class="cities__header"><p>${cityName}</p></div>
  <div class="cities__body">
  <p>${cityDescr}</p>
  </div>
</div>`;
  elements.cities.insertAdjacentHTML('beforeend', html);
}

export const renderResult = cities => {
  cities.forEach(city => renderCity(city.city, city.descr));
}
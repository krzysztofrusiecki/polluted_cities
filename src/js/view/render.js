import {
  elements
} from './base';

export const renderCity = (citySnippet, cityURL, cityKey) => {
  let snip;
  let flag;
  if (typeof citySnippet.extract == undefined) snip = 'No description available';
  else if (cityKey == (-1)) {
    snip = 'No description available';
    flag = true;
  } else snip = citySnippet.extract.slice(0, 240);
  let html;
  if (!flag) {
    html = `<div class="cities__city">
    <div class="cities__header"><p><a href="${cityURL}" target="_blank">${citySnippet.title}</a></p></div>
    <div class="cities__body">
    <p>${snip}...</p>
    </div>
    </div>`;
  } else {
    html = `<div class="cities__city">
    <div class="cities__header"><p><a href="#" onclick="return false;" target="_blank">${citySnippet.title}</a></p></div>
    <div class="cities__body">
    <p>${snip}...</p>
    </div>
    </div>`;
  }
  elements.cities.insertAdjacentHTML('beforeend', html);
}

export const renderResult = cities => {
  cities.forEach(city => renderCity(city.data, city.url, city.key));
}
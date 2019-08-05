import {
  elements
} from './base';

export const renderCity = (citySnippet) => {
  const reg1 = /\(.*\)/gi;
  const reg2 = /\[.*?\]/gi;
  const snip1 = citySnippet.snippet.replace(reg1, '');
  const snip2 = snip1.replace(reg2, '');
  const html = `<div class="cities__city">
  <div class="cities__header"><p>${citySnippet.title}</p></div>
  <div class="cities__body">
  <p>${snip2}</p>
  </div>
</div>`;
  elements.cities.insertAdjacentHTML('beforeend', html);
}

export const renderResult = cities => {
  cities.forEach(city => renderCity(city.snippet[0]));
}
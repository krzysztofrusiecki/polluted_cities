import {
  elements
} from './base';

export const renderCity = (citySnippet, cityURL, cityKey) => {
  let snip;
  let html;
  let flag;

  if (typeof citySnippet.extract == undefined || citySnippet.extract == '...') snip = 'No description available';
  else if (cityKey == (-1)) {
    snip = 'No description available';
    flag = true;
  } else snip = citySnippet.extract.slice(0, 512) + '...';

  if (!isMobile()) {
    if (!flag) {
      html = `<div class="cities__city">
    <div class="cities__header"><p><a href="${cityURL}" target="_blank">${citySnippet.title}</a></p></div>
    <div class="cities__body">
    <p>${snip}</p>
    </div>
    </div>`;
    } else {
      html = `<div class="cities__city">
    <div class="cities__header"><p><a href="#" onclick="return false;" target="_blank">${citySnippet.title}</a></p></div>
    <div class="cities__body">
    <p>${snip}</p>
    </div>
    </div>`;
    }
  } else {
    if (!flag) {
      html =
        `<div class="city">
        <div class="city__header"><p><a href="${cityURL}" target="_blank">${citySnippet.title}</a></p></div>
        <div class="city__body">
        <p>${snip}</p>
        </div>
        </div>`;
    } else {
      html =
        `<div class="city">
        <div class="city__header"><p><a href="#" onclick="return false;" target="_blank">${citySnippet.title}</a></p></div>
        <div class="city__body">
        <p>${snip}</p>
        </div>
        </div>`;
    }
  }
  elements.cities.insertAdjacentHTML('beforeend', html);
}

export const renderResult = cities => {
  cities.forEach(city => renderCity(city.data, city.url, city.key));
}

const isMobile = () => window.innerWidth < 768 ? true : false;


export const renderDOM = () => {
  let element = document.querySelectorAll('.city__header');
  return element;
}
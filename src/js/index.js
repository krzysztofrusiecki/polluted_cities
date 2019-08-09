import Search from './model/Search';
import City from './model/City';
import * as searchView from './view/searchView';
import * as render from './view/render';
import {
  elements
} from './view/base';

let pageData = JSON.parse(window.localStorage.getItem('data'));
const countries = ['Poland', 'Germany', 'Spain', 'France'];
const state = {};
let cities = render.renderDOM();
elements.input.value = '';


const page = (pageData) => {
  if (!pageData) {
    controlSearch();
  } else {
    render.renderResult(pageData);
    cities = render.renderDOM();
    reloadListeners(cities);
  }
}

const reloadListeners = (cities) => {
  cities.forEach(element => {
    element.addEventListener('click', event => {
      let style = event.target.parentNode.lastElementChild.style
      if (style.flexGrow !== '1') style.cssText = 'height: auto; flex-grow: 1;';
      else style.cssText = 'height: 0; flex-grow: 0;';
    });
  });
}

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput(countries);
  searchView.clearInput();
  // 2) New search
  if (query) {
    let searchQuery;
    switch (query) {
      case 'poland':
        searchQuery = 'PL';
        break;
      case 'spain':
        searchQuery = 'ES';
        break;
      case 'france':
        searchQuery = 'FR';
        break;
      case 'germany':
        searchQuery = 'DE';
        break;
      default:
        alert('COUNTRY ERROR');
    }
    state.search = new Search(searchQuery);
    // 3) Prepare UI for results
    searchView.clearResults();
    // 4) Search for cities
    try {
      await state.search.getCities();
      reloadListeners(cities);
    } catch (error) {
      console.log('ERROR A:', error)
    }
    state.cities = new City(state.search.result, searchQuery);
    try {
      await state.cities.getDescr();
      reloadListeners(cities);
    } catch (err) {
      console.log('ERROR B:', err)
    }

    // 5) Render results on UI
    render.renderResult(state.search.result);
    cities = render.renderDOM();
    reloadListeners(cities);
    // 6) Put result to localstorage
    elements.input.value = '';
    window.localStorage.setItem('data', JSON.stringify(state.search.result));
  }

}


searchView.clearResults();
page(pageData);

elements.input.addEventListener('keypress', e => {
  if (e.keyCode === 13) controlSearch();
  cities = render.renderDOM();
  reloadListeners(cities);
});
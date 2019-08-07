import Search from './model/Search';
import City from './model/City';
import * as searchView from './view/searchView';
import * as render from './view/render';
import {
  elements
} from './view/base';
import {
  clearResults
} from '../../../../udemy/complete-javascript-course-master/9-forkify/final/src/js/views/searchView';

let pageData = JSON.parse(window.localStorage.getItem('data'));
const countries = ['Poland', 'Germany', 'Spain', 'France'];

const state = {};

const page = (pageData) => {
  if (!pageData) {
    controlSearch();
  } else {
    render.renderResult(pageData);
  }
}

searchView.clearResults();
page(pageData);

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();
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
      console.table(state.search.result);
    } catch (error) {
      console.log('ERROR A:', error)
    }
    state.cities = new City(state.search.result, searchQuery);
    try {
      await state.cities.getDescr();
      console.table(state.search.result);
    } catch (err) {
      console.log('ERROR B:', err)
    }

    // 5) Render results on UI
    render.renderResult(state.search.result);

    // 6) Put result to localstorage
    window.localStorage.setItem('data', JSON.stringify(state.search.result));
    console.log(state.search.result);
  }

}

elements.input.addEventListener('keypress', e => {
  if (e.keyCode === 13) controlSearch();
});
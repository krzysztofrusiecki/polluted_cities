import Search from './model/Search';
import * as searchView from './view/searchView';
import * as render from './view/render';
import {
  elements
} from './view/base';
import {
  clearResults
} from '../../../../udemy/complete-javascript-course-master/9-forkify/final/src/js/views/searchView';

const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();
  // 2) New search object and add to state
  if (query) {
    let searchQuery;
    switch (query) {
      case 'Poland':
        searchQuery = 'PL';
        break;
      case 'Spain':
        searchQuery = 'ES';
        break;
      case 'France':
        searchQuery = 'FR';
        break;
      case 'Germany':
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
      await state.search.getResult();
      console.table(state.search.result);
    } catch (error) {
      console.log('ERROR A:', error)
    }
    // 5) Render results on UI
    render.renderResult(state.search.result);
  }

}

elements.input.addEventListener('keypress', e => {
  if (e.keyCode === 13) controlSearch();
});
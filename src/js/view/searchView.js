import {
  elements
} from './base';

export const getInput = () => elements.input.value.toLowerCase();

export const clearResults = () => {
  elements.cities.innerHTML = '';
};
import {
  elements
} from './base';

export const getInput = () => elements.input.value;

export const clearResults = () => {
  elements.cities.innerHTML = '';
};
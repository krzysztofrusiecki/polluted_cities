import {
  elements
} from './base';

const autocomplete = (places) => {
  let value = elements.input.value;
  document.getElementById('datalist').innerHTML = '';
  let l = value.length;
  for (let i = 0; i < places.length; i++) {
    if (((places[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
      const node = document.createElement("option");
      const val = document.createTextNode(places[i]);
      node.appendChild(val);
      document.getElementById("datalist").appendChild(node);
    }
  }
  value = elements.input.value;
}

export const getInput = (places) => {
  autocomplete(places);
  return elements.input.value.toLowerCase();
}

export const clearInput = (places) => {
  const datalist = document.getElementById('datalist');
  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  autocomplete(places);
}

export const clearResults = () => {
  elements.cities.innerHTML = '';
};
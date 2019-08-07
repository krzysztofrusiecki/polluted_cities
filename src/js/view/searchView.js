import {
  elements
} from './base';


export const getInput = (places) => {
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
  return elements.input.value.toLowerCase();
}

export const clearResults = () => {
  elements.cities.innerHTML = '';
};
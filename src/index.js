import './styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import listTemplates from './templates/list-country.hbs';
import countryTemplates from './templates/country.hbs';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const _ = require('lodash');

refs.inputRefs.addEventListener('input', _.debounce(foundCountry, 500));

function foundCountry(event) {
  const name = event.target.value;
  clear();
  fetchCountries(name)
    .then(data => {
      const length = data.length;
      const oneCountry = countryTemplates(data);
      const listCountry = listTemplates(data);
      const message =
        "<p class ='text-not-found'>Sorry, but you  Request  incorrect </p>";

      if (length > 1 && length <= 10) {
        const ul = `<ul>${listCountry}</ul>`;
        createMarkup(ul);
      } else if (length === 1) {
        createMarkup(oneCountry);
      } else if (length > 10) {
        alert({
          text: 'Too many matches found.Please entry a more specific  query!',
        });
      } else {
        createMarkup(message);
      }
    })
    .catch(console.error);
}

function createMarkup(items) {
  return refs.boxCountry.insertAdjacentHTML('beforeend', items);
}
function clear() {
  return (refs.boxCountry.innerHTML = '');
}

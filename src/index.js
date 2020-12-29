import './styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import listTemplates from './templates/list-country.hbs';
import countryTemplates from './templates/country.hbs';
import debounce from 'lodash.debounce';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const _ = require('lodash');

refs.inputRefs.addEventListener('input', debounce(foundCountry, 500));

function foundCountry(event) {
  const name = event.target.value;
  clear();
  if (!name) {
    return;
  } else {
    fetchCountries(name)
      .then(data => {
        const length = data.length;
        responseRate(length, data);
      })
      .catch(console.error);
  }
}

function createMarkup(items) {
  return refs.boxCountry.insertAdjacentHTML('beforeend', items);
}
function clear() {
  return (refs.boxCountry.innerHTML = '');
}

function responseRate(count, data) {
  if (count > 1 && count <= 10) {
    const listCountry = listTemplates(data);
    const ul = `<ul>${listCountry}</ul>`;
    createMarkup(ul);
  } else if (count === 1) {
    const oneCountry = countryTemplates(data);
    createMarkup(oneCountry);
  } else if (count > 10) {
    alert({
      text: 'Too many matches found.Please entry a more specific  query!',
    });
  } else {
    const message =
      "<p class ='text-not-found'>Sorry, but you  Request  incorrect </p>";
    createMarkup(message);
  }
}

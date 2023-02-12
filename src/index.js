import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import getRefs from './get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const searchCountry = refs.searchBox.value.trim();

  clearMarkup();
  if (!searchCountry) return;

  fetchCountries(searchCountry)
    .then(renderCountry)
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

function renderCountry(country) {
  if (country.length > 10)
    Notify.info('Too many matches found. Please enter a more specific name.');

  if (country.length > 1 && country.length <= 10) markupCounryList(country);

  if (country.length === 1) markupCounryInfo(country);
}

function markupCounryList(countries) {
  const markup = countries
    .map(
      ({ name, flags }) =>
        `<li class = "country-item">
            <img src = ${flags.svg} alt = "flag" class = "flag--small">
            <h2 name = "country">${name.official}</h2>
        </li>`
    )
    .join('');

  refs.countryList.innerHTML = markup;
}

function markupCounryInfo(countries) {
  const { name, capital, population, languages, flags } = countries[0];

  const markup = `<div class = "country-item">
                <img src = ${flags.svg} class = "flag" alt = "flag">
                <h1 name = "country">${name.official}</h1>
            </div>
            <p class = "country-info">Capital:
            <span class = "country-info-description">${capital}</span></p>
            <p class = "country-info">Population:
            <span class = "country-info-description">${population}</span></p>
            <p class = "country-info">Languages:
            <span class = "country-info-description">${Object.values(
              languages
            ).join(', ')}</span></p>`;

  refs.countryInfo.innerHTML = markup;
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

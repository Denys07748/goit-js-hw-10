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
  if (!searchCountry) return;
  console.log(refs.searchBox.value);

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

function markupCounryList(countres) {
  const markupList = countres
    .map(
      ({ name, flags }) =>
        `<li class = "country-item">
            <img src = ${flags.svg} alt = "flag" class = "flag--small">
            <h2 name = "country">${name.official}</h2>
        </li>`
    )
    .join('');

  refs.countryList.innerHTML = markupList;
}

function markupCounryInfo(countres) {
  const markupInfo = countres;
}

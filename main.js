const citiesOfRegion = {
    'center': ['', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
    'North': ['', 'Chernihiv', 'Sumy', 'Not in the list'],
    'East': ['', 'Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
    'South': ['', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
    'West': ['', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi',
        'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};
const inputName = document.forms[0].elements[0];
const inputCheckbox = document.forms[0].elements[1];
const inputTel = document.forms[0].elements[2];
const selectRegions = document.forms[0].elements[3];
const selectCities = document.forms[0].elements[4];
const buttonForm = document.forms[0].elements[5];

function checkInputName() {
    inputName.classList.remove('backgroundGreen');
    inputName.classList.remove('backgroundRed');
    isValidInputName();
    isValidForm();
}

function checkInputTelephone() {
    inputTel.classList.remove('backgroundRed');
    inputTel.classList.remove('backgroundGreen');
    isValidInputTel();
    isValidForm();
}

function isValidInputName() {
    const valueInputName = inputName.value.match(/\S+/g);

    if (valueInputName) {
        return valueInputName.length > 1 && valueInputName.length < 4;
    }
    return false;
}

function addColorInputName() {

    if (isValidInputName()) {
        this.classList.add('backgroundGreen');
        return;
    }

    this.classList.add('backgroundRed');
}

function isValidInputTel() {
    return /^\+?3?8?(0\d{9})$/.test(inputTel.value);
}

function addColorInputTel() {

    if (isValidInputTel()) {
        this.classList.add('backgroundGreen');
        return;
    }

    this.classList.add('backgroundRed');
}

function showSelectCities() {
    const valueSelectRegions = selectRegions.value;
    const cities = citiesOfRegion[valueSelectRegions];

    while (selectCities.hasChildNodes()) {
        selectCities.removeChild(selectCities.firstChild);
    }

    if (cities) {
        cities.forEach(city => {
            const tegOption = document.createElement('option');
            tegOption.textContent = city;
            tegOption.setAttribute('value', city);
            selectCities.append(tegOption);
        })
    }

    isValidForm();
}

function chooseCities() {
    isValidForm();
}

function hideDomElements() {
    inputTel.classList.toggle('hideElement');
    selectRegions.classList.toggle('hideElement');
    selectCities.classList.toggle('hideElement');

    isValidForm();
}

function isValidForm() {

    if (inputCheckbox.checked && isValidInputName()) {
        buttonForm.disabled = false;
        return;
    }

    if (isValidInputName() &&
        isValidInputTel() &&
        selectRegions.value &&
        (selectCities.value ||
            selectRegions.value === 'Kyiv')) {
        buttonForm.disabled = false;
        return;
    }

    buttonForm.disabled = true;
}

function checkForm() {
    inputName.addEventListener('input', checkInputName);
    inputName.addEventListener('blur', addColorInputName);
    inputCheckbox.addEventListener('click', hideDomElements);
    inputTel.addEventListener('input', checkInputTelephone);
    inputTel.addEventListener('blur', addColorInputTel);
    selectRegions.addEventListener('change', showSelectCities);
    selectCities.addEventListener('change', chooseCities);
}

document.addEventListener('DOMContentLoaded', () => {
    checkForm();
});

const citiesOfRegion = {
    center: ['', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
    North: ['', 'Chernihiv', 'Sumy', 'Not in the list'],
    East: ['', 'Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
    South: ['', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
    West: ['', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi',
        'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};

const { formReg } = document;
const { name } = formReg;
const { prefer } = formReg;
const { tel } = formReg;
const { regions } = formReg;
const { cities } = formReg;
const { button } = formReg;

function checkInputName() {
    name.classList.remove('valid');
    name.classList.remove('inValid');
    isValidForm();
}

function checkInputTelephone() {
    tel.classList.remove('inValid');
    tel.classList.remove('valid');
    isValidForm();
}

function validateName() {
    const valueInputName = name.value.match(/\S+/g);

    if (valueInputName) {
        return valueInputName.length > 1 && valueInputName.length < 4;
    }
    return false;
}

function addColorInputName() {
    if (validateName()) {
        this.classList.add('valid');
        return;
    }

    this.classList.add('inValid');
}

function isValidInputTel() {
    return /^\+?3?8?(0\d{9})$/.test(tel.value);
}

function addColorInputTel() {
    if (isValidInputTel()) {
        this.classList.add('valid');
        return;
    }

    this.classList.add('inValid');
}

function showSelectCities() {
    const valueSelectRegions = regions.value;
    const region = citiesOfRegion[valueSelectRegions];

    while (cities.hasChildNodes()) {
        cities.removeChild(cities.firstChild);
    }

    if (region) {
        region.forEach(city => {
            const tegOption = document.createElement('option');
            tegOption.textContent = city;
            tegOption.setAttribute('value', city);
            cities.append(tegOption);
        })
    }

    isValidForm();
}

function chooseCities() {
    isValidForm();
}

function hideDomElements() {
    tel.classList.toggle('hideElement');
    regions.classList.toggle('hideElement');
    cities.classList.toggle('hideElement');

    isValidForm();
}

function isValidForm() {

    if (prefer.checked && validateName()) {
        button.disabled = false;
        return;
    }

    if (validateName() &&
        isValidInputTel() &&
        regions.value &&
        (cities.value ||
            regions.value === 'Kyiv')) {
        button.disabled = false;
        return;
    }

    button.disabled = true;
}

function checkForm() {
    name.addEventListener('input', checkInputName);
    name.addEventListener('blur', addColorInputName);
    prefer.addEventListener('click', hideDomElements);
    tel.addEventListener('input', checkInputTelephone);
    tel.addEventListener('blur', addColorInputTel);
    regions.addEventListener('change', showSelectCities);
    cities.addEventListener('change', chooseCities);
}

document.addEventListener('DOMContentLoaded', () => {
    checkForm();
});

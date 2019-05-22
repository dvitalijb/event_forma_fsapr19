const inputNameUser = document.querySelector('input[type="text"]');
const telephoneUser = document.querySelector('input[type="tel"]');
const selectRegions = document.getElementById('regions');
const selectCities = document.getElementById('cities');
const checkboxPrefer = document.querySelector('input[type="checkbox"]');
const buttonSubmit = document.querySelector('input[type="Submit"]');
const citiesOfRegion = {
    'center': ['', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
    'North': ['', 'Chernihiv', 'Sumy', 'Not in the list'],
    'East': ['', 'Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
    'South': ['', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
    'West': ['', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};

function isValidInputName() {
    const valueInputName =  inputNameUser.value.match(/\S+/g);

    if(valueInputName){
        return valueInputName.length > 1 && valueInputName.length < 4;
    }
    return false;
}

function isValidInputTel() {
    return  /^\+?3?8?(0\d{9})$/.test(telephoneUser.value);
}

function isValidForm() {
    if(checkboxPrefer.checked && isValidInputName()){
        buttonSubmit.disabled = false;
        return;
    }

    if (isValidInputName() &&
        isValidInputTel() &&
        selectRegions.value  &&
        (selectCities.value|| selectRegions.value==='Kyiv')) {
        buttonSubmit.disabled = false;
        return;
    }
    buttonSubmit.disabled = true;
}

function checkInputName() {
    this.classList.remove('backgroundGreen');
    this.classList.remove('backgroundRed');
    this.addEventListener('keyup', function () {
        isValidForm();
    });
     this.addEventListener('blur', function () {
       if(isValidInputName()) {
           this.classList.add('backgroundGreen');
           return;
       }
         this.classList.add('backgroundRed');
     })
}

function checkInputTelephone() {
    this.classList.remove('backgroundRed');
    this.classList.remove('backgroundGreen');
    this.addEventListener('keyup', function () {
        isValidForm();
    });
    this.addEventListener('blur', function () {
        if(isValidInputTel()) {
            this.classList.add('backgroundGreen');
            return;
        }
        this.classList.add('backgroundRed');
    })
}

function showSelectCities() {
    const valueSelectRegions = this.value;
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

function hideDomElements() {
    telephoneUser.classList.toggle('hideElement');
    selectRegions.classList.toggle('hideElement');
    selectCities.classList.toggle('hideElement');
    isValidForm();
}

function getValueSelectCities() {
    isValidForm();
}

inputNameUser.addEventListener('focus', checkInputName);
telephoneUser.addEventListener('focus', checkInputTelephone);
selectRegions.addEventListener('click', showSelectCities);
checkboxPrefer.addEventListener('click', hideDomElements);
selectCities.addEventListener('click', getValueSelectCities);
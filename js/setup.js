'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomWizardDataObj = function (namesArr, surnamesArr, coatColorsArr, eyesColorsArr) {
  return {
    fullName: namesArr[getRandomNumber(0, namesArr.length - 1)] + ' ' + surnamesArr[getRandomNumber(0, surnamesArr.length - 1)],
    coat: coatColorsArr[getRandomNumber(0, coatColorsArr.length - 1)],
    eyes: eyesColorsArr[getRandomNumber(0, eyesColorsArr.length - 1)]
  };
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var getRandomWizardsNodeArr = function () {
  var randomWizardsNodeArr = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    randomWizardsNodeArr.push(renderWizard(getRandomWizardDataObj(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS)));
  }

  return randomWizardsNodeArr;
};

var randomWizardsNodeArr = getRandomWizardsNodeArr();
var fragment = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  fragment.appendChild(randomWizardsNodeArr[i]);
}
similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

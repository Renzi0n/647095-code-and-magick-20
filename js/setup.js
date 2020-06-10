'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var NUMBER_OF_WIZARDS = 4;
var ELEMENTS_COLORS = {
  coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyes: ['black', 'red', 'blue', 'yellow', 'green'],
  fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var userDialogNode = document.querySelector('.setup');

var similarListNode = userDialogNode.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var userDialogOpenNode = document.querySelector('.setup-open');
var userDialogCloseNode = document.querySelector('.setup-close');

var formNode = document.querySelector('.setup-wizard-form');
var userNameInputNode = document.querySelector('.setup-user-name');

var userNodes = {
  coat: document.querySelector('.setup-wizard .wizard-coat'),
  eyes: document.querySelector('.setup-wizard .wizard-eyes'),
  fireball: document.querySelector('.setup-fireball-wrap')
};


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
    randomWizardsNodeArr.push(renderWizard(getRandomWizardDataObj(NAMES, SURNAMES, ELEMENTS_COLORS.coat, ELEMENTS_COLORS.eyes)));
  }

  return randomWizardsNodeArr;
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== userNameInputNode) {
    evt.preventDefault();
    closePopup();
  }
};

var onUserCoatClick = function () {
  var coatColor = ELEMENTS_COLORS.coat[getRandomNumber(0, ELEMENTS_COLORS.coat.length - 1)];

  userNodes.coat.style.fill = coatColor;
  formNode['coat-color'].value = coatColor;
};

var onUserEyesClick = function () {
  var eyesColor = ELEMENTS_COLORS.eyes[getRandomNumber(0, ELEMENTS_COLORS.eyes.length - 1)];

  userNodes.eyes.style.fill = eyesColor;
  formNode['eyes-color'].value = eyesColor;
};

var onUserFireballClick = function () {
  var fireballColor = ELEMENTS_COLORS.fireball[getRandomNumber(0, ELEMENTS_COLORS.fireball.length - 1)];

  userNodes.fireball.style.backgroundColor = fireballColor;
  formNode['fireball-color'].value = fireballColor;
};

var openPopup = function () {
  userDialogNode.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  userNodes.coat.addEventListener('click', onUserCoatClick);
  userNodes.eyes.addEventListener('click', onUserEyesClick);
  userNodes.fireball.addEventListener('click', onUserFireballClick);
};

var closePopup = function () {
  userDialogNode.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  userNodes.coat.removeEventListener('click', onUserCoatClick);
  userNodes.eyes.removeEventListener('click', onUserEyesClick);
  userNodes.fireball.removeEventListener('click', onUserFireballClick);
};

var randomWizardsNodeArr = getRandomWizardsNodeArr();

var fragment = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  fragment.appendChild(randomWizardsNodeArr[i]);
}
similarListNode.appendChild(fragment);

userDialogNode.querySelector('.setup-similar').classList.remove('hidden');

userDialogOpenNode.addEventListener('click', openPopup);

userDialogOpenNode.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

userDialogCloseNode.addEventListener('click', closePopup);

userDialogCloseNode.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});


'use strict';

var NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
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

var getRandomWizard = function (name, surname, coatColor, eyesColor) {
  var wizardData = {
    fullName: name[getRandomNumber(0, name.length - 1)] + ' ' + surname[getRandomNumber(0, surname.length - 1)],
    coat: coatColor[getRandomNumber(0, coatColor.length - 1)],
    eyes: eyesColor[getRandomNumber(0, eyesColor.length - 1)]
  };

  return wizardData;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var getRenderedRandomWizards = function () {
  var renderedRandomWizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var randomWizard = getRandomWizard(NAME, SURNAME, COAT_COLOR, EYES_COLOR);
    renderedRandomWizards[i] = renderWizard(randomWizard);
  }

  return renderedRandomWizards;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  fragment.appendChild(getRenderedRandomWizards()[i]);
}
similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

'use strict';

(function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var NUMBER_OF_WIZARDS = 4;
  var ELEMENTS_COLORS = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var similarListNode = window.dialog.similarListNode;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();

  var getRandomWizardDataObj = function (namesArr, surnamesArr, coatColorsArr, eyesColorsArr) {
    return {
      fullName: namesArr[window.service.getRandomNumber(0, namesArr.length - 1)] + ' ' + surnamesArr[window.service.getRandomNumber(0, surnamesArr.length - 1)],
      coat: coatColorsArr[window.service.getRandomNumber(0, coatColorsArr.length - 1)],
      eyes: eyesColorsArr[window.service.getRandomNumber(0, eyesColorsArr.length - 1)]
    };
  };

  var getRandomWizardsNodeArr = function () {
    var randomWizardsNodeArr = [];
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      randomWizardsNodeArr.push(renderWizard(getRandomWizardDataObj(NAMES, SURNAMES, ELEMENTS_COLORS.coat, ELEMENTS_COLORS.eyes)));
    }

    return randomWizardsNodeArr;
  };


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

    return wizardElement;
  };

  var randomWizardsNodeArr = getRandomWizardsNodeArr();

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    fragment.appendChild(randomWizardsNodeArr[i]);
  }
  similarListNode.appendChild(fragment);

  window.dialog.userDialogNode.querySelector('.setup-similar').classList.remove('hidden');

  window.dialogSimilarWizards = {
    ELEMENTS_COLORS: ELEMENTS_COLORS
  };

})();

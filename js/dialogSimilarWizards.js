'use strict';

(function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var ELEMENTS_COLORS = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var similarListNode = window.dialog.similarListNode;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.dialogSimilarWizards = {
    ELEMENTS_COLORS: ELEMENTS_COLORS,

    renderWizards: function (wizardsNodeArr) {
      window.dialog.similarListNode.innerHTML = '';
      window.dialog.userDialogNode.querySelector('.setup-similar').classList.remove('hidden');

      for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
        fragment.appendChild(renderWizard(wizardsNodeArr[i]));
      }
      similarListNode.appendChild(fragment);
    }
  };

})();

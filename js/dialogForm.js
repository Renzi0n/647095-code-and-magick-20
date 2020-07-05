'use strict';

(function () {

  var formNode = window.dialog.formNode;
  var userNodes = {
    coat: formNode.querySelector('.setup-wizard .wizard-coat'),
    eyes: formNode.querySelector('.setup-wizard .wizard-eyes'),
    fireball: formNode.querySelector('.setup-fireball-wrap')
  };

  window.dialogForm = {
    formNode: formNode,
    userNodes: userNodes,

    onUserCoatClick: function () {
      window.coatColor = window.dialogSimilarWizards.ELEMENTS_COLORS.coat[window.utils.getRandomNumber(0, window.dialogSimilarWizards.ELEMENTS_COLORS.coat.length - 1)];

      userNodes.coat.style.fill = window.coatColor;
      formNode['coat-color'].value = window.coatColor;

      var updateWizards = window.debounce(function () {
        window.sortWizards();
      });

      updateWizards();
    },
    onUserEyesClick: function () {
      window.eyesColor = window.dialogSimilarWizards.ELEMENTS_COLORS.eyes[window.utils.getRandomNumber(0, window.dialogSimilarWizards.ELEMENTS_COLORS.eyes.length - 1)];

      userNodes.eyes.style.fill = window.eyesColor;
      formNode['eyes-color'].value = window.eyesColor;

      var updateWizards = window.debounce(function () {
        window.sortWizards();
      });

      updateWizards();
    },
    onUserFireballClick: function () {
      var fireballColor = window.dialogSimilarWizards.ELEMENTS_COLORS.fireball[window.utils.getRandomNumber(0, window.dialogSimilarWizards.ELEMENTS_COLORS.fireball.length - 1)];

      userNodes.fireball.style.backgroundColor = fireballColor;
      formNode['fireball-color'].value = fireballColor;
    }
  };
})();

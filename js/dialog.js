'use strict';

(function () {

  var userDialogNode = document.querySelector('.setup');

  var userDialogCloseNode = userDialogNode.querySelector('.setup-close');
  var userDialogOpenNode = document.querySelector('.setup-open');

  var formNode = userDialogNode.querySelector('.setup-wizard-form');

  var similarListNode = userDialogNode.querySelector('.setup-similar-list');

  var dialogHandleNode = userDialogNode.querySelector('.upload');

  var primaryX;
  var primaryY;


  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== formNode.username) {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    primaryX = userDialogNode.style.left;
    primaryY = userDialogNode.style.top;
    userDialogNode.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    window.dialogForm.userNodes.coat.addEventListener('click', window.dialogForm.onUserCoatClick);
    window.dialogForm.userNodes.eyes.addEventListener('click', window.dialogForm.onUserEyesClick);
    window.dialogForm.userNodes.fireball.addEventListener('click', window.dialogForm.onUserFireballClick);
  };

  var closePopup = function () {
    userDialogNode.classList.add('hidden');

    userDialogNode.style.left = primaryX;
    userDialogNode.style.top = primaryY;

    document.removeEventListener('keydown', onPopupEscPress);
    window.dialogForm.userNodes.coat.removeEventListener('click', window.dialogForm.onUserCoatClick);
    window.dialogForm.userNodes.eyes.removeEventListener('click', window.dialogForm.onUserEyesClick);
    window.dialogForm.userNodes.fireball.removeEventListener('click', window.dialogForm.onUserFireballClick);
  };

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

  window.dialog = {
    userDialogNode: userDialogNode,
    formNode: formNode,
    similarListNode: similarListNode,
    dialogHandleNode: dialogHandleNode
  };

})();

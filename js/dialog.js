'use strict';

(function () {

  var HANDLER_CLOSE_TIMEOUT = 5000;

  var userDialogNode = document.querySelector('.setup');

  var statusHandlerNode = document.querySelector('.status-handler');

  var userDialogCloseNode = userDialogNode.querySelector('.setup-close');
  var userDialogOpenNode = document.querySelector('.setup-open');

  var formNode = userDialogNode.querySelector('.setup-wizard-form');

  var similarListNode = userDialogNode.querySelector('.setup-similar-list');

  var dialogHandleNode = userDialogNode.querySelector('.upload');

  var primaryX;
  var primaryY;


  var setStatusHandler = function (message, isError) {
    statusHandlerNode.classList.add(isError ? 'status-handler--onError' : 'status-handler--onLoad');
    statusHandlerNode.textContent = message;
    statusHandlerNode.classList.remove('hidden');

    setTimeout(function () {
      statusHandlerNode.classList.add('hidden');
      statusHandlerNode.classList.remove(isError ? 'status-handler--onError' : 'status-handler--onLoad');
    }, HANDLER_CLOSE_TIMEOUT);
  };

  var onLoadWizards = function (data) {
    window.wizardsData = data.slice();
    window.sortWizards();
  };

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

    window.dialogWidth = window.dialog.userDialogNode.clientWidth;

    document.addEventListener('keydown', onPopupEscPress);
    window.dialogForm.userNodes.coat.addEventListener('click', window.dialogForm.onUserCoatClick);
    window.dialogForm.userNodes.eyes.addEventListener('click', window.dialogForm.onUserEyesClick);
    window.dialogForm.userNodes.fireball.addEventListener('click', window.dialogForm.onUserFireballClick);

    window.backend.load(onLoadWizards, setStatusHandler);
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

  var onLoadFormData = function (message, isError) {
    setStatusHandler(message, isError);
    closePopup();
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

  formNode.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formNode), onLoadFormData, setStatusHandler);
    evt.preventDefault();
  });

  window.dialog = {
    userDialogNode: userDialogNode,
    formNode: formNode,
    similarListNode: similarListNode,
    dialogHandleNode: dialogHandleNode
  };

})();

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


  var setStatusHandler = function (message, isError) {
    var node = document.createElement('div');
    var removeNode = function () {
      node.remove();
    };
    node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    node.style.backgroundColor = isError ? 'red' : 'LawnGreen';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(removeNode, 5000);
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

    document.addEventListener('keydown', onPopupEscPress);
    window.dialogForm.userNodes.coat.addEventListener('click', window.dialogForm.onUserCoatClick);
    window.dialogForm.userNodes.eyes.addEventListener('click', window.dialogForm.onUserEyesClick);
    window.dialogForm.userNodes.fireball.addEventListener('click', window.dialogForm.onUserFireballClick);

    window.backend.load(window.dialogSimilarWizards.onWizardsLoad, setStatusHandler);
  };

  var closePopup = function () {
    userDialogNode.classList.add('hidden');

    userDialogNode.style.left = primaryX;
    userDialogNode.style.top = primaryY;

    document.removeEventListener('keydown', onPopupEscPress);
    window.dialogForm.userNodes.coat.removeEventListener('click', window.dialogForm.onUserCoatClick);
    window.dialogForm.userNodes.eyes.removeEventListener('click', window.dialogForm.onUserEyesClick);
    window.dialogForm.userNodes.fireball.removeEventListener('click', window.dialogForm.onUserFireballClick);

    while (similarListNode.firstChild) {
      similarListNode.removeChild(similarListNode.firstChild);
    }
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

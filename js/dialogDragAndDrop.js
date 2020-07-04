'use strict';
(function () {

  window.dialog.dialogHandleNode.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dialogMove = {
      x: {
        min: window.dialogWidth / 2,
        max: document.documentElement.clientWidth - window.dialogWidth / 2
      },
      y: {
        min: 0,
        max: document.documentElement.clientHeight / 2
      }
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.dialog.userDialogNode.style.left = (window.dialog.userDialogNode.offsetLeft - shift.x) + 'px';
      window.dialog.userDialogNode.style.top = (window.dialog.userDialogNode.offsetTop - shift.y) + 'px';

      var userDialogNodeX = window.dialog.userDialogNode.offsetLeft;
      var userDialogNodeY = window.dialog.userDialogNode.offsetTop;

      if (userDialogNodeX < dialogMove.x.min) {
        window.dialog.userDialogNode.style.left = dialogMove.x.min + 'px';
      } else if (userDialogNodeX > dialogMove.x.max) {
        window.dialog.userDialogNode.style.left = dialogMove.x.max + 'px';
      }

      if (userDialogNodeY < dialogMove.y.min) {
        window.dialog.userDialogNode.style.top = dialogMove.y.min + 'px';
      } else if (userDialogNodeY > dialogMove.y.max) {
        window.dialog.userDialogNode.style.top = dialogMove.y.max + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        window.dialog.dialogHandleNode.addEventListener('click', function (clickEvt) {
          clickEvt.preventDefault();
        }, {once: true});
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

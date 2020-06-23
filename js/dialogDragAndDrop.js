'use strict';
(function () {

  var DIALOG_MOVE = {
    x: {
      min: 400,
      max: 1200
    },
    y: {
      min: 0,
      max: 500
    }
  };

  window.dialog.dialogHandleNode.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      if (userDialogNodeX < DIALOG_MOVE.x.min) {
        window.dialog.userDialogNode.style.left = DIALOG_MOVE.x.min + 'px';
      } else if (userDialogNodeX > DIALOG_MOVE.x.max) {
        window.dialog.userDialogNode.style.left = DIALOG_MOVE.x.max + 'px';
      }

      if (userDialogNodeY < DIALOG_MOVE.y.min) {
        window.dialog.userDialogNode.style.top = DIALOG_MOVE.y.min + 'px';
      } else if (userDialogNodeY > DIALOG_MOVE.y.max) {
        window.dialog.userDialogNode.style.top = DIALOG_MOVE.y.max + 'px';
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

'use strict';

(function () {

  window.service = {
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
  };

})();

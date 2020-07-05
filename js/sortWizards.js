'use strict';

(function () {

  window.coatColor = 'rgb(101, 137, 164)';
  window.eyesColor = 'black';

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };


  window.sortWizards = function () {
    window.dialogSimilarWizards.renderWizards(
        window.wizardsData.slice().sort(function (left, right) {
          var rankDiff = getRank(right) - getRank(left);
          if (rankDiff === 0) {
            rankDiff = namesComparator(left.name, right.name);
          }

          return rankDiff;
        })
    );
  };

})();

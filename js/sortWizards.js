'use strict';

(function () {

  window.coatColor = 'rgb(101, 137, 164)';
  window.eyesColor = 'black';

  var getRank = function (wizard) { // функция сравнения для вычисления приоритета похожего мага
    var rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) { // функция сравнения для сортировки по алфавиту
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };


  window.sortWizards = function () {
    window.dialogSimilarWizards.renderWizards( // Передаем для рендера массив данных
        window.wizardsData.slice() // Делаем копию массива
        .sort(function (left, right) { // Сортировка массива
          var rankDiff = getRank(right) - getRank(left); // Сравнение соседних магов по уровню

          if (rankDiff === 0) {
            rankDiff = namesComparator(left.name, right.name); // Сравнение одинаковых магов по алфавиту
          }

          return rankDiff;
        })
    );
  };

})();

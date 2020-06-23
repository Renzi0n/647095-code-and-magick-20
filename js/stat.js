'use strict';

(function () {

  var GAP = 10;
  var TEXT_WIDTH = 40;
  var BAR_WIDTH = 40;
  var FONT = {
    gap: 50,
    size: 16
  };
  var CLOUD = {
    width: 420,
    height: 270,
    x: 100,
    y: 10
  };
  var USER = {
    name: 'Вы',
    color: 'rgba(255, 0, 0, 1)'
  };

  var barHeight = CLOUD.height - FONT.size * 3 - GAP * 2;
  var alignX = CLOUD.x + CLOUD.width / 2 - BAR_WIDTH * 2 - FONT.gap * 1.5;

  var getGapCounter = function (i) {
    return (FONT.gap + TEXT_WIDTH) * i;
  };

  var getRandomBlueColor = function () {
    var randomSaturation = window.utils.getRandomNumber(1, 100) + '%';
    return 'hsl(240, ' + randomSaturation + ', 50%)';
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    var maxTime = getMaxElement(times);

    var getBarHeightPlayer = function (i) {
      return (barHeight * times[i]) / maxTime;
    };

    renderCloud(ctx, CLOUD.x + GAP, CLOUD.y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD.x, CLOUD.y, '#fff');

    ctx.fillStyle = '#000';

    ctx.font = FONT.size + 'px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', alignX, CLOUD.y + GAP);
    ctx.fillText('Список результатов:', alignX, CLOUD.y + GAP + FONT.size);

    for (var i = 0; i < players.length; i++) {
      var roundedTime = Math.round(times[i]);

      ctx.fillStyle = '#000';

      ctx.fillText(players[i], alignX + getGapCounter(i), CLOUD.height - GAP);
      ctx.fillText(roundedTime, alignX + getGapCounter(i), CLOUD.height - FONT.size + GAP - getBarHeightPlayer(i));

      ctx.fillStyle = players[i] === USER.name ? USER.color : getRandomBlueColor();

      ctx.fillRect(alignX + getGapCounter(i), CLOUD.y + GAP + FONT.size * 2 + barHeight, BAR_WIDTH, -getBarHeightPlayer(i) + FONT.size + GAP);
    }
  };

})();

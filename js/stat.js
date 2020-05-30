'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 50;
var FONT_SIZE = 16;
var TEXT_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - FONT_SIZE * 3 - GAP - GAP;
var BAR_WIDTH = 40;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = FONT_SIZE + "px PT Mono";
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP)
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_SIZE)

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';

    ctx.fillText(players[i], CLOUD_X + GAP + (FONT_GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - GAP);

    var roundedTime = Math.round(times[i]);
    ctx.fillText(roundedTime, CLOUD_X + GAP + (FONT_GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - FONT_SIZE + GAP - ((barHeight * times[i]) / maxTime));

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomSaturation = getRandomNumber(1, 100) + '%';
      ctx.fillStyle = 'hsla(240, ' + randomSaturation + ', 50%)';
    }

    ctx.fillRect(CLOUD_X + GAP + (FONT_GAP + TEXT_WIDTH) * i, CLOUD_Y + GAP + FONT_SIZE * 2 + barHeight, BAR_WIDTH, -((barHeight * times[i]) / maxTime) + FONT_SIZE + GAP);
  }
};

'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  window.fileInputNode = document.querySelector('.upload input[type=file]');

  window.onFileInputNodeChange = function () {
    var choosenFile = window.fileInputNode.files[0];
    var choosenFileName = choosenFile.name.toLowerCase(); // название выбранного файла в нижнем регистре

    var matches = FILE_TYPES.some(function (it) { // проверяем название выбранного файла на присутствие в нем правильного расширения
      return choosenFileName.endsWith(it);
    });

    if (matches) {
      var fileReader = new FileReader(); // делаем себе копию файл ридера

      fileReader.addEventListener('load', function () { // вешаем обработчик на загрузку в него файлов
        document.querySelector('.setup-user-pic').src = fileReader.result; // если загрузка была, то в аватар загружаем нашу картинку
      });

      fileReader.readAsDataURL(choosenFile); // говорим файл ридеру, как читать выбранный файл
    }
  };

})();

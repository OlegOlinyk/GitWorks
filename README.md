#Учебная сборка Loftschool (выпускной проект №1) 
Олинык Олег Дмиртиевич

1.Добавил  файл таск copy.font.js в котором задача copy:font переносит шрифты
2.Добавил файл sprite.png.js в котором задача sprite:png запускает последовательно три таска:
   - sprite-generate:png (генерацыя спарайтов),
   - copy:sprite-img ( перемещакт графический файл в папку /images),
   - copy:sprite-scss (перемещает файл .scss в папку /style).
3.В файл copy.image.js в таске copy:image запретил копирования папки с не сгнерироваными спрайтами.

Stack:
 - Gulp 4.0
 
Getting started:

1. clone this repo
2. cd path/to/
3. npm install gulpjs/gulp-cli -g  // Install the latest Gulp CLI tools globally
4. npm install
6. run "gulp" command to start

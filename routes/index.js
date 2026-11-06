// routes/index.js
const noteRoutes = require('./routes.js');

module.exports = function(app, db) {
    noteRoutes(app, db);
    // Тут позже будут и другие обработчики маршрутов
};
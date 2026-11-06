// websocket.js
const http = require('http');
const sockjs = require('sockjs');

// создаём сокет
const echo = sockjs.createServer({ prefix:'/echo' });

// установка соединения
echo.on('connection', function(conn) {
    setInterval( function() {
        // отправка времени
        conn.write(new Date().toLocaleTimeString());
    }, 1000); // каждую секунду

    // принимаем сообщения
    conn.on('data', function(message) {
        console.log(message);
    });
    
    conn.on('close', function() {});
});

// создаем http-сервер, на который вешаем сокет
const server = http.createServer();
echo.installHandlers(server, { prefix:'/echo' });
server.listen(9999, '0.0.0.0');
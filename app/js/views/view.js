'use strict';

APP.view = (function(window){

    var HEIGHT=25,
        WIDTH=25,
        OFFSET=2,
        N=APP.config.NUM_CELLS,
        COLOR_SNAKE="yellow",
        COLOR_FROG="green",
        COLOR_CELL="black",
        COLOR_BACKGROUND_RUN_GAME="lightgreen",
        COLOR_BACKGROUND_GAME_OVER="lightgreen",
        COLOR_BACKGROUND_START_GAME="lightgreen",
        RADIUS=10,
        _canvas=window.document.getElementById('gamePane'),
        _score=window.document.getElementById('score'),
        _context=_canvas.getContext('2d');

    var drawNewGame=function(){
        $('body').removeClass("gameOver runGame pause");
        $('body').addClass('welcome');
    };

    var drawStopGame=function(){
        $('body').removeClass("welcome runGame pause");
        $('body').addClass('gameOver');
    };

    var drawRunGame=function(){
        $('body').removeClass("welcome gameOver pause");
        $('body').addClass('runGame');
    };

    var drawPauseGame=function(){
        $('body').removeClass("welcome gameOver runGame");
        $('body').addClass('pause');
    };

    var drawField = function(){
        var i=0;
        var j=0;
        for(i=0;i<N;i++) {
            j=0;
            for (j = 0; j < N; j++) {
                _drawCell(j * WIDTH + j * OFFSET, i * HEIGHT + i * OFFSET, COLOR_CELL);
            }
        }
    };
    
    var drawSnake = function(snake){
        var body=snake.getBody();
        var i=0;
        for(i=0;i<body.length;i++){
            _drawBodySnake(body[i],COLOR_SNAKE);
        }
    };
    
    var drawFrogs= function(frogs){
        var i=0;
        for(i=0;i<frogs.length;i++){
            _drawFrog(frogs[i],COLOR_FROG);
        }
    };

    var drawScore=function(score){
        _score.innerHTML=score;
    };

    var _drawCell= function(x,y, color){
        _context.fillStyle=color;
        _context.fillRect(x, y, WIDTH, HEIGHT);
    };
    
    var _drawFrog = function(frog,color){
        var x=frog.x;
        var y=frog.y;
        _drawCycle(x,y,color)
    };

    var _drawBodySnake=function(part,color){
        var x=part.x;
        var y=part.y;
        _drawCycle(x,y,color)
    };

    var _drawCycle=function(x,y,color){
        var _x=x*WIDTH+x*OFFSET+WIDTH/2;
        var _y=y*HEIGHT+y*OFFSET+HEIGHT/2;
        _context.strokeStyle="black";
        _context.fillStyle = color;
        _context.beginPath();
        _context.arc(_x,_y,RADIUS,0,Math.PI*2,true);
        _context.closePath();
        _context.stroke();
        _context.fill();
    };
    
    return {
        drawField: drawField,
        drawSnake: drawSnake,
        drawFrogs: drawFrogs,
        drawScore: drawScore,
        drawNewGame: drawNewGame,
        drawRunGame: drawRunGame,
        drawStopGame: drawStopGame,
        drawPauseGame: drawPauseGame
    };
})(window || {});
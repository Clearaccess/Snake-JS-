'use strict';

APP.controller = (function (model, view, win) {
    var _model = model,
        _view = view,
        Snake = APP.Snake,
        Frog = APP.Frog,
        NUM_CELLS = APP.config.NUM_CELLS,
        NUM_FROGS = APP.config.NUM_FROGS,
        PAUSE = 2,
        STOP = 3,
        RUNNABLE = 1,
        NON_STATE = 0,
        SPACE_KEY=32,
        LEFT_KEY=97,
        RIGHT_KEY=100,
        TIME=750,
        _frogs,
        _snake,
        _score,
        _field = [],
        _stateGame=NON_STATE;

    var _newGame=function(){
        _stateGame = NON_STATE;
        _view.drawNewGame();
        _init();
        _view.drawField();
        _view.drawSnake(_snake);
        _view.drawFrogs(_frogs);
    };

    var startGame = function () {
        _stateGame = RUNNABLE;
        _view.drawRunGame();
        _run();
    };

    var stopGame = function () {
        _stateGame = STOP;
        _view.drawStopGame();
    };

    var pauseGame=function(){
        _stateGame = PAUSE;
        _view.drawPauseGame();
    };

    var resumeGame=function(){
        _stateGame = RUNNABLE;
        _view.drawRunGame();
        _run();
    };

    var _run = function () {
        var timerId = setTimeout(function tick() {
            if (_stateGame == STOP) {
                clearTimeout(timerId);
                return;
            }

            if (_stateGame == PAUSE) {
                clearTimeout(timerId);
                return;
            }

            _defineGameSituation();
            _snake.move();
            _view.drawField();
            _view.drawSnake(_snake);
            _view.drawFrogs(_frogs);
            timerId = setTimeout(tick, TIME);
        }, TIME);
    };

    var _subscribeEvents = function () {
        //left - A
        //right - D
        //space - start or stop
        win.document.addEventListener("keypress", _handKeys);
    };

    var _handKeys = function (event) {
        if (event.keyCode == SPACE_KEY) {
            if (_stateGame == RUNNABLE) {
                pauseGame();
            } else if (_stateGame == PAUSE) {
                resumeGame();
            } else if (_stateGame == NON_STATE) {
                startGame();
            } else if (_stateGame == STOP) {
                _newGame();
            }
        }

        if (event.keyCode == LEFT_KEY && _stateGame==RUNNABLE) {
            _snake.turnLeft();
        } else if (event.keyCode == RIGHT_KEY && _stateGame==RUNNABLE) {
            _snake.turnRight();
        }

    };

    var _init = function () {
        _initField();
        _initScore();
        _model.init(_field);
        _frogs = _model.getFrogs();
        _snake = _model.getSnake();
        _initFrogs();
        _score = 0;
    };

    var _initFrogs = function () {
        var i = 0,
            newFrog = {};

        for (i = 0; i < NUM_FROGS; i++) {
            newFrog = _placeFrog();
            _frogs.push(newFrog);
        }
    };

    var _initField = function () {
        var i = 0;

        for (i = 0; i < NUM_CELLS; i++) {
            _field.push(_newArray(NUM_CELLS))
        }
    };

    var _initScore = function () {
        _score = 0;
        _view.drawScore(_score);
    };

    var _updateScore = function (value) {
        _score += value;
        _view.drawScore(_score);
    };

    var _placeFrog = function () {
        var x = _getRandomNumber(0, NUM_CELLS),
            y = _getRandomNumber(0, NUM_CELLS),
            newFrog = {};

        while (_isBusy(x, y)) {
            x = _getRandomNumber(0, NUM_CELLS);
            y = _getRandomNumber(0, NUM_CELLS);
        }

        newFrog = new Frog(x, y);
        _field[x][y] = 2;
        return newFrog;
    };

    var _isBusy = function (x, y) {
        var i = 0,
            len = _frogs.length;

        for (i = 0; i < len; i++) {
            if (_field[x][y] == 1
                ||
                _field[x][y] == 2) {
                return true;
            }
        }

        return false;
    };

    var _getRandomNumber = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    var _newArray = function (size) {
        var array = [],
            i = 0;

        for (i = 0; i < size; i++) {
            array.push(0);
        }

        return array;
    };
    
    var _defineGameSituation=function(){
        var i=0,
            futurePosition=_snake.moveTest();

        if(_eatSnakeSelf(futurePosition)){
            stopGame();
            return;
        }

        if(_eatSnakeFrog(futurePosition)){
            _snake.grow();
            _updateScore(1);
        }

    };

    var _eatSnakeSelf=function(pos){
        var body=_snake.getBody(),
            i=0,
            len=body.length;

        for(i=0;i<len;i++){
            if(body[i].getX()==pos.getX() && body[i].getY()==pos.getY()){
                return true;
            }
        }

        return false;
    };

    var _eatSnakeFrog=function(pos){
        var i=0,
            len=_frogs.length,
            newFrog={};

        for(i=0;i<len;i++){
            if(_frogs[i].getX()==pos.getX() && _frogs[i].getY()==pos.getY()){
                newFrog=_placeFrog();
                _frogs.splice(i,1);
                _frogs.push(newFrog);
                return true;
            }
        }

        return false;
    };

    _subscribeEvents();
    _newGame();

    return {
        startGame: startGame,
        stopGame: stopGame,
        pauseGame: pauseGame
    };
})(APP.model || {}, APP.view || {}, window || {});
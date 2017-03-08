'use strict';

APP.model=(function(){
    var Snake=APP.Snake,
        Frog=APP.Frog,
        snake,
        frogs;
    
    var init=function(field){
        snake=new Snake(field);
        frogs=[];
    };

    var getSnake=function(){
        return snake;
    };

    var getFrogs=function(){
        return frogs;
    };

    return {
        init: init,
        getSnake: getSnake,
        getFrogs: getFrogs
    };
})();
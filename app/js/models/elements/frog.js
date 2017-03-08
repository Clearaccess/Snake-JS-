'use strict';

APP.Frog=(function (){
    var Frog;
    
    Frog=function(x,y){
        this.x=x;
        this.y=y;
    };

    Frog.prototype={
        getX: function(){
            return this.x;
        },
        getY: function(){
            return this.y;
        }
    };
    
    return Frog;
})();
'use strict';

APP.Part=(function (){
    
    var Part;
    
    Part=function(x,y){
        this.x=x;
        this.y=y;
    };

    Part.prototype={
        getX: function(){
            return this.x;
        },
        getY: function(){
            return this.y;
        },
        setX: function (x) {
            this.x=x;
        },
        setY: function(y){
            this.y=y;
        }
    };

    return Part;
})();
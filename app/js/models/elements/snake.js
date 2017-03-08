'use strict';

APP.Snake=(function (){
    var LENGTH=5,
        UP=0,
        LEFT=1,
        DOWN=2,
        RIGHT=3,
        NUM_CELLS=APP.config.NUM_CELLS,
        Part=APP.Part,
        Snake;

    var getBoby=function(){
        return this.body;
    };
    
    var grow=function(){
        var x=this.body[this.body.length-1].getX();
        var y=this.body[this.body.length-1].getY();
        this.isGrow=true;
        var newPart=new Part(x,y);
        this.body.push(newPart);
    };
    
    var init=function(field){
        var i=0,
            body=[];

        for(i=0;i<LENGTH;i++){
            body.push(_createPart(LENGTH-i-1,0));
            field[body[i].getX()][body[i].getY()]=1;
        }

        return body;
    };

    var turnLeft=function(){
        if(!this.wasTurn) {
            this.direction += 1;
            if (this.direction > RIGHT) {
                this.direction = UP;
            }
            this.wasTurn=true;
        }
    };

    var turnRight=function(){
        if(!this.wasTurn) {
            this.direction -= 1;
            if (this.direction < UP) {
                this.direction = RIGHT;
            }
            this.wasTurn=true;
        }
    };

    var move=function(){

        var body=this.body,
            i=0,
            j=0,
            len=this.body.length,
            head;

        for(i=len-1, j=len-2;i>0;i--,j--){
            if(this.isRise && i==len-1) {
                this.isRise=false;
                continue;
            } else {
                body[i].setX(body[j].getX());
                body[i].setY(body[j].getY());
            }
        }

        head=body[0];

        switch (this.direction){
            case UP: head.setY(head.getY()-1); break;
            case LEFT: head.setX(head.getX()-1); break;
            case DOWN: head.setY(head.getY()+1); break;
            case RIGHT: head.setX(head.getX()+1); break;
        }

        if(head.getX()<0){
            head.setX(NUM_CELLS-1);
        }
        if(head.getX()>NUM_CELLS-1){
            head.setX(0);
        }

        if(head.getY()<0){
            head.setY(NUM_CELLS-1);
        }
        if(head.getY()>NUM_CELLS-1){
            head.setY(0);
        }

        this.wasTurn=false;
    };

    var moveTest=function(){
        var head=new Part(this.body[0].getX(),this.body[0].getY());

        switch (this.direction){
            case UP: head.setY(head.getY()-1); break;
            case LEFT: head.setX(head.getX()-1); break;
            case DOWN: head.setY(head.getY()+1); break;
            case RIGHT: head.setX(head.getX()+1); break;
        }

        if(head.getX()<0){
            head.setX(NUM_CELLS-1);
        }
        if(head.getX()>NUM_CELLS-1){
            head.setX(0);
        }

        if(head.getY()<0){
            head.setY(NUM_CELLS-1);
        }
        if(head.getY()>NUM_CELLS-1){
            head.setY(0);
        }
        
        return head;
    };
    
    var _createPart=function(x,y){
        return new Part(x,y);
    };

    Snake=function(field){
        this.body=init(field);
        this.direction=RIGHT;
        this.wasTurn=false;
        this.isRise=false;
    };

    Snake.prototype={
        constructor: APP.Snake,
        getBody: getBoby,
        grow :grow,
        move : move,
        moveTest: moveTest,
        turnLeft: turnLeft,
        turnRight: turnRight
    };

    return Snake;
})();
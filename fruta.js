class Fruta{
    constructor(x,y){
        this.body = Bodies.circle(x,y,30);
        World.add(world, this.body);
    }
    show(){
        var pos = this.body.position;
        fill ("red")
        image (frutaImg,pos.x, pos.y, 60,60);
    }
}
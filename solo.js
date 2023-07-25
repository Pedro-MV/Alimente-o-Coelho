class Solo{
    constructor(){
        this.body = Bodies.rectangle(width/2, height-2, width, 20, {isStatic:true});
        World.add(world, this.body)
    }
    show(){
        var pos = this.body.position;
        rect(pos.x, pos.y, width, 20);
    }
}
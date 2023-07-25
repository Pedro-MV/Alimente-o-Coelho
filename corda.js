class Corda{
    constructor(pontoA, corpoB){
        this.sling = Constraint.create({
            pointA:pontoA, bodyB:corpoB, stiffness:0.01
        })
        this.pontoA = pontoA;
        World.add(world, this.sling);
    }
    criar(){
        
        var pos = this.sling.bodyB.position;
        push ()
        strokeWeight(5)
        stroke("yellow")
        line (this.pontoA.x,this.pontoA.y, pos.x,pos.y)
        pop ()
        
       
    }
}
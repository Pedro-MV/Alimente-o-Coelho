//namespacing
//criar uma variável de nome menor para referir a algo de nome maior
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint


//variaveis
var engine;
var world;
var corda, fundoImg, frutaImg;
var botao, coelho, coelhoImg;
var piscando, triste, comendo;
var somAr, somComer, somCorte, somFundo;
var balao, balao2, botaoMutar;
var botao2, botao3
var estrela1, estrela2, contador
var estrelaImg, vazio, umaEstrela, duasEstrelas

function preload(){
    coelhoImg = loadImage("coelho.png")
    frutaImg = loadImage("fruta.png");
    fundoImg = loadImage("planodefundo.png");
    estrelaImg = loadImage("estrela.png")
    vazio = loadImage("vazio.png")
    umaEstrela=loadImage("uma_estrela.png")
    duasEstrelas=loadImage("duas_estrelas.png")

    triste = loadAnimation("triste1.png","triste2.png","triste3.png");
    piscando = loadAnimation("piscar1.png","piscar2.png","piscar3.png");
    comendo = loadAnimation("comer1.png","comer2.png","comer3.png","comer4.png","comer5.png")


    
    comendo.looping = false;
    triste.looping = false; 
    //carregando os sons
    somAr = loadSound("ar.mp3");
    somComer = loadSound("comendo.mp3");
    somCorte = loadSound("corte.mp3");
    somFundo = loadSound("fundo.mp3");
}

function setup() {
    var isMobile = /Android|iPad|iPod|iPhone/i.test(navigator.userAgent)
    if(isMobile){
        canW = displayWidth
        canH = displayHeight
    }
    else{
        canW=windowWidth
        canH=windowHeight
    }
    createCanvas(canW, canH);

    piscando.frameDelay = 25;
    triste.frameDelay = 25;
    comendo.frameDelay = 25;
    if(!somFundo.isPlaying()){
        somFundo.setVolume(0.1)
        somFundo.play()
    }

    //cria o motor
    engine = Engine.create();
    world = engine.world;

    solo = new Solo();
    //criar um objeto da classe 
    fruta = new Fruta(width/3.5,height/2.8);
    corda = new Corda({x:width/2, y:height/12}, fruta.body)
    corda2 = new Corda({x:width/3.5, y:height/25}, fruta.body)
    corda3 = new Corda({x:width/6, y:height/12},fruta.body)

    coelho = createSprite(width/1.2,height/1.12);
  
    coelho.addAnimation("piscando",piscando);
    coelho.addAnimation("triste",triste);
    coelho.addAnimation("comendo",comendo);
    coelho.scale = 0.2;

    estrela1=createSprite(width/5,height/3)
    estrela1.addImage(estrelaImg)
    estrela1.scale=0.03

    estrela2=createSprite(width/3,height/5)
    estrela2.addImage(estrelaImg)
    estrela2.scale=0.03

    contador=createSprite(width/15,height/25)
    contador.addImage(vazio)
    contador.scale=0.3

    //cria a imagem de botão
    botao = createImg("cortar.png");
    botao.size(50, 50);
    botao.position(width/2-25,height/12-25);
    botao.mouseClicked(cortar);

    botao2 = createImg("cortar.png")
    botao2.size(50,50)
    botao2.position(width/3.5-25,height/25-25)
    botao2.mouseClicked(cortar2)

    botao3 = createImg("cortar.png")
    botao3.size(50,50)
    botao3.position(width/6-25,height/12-25)
    botao3.mouseClicked(cortar3)

    //desafio: criar a imagem de balão
    balao = createImg("balão.png");
    balao.size(100, 80);
    balao.position(width/700,height/2.8);
    balao.mouseClicked(soprar);

    balao2= createImg("balão.png")
    balao2.size(100,80)
    balao2.position(width/3.8,height/2)
    balao2.mouseClicked(soprarCima)

    ///desafio: criar o botão de mutar
    botaoMutar = createImg("mutar.png");
    botaoMutar.size(50, 50);
    botaoMutar.position(width/1.2,height/30);
    botaoMutar.mouseClicked(mutar);

    rectMode(CENTER);
    imageMode(CENTER)
   
}
function soprar(){
    somAr.play();
    Body.applyForce(fruta.body, {x:0,y:0}, {x:1, y:0})
}
function soprarCima(){
    somAr.play()
    Body.applyForce(fruta.body, {x:0,y:0}, {x:0,y:-1})
}

function cortar(){
    //remover a conexão do mundo
    World.remove(world, corda.sling)
    corda.sling = null;
    somCorte.play();
}
function cortar2(){
    World.remove(world,corda2.sling)
    corda2.sling = null
    somCorte.play()
}
function cortar3(){
    World.remove(world,corda3.sling)
    corda3.sling=null
    somCorte.play()
}

function mutar(){
    if(somFundo.isPlaying()){ 
        somFundo.stop()
    }else{
        somFundo.play()
    }
}
function draw() {

    background(0);    
    //atualiza o motor
    Engine.update(engine);
    image (fundoImg, width/2, height/2, width, height)
    //pinta o solo
    fill("green");
    

    if(corda.sling != undefined){
        corda.criar();
    }
    if(corda2.sling != undefined){
        corda2.criar()
    }
    if(corda3.sling!=undefined){
        corda3.criar()
    }
    
    drawSprites()
    if(fruta !== null){
        fruta.show();
        coletar (fruta,estrela1)
        coletar(fruta,estrela2)
        if(detectarColisao(fruta.body, coelho)){
            coelho.changeAnimation("comendo")
            somComer.play()
        }

    }

     if (estrela1.visible==false || estrela2.visible==false){
        contador.addImage(umaEstrela)
     }
     if (estrela1.visible==false && estrela2.visible==false){
        contador.addImage(duasEstrelas)
     }

     if (fruta!=null){
        var colisao=Matter.SAT.collides(fruta.body,solo.body)
        if(colisao.collided){
            coelho.changeAnimation("triste")
            somFundo.stop()
        }
     }
    
    
    
}

function detectarColisao(corpo, sprite){
    if(fruta!=null){
        //função que calcula a distância entre dois pontos
        var d = dist(corpo.position.x, corpo.position.y, sprite.position.x, sprite.position.y);
        if(d < 80){
            World.remove(world, fruta.body);
            fruta = null;
            return true;
        }else{
            return false;
        }
    }
    
}

function coletar(corpo, sprite){
    if (fruta!=null){
        var d = dist(fruta.body.position.x,fruta.body.position.y,sprite.position.x,sprite.position.y)
        if (d<50){
            sprite.visible=false
        }
    }
}
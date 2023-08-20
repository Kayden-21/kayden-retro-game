import { useEffect } from "react";
import "./gamePanel.css";
import kaydenFace from "../../assets/images/kaydenFace.png";
import marriage from "../../assets/images/marriage.png";
import brokenHome from "../../assets/images/brokenHome.png";

export type GamePanelProps = {
  className?: string;
  children?: React.ReactNode;
  startPosY: number;
  start: boolean;
  marriagePicPosition: number;
  linePositions: [number[],number[], number[],number[],number[]];
  speed: number;
};

export const GamePanel = ({ className, children, startPosY, start, marriagePicPosition, linePositions, speed }: GamePanelProps) => {

  useEffect(() => {
    createButtons();
    addListener();
    animateHorizontal();
  }, []);

  let posX = 0 // Initial X position
  let ended = false;
  let buttons : any[] = [];
  let userButtons: any[] = [];
  let verticalCounter = 0;

  function animateHorizontal(): boolean {
    if (!start) {
      ended = false;
      return true; // Exit the animation loop
    } 

    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx : any;
    if (canvas){
      ctx = canvas.getContext('2d');
    }

    let kayden = new Image();
    kayden.src = kaydenFace;
    
    drawCanvas(ctx, canvas);

    if (posX >= 1160) {
      ended = true;
      return true; 
    }

    if (shouldKaydenMoveVertical()){
      animateVertical();
      verticalCounter = 0;
      console.log(posX);
    }
    else{
      
    }

    posX += speed;
    ctx.drawImage(kayden, posX, startPosY, 124, 143); 

    requestAnimationFrame(animateHorizontal); 
    return false;
  }

  function shouldKaydenMoveVertical() : boolean{
    if (posX <= 30 && posX>28)
    return true;
    else
    return false;
  }

  function animateVertical() {

    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx : any;
    if (canvas){
      ctx = canvas.getContext('2d');
    }

    let kayden = new Image();
    kayden.src = kaydenFace;

    drawCanvas(ctx, canvas);

    ctx.drawImage(kayden, posX, startPosY, 124, 143); 
    
    startPosY += speed;
    verticalCounter += speed; 
    console.log(verticalCounter);
    console.log(posX);

    if (verticalCounter >= 116) {
      return; 
    }
    requestAnimationFrame(animateVertical); 
  }

  function drawCanvas(ctx: any, canvas: any) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHorizontalLines(ctx);
    drawVerticalLines(ctx);
    drawEndPictures(ctx);
    drawUserLines(ctx);
  }

  function drawUserLines(ctx: any){
    for (let button of userButtons){
      ctx.fillStyle = "black";
      ctx.fillRect(button.x, button.y, 5, 116);
    }
  }


  function createButtons(){
    buttons = [];
    let ypositions = [122, 242, 362]
    for (let pos of ypositions){
      for (let x = 650; x <= 1170; x += 10) {
        buttons.push({x: x, y:pos, width: 5, height: 116});
      }
    }
  }

  function addListener(){
    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx : any;
    if (canvas){
      ctx = canvas.getContext('2d');
    }

    canvas.addEventListener("click", function(event) {
      
      const mouseX = event.clientX - canvas.getBoundingClientRect().left - 20;
      const mouseY = event.clientY - canvas.getBoundingClientRect().top;
      
      buttons.forEach(button => {
      if (mouseX >= button.x - 4  &&
        mouseX <= button.x + 5 &&
        mouseY >= button.y &&
        mouseY <= button.y + 116
      ) {
        userButtons.push({x: button.x, y:button.y, width: 5, height: 116});
      }
      });
    });
  }

  function drawHorizontalLines(ctx: any){
    for (let y = 120; y <= 480; y += 120) {
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(80, y);  
      ctx.lineTo(1200, y);      
      ctx.stroke();  
    }
  }
  
  function drawVerticalLines(ctx: any){
    for (let line of linePositions){
      ctx.beginPath();
      ctx.moveTo(line[0], line[1]);  
      ctx.lineTo(line[0], line[1]+120);      
      ctx.stroke();  
    }
  }

  function drawEndPictures(ctx: any){
    let marriagePic = new Image();
    marriagePic.src = marriage;
    let brokenPic1 = new Image();
    brokenPic1.src = brokenHome;
    let brokenPic2 = new Image();
    brokenPic2.src = brokenHome;
    let brokenPic3 = new Image();
    brokenPic3.src = brokenHome;

    let bp1 = 190;
    let bp2 = 320;
    let bp3 = 450;

    switch(marriagePicPosition){
      case 450 :{
        bp3 = 60
        break;
      }
      case 190 :{
        bp1 = 60;
        break;
      }
      case 320 :{
        bp2 = 60
        break;
      }
    }

    ctx.drawImage(marriagePic, 1300, marriagePicPosition, 98.5, 100); 
    ctx.drawImage(brokenPic1, 1300, bp1, 114, 81); 
    ctx.drawImage(brokenPic2, 1300, bp2, 114, 81); 
    ctx.drawImage(brokenPic3, 1300, bp3, 114, 81); 
  }

  return (
    <section className={className ? className : "gamePanel"}>
      <canvas width="1500" height="600" id="gameCanvas" className="canvas"></canvas>
      {children}
    </section>
  );
};

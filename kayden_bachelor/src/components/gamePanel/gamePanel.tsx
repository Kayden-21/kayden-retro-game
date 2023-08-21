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
  linePositions: any[];
  speed: number;
  verticalCounter : number;
};

export const GamePanel = ({ className, children, startPosY, start, marriagePicPosition, linePositions, speed, verticalCounter }: GamePanelProps) => {
  
  useEffect(() => {
    posX = 0;
    verticalCounter = 0;
    //start = true;
    createButtons();
    addListener();
    animateHorizontal();
  }, []);

  let posX = 0 // Initial X position
  let buttons : any[] = [];

  function animateHorizontal(): boolean {
   /*  if (!start) {
      return true; // Exit the animation loop
    }  */

    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx : any;
    if (canvas){
      ctx = canvas.getContext('2d');
    }

    let kayden = new Image();
    kayden.src = kaydenFace;
    
    drawCanvas(ctx, canvas);

    ctx.drawImage(kayden, posX, startPosY, 124, 143); 
    

    if (posX >= 1160) {
      return true; 
    }

    let movements = shouldKaydenMoveVertical();
    

    if (movements.move){
      let lineIndex = movements.lineIndex;
      if (movements.up){
        animateVerticalUp(lineIndex);
      }
      else{
        animateVerticalDown(lineIndex);
      }
      verticalCounter = 0;
    }
    else{
      posX += speed;
      requestAnimationFrame(animateHorizontal); 
    }
    
    return false;
  }

  function shouldKaydenMoveVertical() : any{
     switch(startPosY){
      case 40:{
        let lineI = linePositions.findIndex(line => line.start[1] == 120 && line.start[0] == posX+70 && !line.traversed);
        if( lineI != -1){
            console.log('this happened first'); 
            return {move: true, up: false, lineIndex: lineI};
           
          }
          break;
      }
      case 160:{
        let lineI = linePositions.findIndex(line => line.start[1] == 240 && line.start[0] == posX+70 && !line.traversed);
        if( lineI != -1){
            console.log('this happened'); 
            return {move: true, up: false, lineIndex: lineI};
          }
          break;
      }
          
      case 280:{
        let lineI = linePositions.findIndex(line => line.start[1] == 360 && line.start[0] == posX+70 && !line.traversed);
        if( lineI != -1){
            console.log('this happened tooo'); 
            return {move: true, up: false, lineIndex: lineI};
          }
          break;
      } 
    }
      
    return {move: false, up: true}; 
  }

  function animateVerticalDown(lineIndex: number) {

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
    startPosY += speed;

    if (verticalCounter >= 119) {
      linePositions[lineIndex].traversed = true;
      requestAnimationFrame(animateHorizontal);
    }
    else{
      requestAnimationFrame(() => animateVerticalDown(lineIndex)); 
    }
  }

  function animateVerticalUp(lineIndex: number){
    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx : any;
    if (canvas){
      ctx = canvas.getContext('2d');
    }

    let kayden = new Image();
    kayden.src = kaydenFace;

    drawCanvas(ctx, canvas);

    ctx.drawImage(kayden, posX, startPosY, 124, 143); 
    
    startPosY -= speed;
    verticalCounter += speed; 

    if (verticalCounter >= 119) {
      linePositions[lineIndex].traversed = true;
      requestAnimationFrame(animateHorizontal); 
    }
    else{
      requestAnimationFrame(() => animateVerticalUp(lineIndex)); 
    }
  }

  function drawCanvas(ctx: any, canvas: any) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHorizontalLines(ctx);
    drawVerticalLines(ctx);
    drawEndPictures(ctx);
    drawUserLines(ctx);
  }

  function drawUserLines(ctx: any){
    for (let button of linePositions){
      ctx.fillStyle = "grey";
      ctx.fillRect(button.start[0], button.start[1], 5, 116);
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
        linePositions.push({start: [button.x, button.y], traversed: false});
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

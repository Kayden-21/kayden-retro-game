import {useEffect} from "react";
import "./gamePanel.css";
import kaydenFace from "../../assets/images/kaydenFace.png";
import marriage from "../../assets/images/marriage.png";
import brokenHome from "../../assets/images/brokenHome.png";
import {CONSTANTS} from "../../constants";

export type GamePanelProps = {
  className?: string;
  children?: React.ReactNode;
  startPosY: number;
  start: boolean;
  marriagePicPosition: number;
  linePositions: any[];
  speed: number;
  verticalCounter: number;
};

export const GamePanel = ({
                            className,
                            children,
                            startPosY,
                            marriagePicPosition,
                            linePositions,
                            speed,
                            verticalCounter
                          }: GamePanelProps) => {

  useEffect(() => {
    posX = 0;
    verticalCounter = 0;
    //start = true;
    createButtons();
    addListener();
    animateHorizontal();
  }, []);

  let posX = 0 // Initial X position
  let buttons: any[] = [];

  function drawKaydenOnCanvas() {
    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    if (canvas) {
      ctx = canvas.getContext('2d');

      let kayden = new Image();
      kayden.src = kaydenFace;

      drawCanvas(ctx, canvas);

      if (ctx) {
        ctx.drawImage(kayden, posX, startPosY, CONSTANTS.KAYDEN_HEAD_SIZE.WIDTH, CONSTANTS.KAYDEN_HEAD_SIZE.HEIGHT);
      }
    }
  }

  function animateHorizontal(): boolean {

    drawKaydenOnCanvas();

    if (posX >= 1160) {
      return true;
    }

    let movements = shouldKaydenMoveVertical();

    if (movements.move && !linePositions[movements.lineIndex].traversed) {
      if (movements.up === true) {
        moveUpCorrect(movements.lineIndex);
      } else {
        moveDownCorrect(movements.lineIndex);
      }
      // if(movements.up === true){
      //   // animateVerticalUp(movements.lineIndex);
      // }
    } else {
      posX += speed;
      requestAnimationFrame(animateHorizontal);
    }

    // posX += speed;
    // requestAnimationFrame(animateHorizontal);
    return false;
  }

  function moveUpCorrect(index: number) {
    drawKaydenOnCanvas();

    if ((startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) > linePositions[index].start[1]) {
      let overStepCalculation = (startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) - speed
      if (overStepCalculation < (linePositions[index].start[1])) {
        startPosY -= (startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) - (linePositions[index].start[1])
      } else {
        startPosY -= speed;
      }

      requestAnimationFrame(() => moveUpCorrect(index));
    } else {
      linePositions[index].traversed = true;
      requestAnimationFrame(animateHorizontal);
    }
  }

  function moveDownCorrect(index: number) {
    drawKaydenOnCanvas();

    if ((startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) < (linePositions[index].start[1] + 120)) {
      let overStepCalculation = (startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) + speed
      if (overStepCalculation > (linePositions[index].start[1] + 120)) {
        startPosY += (linePositions[index].start[1] + 120) - (startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH)
      } else {
        startPosY += speed;
      }
      requestAnimationFrame(() => moveDownCorrect(index));
    } else {
      linePositions[index].traversed = true;
      requestAnimationFrame(animateHorizontal);
    }
  }

  function shouldKaydenMoveVertical(): any {
    let foundLineIndex = linePositions.findIndex((line) => {
      let absoluteCheck = Math.abs((posX + 70) - line.start[0]);
      if (absoluteCheck <= speed && !line.traversed) {
        return true;
      }
    })

    if (linePositions[foundLineIndex]) {
      switch (startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) {
        case 120:
          if (linePositions[foundLineIndex].start[1] === 120) {

            return {move: true, up: false, lineIndex: foundLineIndex}
          }
          break;
        case 240:
          if (linePositions[foundLineIndex].start[1] === 120) {

            return {move: true, up: true, lineIndex: foundLineIndex}
          } else if (linePositions[foundLineIndex].start[1] === 240) {

            return {move: true, up: false, lineIndex: foundLineIndex}
          }
          break;
        case 360:
          if (linePositions[foundLineIndex].start[1] === 240) {

            return {move: true, up: true, lineIndex: foundLineIndex}
          } else if (linePositions[foundLineIndex].start[1] === 360) {

            return {move: true, up: false, lineIndex: foundLineIndex}
          }
          break;
        case 480:
          if (linePositions[foundLineIndex].start[1] === 360) {
            return {move: true, up: true, lineIndex: foundLineIndex}
          }
          break;
      }
    }
    return {move: false, up: true};
  }

  function drawCanvas(ctx: any, canvas: any) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHorizontalLines(ctx);
    drawVerticalLines(ctx);
    drawEndPictures(ctx);
    drawUserLines(ctx);
  }

  function drawUserLines(ctx: any) {
    for (let button of linePositions) {
      ctx.fillStyle = "grey";
      ctx.fillRect(button.start[0], button.start[1], 5, 120);
    }
  }


  function createButtons() {
    buttons = [];
    let ypositions = [120, 240, 360]
    for (let pos of ypositions) {
      for (let x = 650; x <= 1170; x += 10) {
        buttons.push({x: x, y: pos});
      }
    }
  }

  function addListener() {
    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

    canvas.addEventListener("click", function (event) {

      const mouseX = event.clientX - canvas.getBoundingClientRect().left - 20;
      const mouseY = event.clientY - canvas.getBoundingClientRect().top;

      buttons.forEach(button => {
        if (mouseX >= button.x - 4 &&
          mouseX <= button.x + 5 &&
          mouseY >= button.y &&
          mouseY <= button.y + 116
        ) {
          linePositions.push({start: [button.x, button.y], traversed: false});
        }
      });
    });
  }

  function drawHorizontalLines(ctx: any) {
    for (let y = 120; y <= 480; y += 120) {
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(80, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }
  }

  function drawVerticalLines(ctx: any) {
    for (let line of linePositions) {
      ctx.beginPath();
      ctx.moveTo(line[0], line[1]);
      ctx.lineTo(line[0], line[1] + 120);
      ctx.stroke();
    }
  }

  function drawEndPictures(ctx: any) {
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

    switch (marriagePicPosition) {
      case 450 : {
        bp3 = 60
        break;
      }
      case 190 : {
        bp1 = 60;
        break;
      }
      case 320 : {
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

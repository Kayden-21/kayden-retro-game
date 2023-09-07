import {useEffect, useState} from "react";
import "./gamePanel.css";
import kaydenFace from "../../assets/images/kaydenFace.png";
import marriage from "../../assets/images/marriage.png";
import brokenHome from "../../assets/images/brokenHome.png";
import {CONSTANTS} from "../../constants";
import {GameHandler} from "../../utilities/gameHandler";
import {useNavigate} from "react-router-dom";


export type GamePanelProps = {
  className?: string;
  children?: React.ReactNode;
  gameHandler: GameHandler;
};

export const GamePanel = ({
                            className,
                            gameHandler,
                          }: GamePanelProps) => {

  const navigate = useNavigate();
  const [speed, setSpeed] = useState(gameHandler.state.level);
  let startPosY: number;
  let linePositions: any;
  let marriagePicPosition: number;
  let buttons: any[];
  let posX: number;

  useEffect(() => {
    posX = 0;
    startPosY = gameHandler.state.startPosition;
    linePositions = gameHandler.state.linePositions;
    marriagePicPosition = gameHandler.state.marriageImagePosition;
    buttons = [];
    createButtons();
    addListener();
    animateHorizontal();
  }, [speed]);

  function drawKaydenOnCanvas() {
    let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    if (canvas) {
      ctx = canvas.getContext('2d');

      let kayden = new Image();
      kayden.src = kaydenFace;

      drawCanvas(ctx, canvas);

      if (ctx) {
        ctx.font = "40px Aerial";
        ctx.fillText(`Level: ${gameHandler.state.level}`,30,30,100);
        ctx.fillText(`Score: ${gameHandler.state.level - 1}`,1300,30,100);

        ctx.drawImage(kayden, posX, startPosY, CONSTANTS.KAYDEN_HEAD_SIZE.WIDTH, CONSTANTS.KAYDEN_HEAD_SIZE.HEIGHT);
      }
    }
  }

  function animateHorizontal(): boolean {

    drawKaydenOnCanvas();

    if (posX >= 1160) {
      nextLevelCheck();
      return true;
    }

    let movements = shouldKaydenMoveVertical();

    if (movements.move && !linePositions[movements.lineIndex].traversed) {
      if (movements.up === true) {
        moveUpCorrect(movements.lineIndex);
      } else {
        moveDownCorrect(movements.lineIndex);
      }

    } else {
      posX += speed;
      requestAnimationFrame(animateHorizontal);
    }

    return false;
  }

  function nextLevelCheck() {
    if ((startPosY + CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH) === (marriagePicPosition + 60)) {
      setSpeed(gameHandler.nextLevel());
    } else {
      gameHandler.state.score = gameHandler.state.level - 1
      gameHandler.gameOver();
      navigate('/results', {state:{score: gameHandler.state.level - 1}})
    }
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
    let foundLineIndex = linePositions.findIndex((line: { start: number[]; traversed: any; }) => {
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

      const mouseX = event.clientX - canvas.getBoundingClientRect().left;
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

    let bp1 = 180;
    let bp2 = 300;
    let bp3 = 420;

    switch (marriagePicPosition) {
      case 420 : {
        bp3 = 60
        break;
      }
      case 180 : {
        bp1 = 60;
        break;
      }
      case 300 : {
        bp2 = 60
        break;
      }
    }

    ctx.drawImage(marriagePic, 1250, marriagePicPosition, 100, 100);
    ctx.drawImage(brokenPic1, 1250, bp1, 100, 100);
    ctx.drawImage(brokenPic2, 1250, bp2, 100, 100);
    ctx.drawImage(brokenPic3, 1250, bp3, 100, 100);
  }

  return (
    <section className={className ? className : "gamePanel"}>
      <canvas width="1400" height="550" id="gameCanvas" className="canvas"></canvas>
    </section>
  );
};

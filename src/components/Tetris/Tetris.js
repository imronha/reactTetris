import React, { useState } from "react";
import { createStage, checkCollision } from "../../gameHelpers";

// Import function that creates stage
import { StyledTetrisWrapper, StyledTetris } from "../styles/StyledTetris";
import { StyledStageWrapper } from "../styles/StyledStage";
import { StyledDisplayWrapper } from "../styles/StyledDisplay";

// Import Custom Hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

// Import Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("rerender");

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 });
    }
  };

  const startGame = () => {
    // Reset Game
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setDropTime(1000);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  const drop = () => {
    // Increase level after player clears 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Increase speed if level increases
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("Game Over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
        console.log("Interval on");
      }
    }
  };
  const dropPlayer = () => {
    setDropTime(null);
    console.log("Interval off");
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // Move player left if left arrow pressed
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        // Move player right if right arrow pressed
        movePlayer(1);
      } else if (keyCode === 40) {
        // Move player down if down arrow pressed
        dropPlayer();
      } else if (keyCode === 38) {
        rotatePlayer(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <StartButton callback={startGame} />
        <StyledStageWrapper>
          <Stage stage={stage} />
        </StyledStageWrapper>
        <div>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <StyledDisplayWrapper>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </StyledDisplayWrapper>
          )}
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

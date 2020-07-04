import React, { useState } from "react";
import { createStage, checkCollision } from "../../gameHelpers";

// Import function that creates stage
import { StyledTetrisWrapper, StyledTetris } from "../styles/StyledTetris";
import { StyledStageWrapper } from "../styles/StyledStage";
import { StyledDisplayWrapper } from "../styles/StyledDisplay";

// Import Custom Hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";

// Import Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

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
  };

  const drop = () => {
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

  const dropPlayer = () => {
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

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <StartButton callback={startGame} />
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <StyledDisplayWrapper>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </StyledDisplayWrapper>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

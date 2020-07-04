import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, direction) => {
    // Transpose - turn rows into columns
    const rotatedTetromino = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    // Reverse each row to rotate matrix
    if (direction > 0) return rotatedTetromino.map((row) => row.reverse());
    return rotatedTetromino.reverse();
  };

  const rotatePlayer = (stage, direction) => {
    // Copy player (so that we dont mutate state)
    const copiedPlayer = JSON.parse(JSON.stringify(player));

    // Rotate tetromino
    copiedPlayer.tetromino = rotate(copiedPlayer.tetromino, direction);

    // Check collisions to see if we can rotate
    const position = copiedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(copiedPlayer, stage, { x: 0, y: 0 })) {
      copiedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > copiedPlayer.tetromino[0].length) {
        rotate(copiedPlayer.tetromino, -direction);
        copiedPlayer.pos.x = position;
      }
    }

    setPlayer(copiedPlayer);
  };

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, rotatePlayer];
};

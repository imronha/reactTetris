import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    // Clear rows function
    setRowsCleared(0);
    const scanRows = (newStage) =>
      newStage.reduce((accumulator, row) => {
        // Check if rows are 'merged' (aka not blank), return -1 if full row
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);

          // Add empty rows at beginning of array for each row that was cleared
          accumulator.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return accumulator;
        }

        // Return the row if it is not full
        accumulator.push(row);
        return accumulator;
      }, []);

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      // Then check if we got some score if collided
      if (player.collided) {
        resetPlayer();
        return scanRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};

// import { useState, useEffect } from "react";
// import { createStage } from "../gameHelpers";

// export const useStage = (player, resetPlayer) => {
//   const [stage, setStage] = useState(createStage());
//   useEffect(() => {
//     const updateStage = (prevStage) => {
//       // Clear stage
//       const newStage = prevStage.map((row) =>
//         row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
//       );

//       // Draw the tetromino
//       player.tetromino.forEach((row, y) => {
//         row.forEach((value, x) => {
//           if (value !== 0) {
//             newStage[y + player.pos.y][x + player.pos.x] = [
//               value,
//               `${player.collided ? "merged" : "clear"}`,
//             ];
//           }
//         });
//       });

//       // Check collision
//       if (player.collided) {
//         resetPlayer();
//       }

//       return newStage;
//     };

//     setStage((prev) => updateStage(prev));
//   }, [
//     player.collided,
//     player.pos.x,
//     player.pos.y,
//     player.tetromino,
//     resetPlayer,
//   ]);

//   return [stage, setStage];
// };

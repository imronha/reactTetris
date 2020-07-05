[React Tetris Live Demo](https://amazing-kalam-046aa5.netlify.app/)

# ReactTetris

ReactTetris is a tetris clone created with React using styled-components, custom hooks, and css. 

## Technologies Used:

* React
* JavaScript
* HTML/CSS
* Styled-Components
* Custom Hooks

## Features:

![ReactTetris Gif](ReactTetris.gif)

The user can play a full tetris game by moving and rotating tetriminos. Collision detection between tetriminos and game stage area is fully functioning and players can progress through levels as they clear more rows.

### Custom tetriminos and random generator
Tetriminos created with multidimensional arrays and randomly generated when the user starts the game.
```Javascript
  export const TETROMINOS = {
  0: {
    shape: [[0]],
    color: "36, 37, 91",
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 225",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};
```
### Game Loop using custom hook (useInterval)
Interval is increased everytime the player clears 10 rows to make the game more challenging.

```Javascript
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
```

### Player moves using arrow keys
```Javascript
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
```

## Features to implement in next iterations
* Next component (to show the upcoming tetrimino)
* Database to keep track of user and high scores
* UI/UX for mobile compatibility
* Sounds for tetriminos, collisions, game over, game start, clear rows, and background music
* Challenge version (challenge friends head to head using socket.io)




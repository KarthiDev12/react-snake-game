import { coordinateForMove } from "./helper";

export function createSnake(board, snakeSize = 4) {
  const xMax = board[0].length;
  const yMax = board.length;
  const snakeY = Math.floor(yMax / 2);
  const snakeTailX = Math.floor(xMax / 2) - Math.floor(snakeSize / 2);
  let snake = Array(snakeSize);
  for (let x = snakeTailX, i = 0; i < snakeSize; x++, i++) {
    snake[i] = defaultSnakeBody(x, snakeY);
    if (i === 0) snakeTail(snake[i]);
    else if (i === snakeSize - 1) snakeHead(snake[i]);
  }
  return snake;
}

export function createSnakeChanges(board, snake) {
  return snake.map(snakeBody => {
    return { ...board[snakeBody.y][snakeBody.x], aboveIt: snakeBody };
  });
}

export function moveSnake(board, snake, direction) {
  const newSnake = [...snake];
  const oldHead = newSnake.pop();
  const oldHeadToBody = defaultSnakeBody(oldHead.x, oldHead.y);
  const coordinate = coordinateForMove(oldHead.x, oldHead.y, direction);
  const newHead = snakeHead(
    defaultSnakeBody(coordinate.x, coordinate.y),
    direction
  );
  return {
    snake: [...newSnake.slice(1), oldHeadToBody, newHead],
    changes: [
      { ...board[newSnake[0].y][newSnake[0].x], aboveIt: null },
      { ...board[oldHeadToBody.y][oldHeadToBody.x], aboveIt: oldHeadToBody },
      { ...board[newHead.y][newHead.x], aboveIt: newHead }
    ]
  };
}

function defaultSnakeBody(x, y) {
  return {
    x,
    y,
    id: `${x}|${y}`,
    name: "snake"
  };
}

function snakeTail(snakeBody) {
  snakeBody.isTail = true;
  return snakeBody;
}

function snakeHead(snakeBody, towards = "right") {
  snakeBody.isHead = true;
  snakeBody.towards = towards;
  return snakeBody;
}
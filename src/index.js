module.exports = function solveSudoku(matrix) {
 
  const isRowsValid = (matrix) => {
    for (let i = 0; i < 9; i++) {
      let currentRow = [];
      for (let j = 0; j < 9; j++) {
        if (currentRow.includes(matrix[i][j])) {
          return false;
        } else if (matrix[i][j] !== 0) {
          currentRow.push(matrix[i][j]);
        }
      }
    }
    return true;
  }

  const isColumnsValid = (matrix) => {
    for (let i = 0; i < 9; i++) {
      let currentRow = [];
      for (let j = 0; j < 9; j++) {
        if (currentRow.includes(matrix[j][i])) {
          return false;
        } else if (matrix[j][i] !== 0) {
          currentRow.push(matrix[j][i]);
        }
      }
    }
    return true;
  }

  const isSquareValid = (matrix) => {
    const matrixCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]

    for (let y = 0; y < 9; y += 3) {
      for (let x = 0; x < 9; x += 3) {
        let currentSquare = [];
        for (let i = 0; i < 9; i++) {
          let coordinates = [...matrixCoordinates[i]]
          coordinates[0] += y;
          coordinates[1] += x;
          if (currentSquare.includes(matrix[coordinates[0]][coordinates[1]])) {
            return false;
          } else if (matrix[coordinates[0]][coordinates[1]] !== 0) {
            currentSquare.push(matrix[coordinates[0]][coordinates[1]]);
          }
        }
      }
    }
    return true;
  }

  const validMatrix = (matrix) => {
    return isRowsValid(matrix) && isColumnsValid(matrix) && isSquareValid(matrix);
  }

  const keepOnlyValidMatrixs = (matrixs) => {
    return matrixs.filter(matrix => validMatrix(matrix));
   }

  const searchForSolution = (matrixs) => {
    if (matrixs.length < 1) {
      return false;
    } else {
      let first = matrixs.shift();
      const tryPath = solve(first);
      if (tryPath != false) {
        return tryPath
      } else {
        return searchForSolution(matrixs);
      }
    }
  }

  const isMatrixSolved = (matrix) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

   const findEmptySpot = (matrix) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }
  }


  const nextMatrixs = (matrix) => {
    let nextArrayOfMatrix = [];
    const firstEmptySpot = findEmptySpot(matrix);
    if (firstEmptySpot != undefined) {
      const y = firstEmptySpot[0];
      const x = firstEmptySpot[1];
      for (let i = 1; i <= 9; i++) {
        let newMatrix = [...matrix];
        let row = [...newMatrix[y]]
        row[x] = i;
        newMatrix[y] = row;
        nextArrayOfMatrix.push(newMatrix);
      }
    }
    return nextArrayOfMatrix;
  }

  const solve = (matrix) => {
    if (isMatrixSolved(matrix)) {
      return matrix;
    } else {
      const possibleMatrixs = nextMatrixs(matrix);
      const validMatrixs = keepOnlyValidMatrixs(possibleMatrixs);
      return searchForSolution(validMatrixs);
    }
  }

  return solve(matrix);
}

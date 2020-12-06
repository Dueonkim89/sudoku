// DOM elements for reference
let numbersGrid = document.querySelectorAll(".col");
let inputs = document.querySelectorAll("input");
let newPuzzleButton = document.querySelector(".new-puzzle");
let verifyButton = document.querySelector(".verify");

let firstRow = document.querySelectorAll(".first-row")[0].children;
let secondRow = document.querySelectorAll(".second-row")[0].children;
let thirdRow = document.querySelectorAll(".third-row")[0].children;

// 5 different puzzles to choose.
let puzzles = {
  1: {
    firstRow: [
      ["", "", "", "", 5, 1, 4, "", 3],
      ["", 7, "", 3, 4, "", "", "", ""],
      ["", "", "", "", "", "", "", 1, 8]
    ],
    secondRow: [
      ["", 9, "", "", "", "", "", "", 8],
      ["", "", "", "", 1, "", "", 2, 7],
      [5, "", "", "", 7, 6, "", "", ""]
    ],
    thirdRow: [
      ["", "", "", "", "", 4, "", "", 5],
      ["", "", "", "", 9, 8, "", "", ""],
      ["", "", 5, "", 2, "", 7, "", 4]
    ]
  },
  2: {
    firstRow: [
      [9, "", "", "", "", "", "", "", 3],
      ["", "", "", 1, "", 3, "", "", 4],
      [5, "", "", "", 4, "", 8, "", ""]
    ],
    secondRow: [
      ["", "", "", "", "", "", 5, "", 1],
      ["", 7, "", 5, "", "", 8, "", 2],
      ["", "", "", "", 6, 2, "", "", ""]
    ],
    thirdRow: [
      [8, "", "", 7, 4, "", "", "", ""],
      [7, "", "", 6, "", "", "", "", 8],
      ["", "", 6, 2, 1, "", "", "", ""]
    ]
  },
  3: {
    //medium one
    firstRow: [
      ["", "", 9, "", "", "", 4, "", ""],
      [5, 8, 6, "", 2, "", "", "", ""],
      ["", "", "", "", "", "", 6, 8, 3]
    ],
    secondRow: [
      [9, "", "", "", 6, "", "", 3, ""],
      [6, 5, "", 7, "", "", 2, "", ""],
      ["", 3, 2, "", 9, 8, 7, "", 4]
    ],
    thirdRow: [
      ["", "", 3, 6, 2, "", "", "", ""],
      ["", "", "", "", 1, 5, 4, "", ""],
      ["", "", "", "", 4, "", "", 5, ""]
    ]
  },
  4: {
    // easy one
    firstRow: [
      [9, 7, "", 2, "", 1, 8, 3, ""],
      ["", "", "", 5, "", 9, "", 4, ""],
      [6, "", "", "", 3, 4, "", 1, ""]
    ],
    secondRow: [
      ["", "", "", 7, "", 6, "", 5, 2],
      [4, "", 2, "", 5, "", "", 3, 8],
      ["", "", "", "", "", 2, "", "", ""]
    ],
    thirdRow: [
      [5, "", "", 6, 2, "", "", "", ""],
      [8, 1, 7, 3, 9, 4, "", 6, ""],
      ["", "", 6, "", 5, 1, 4, "", 3]
    ]
  },
  5: {
    firstRow: [
      ["", 5, 8, "", "", "", "", "", ""],
      [2, 4, "", "", 9, "", "", 6, ""],
      [9, 1, "", 6, 8, 7, 2, "", ""]
    ],
    secondRow: [
      [8, "", 5, "", 7, "", 1, 2, ""],
      ["", "", "", "", 5, "", "", "", 4],
      [4, "", "", 1, 6, 2, "", 3, ""]
    ],
    thirdRow: [
      ["", 9, 6, "", 8, 1, 7, 4, 3],
      ["", 8, 1, "", "", "", 5, "", 6],
      [3, "", 5, "", 2, "", "", "", ""]
    ]
  }
};

// puzzle starting number
var start = 1;

// function to change puzzle
function changePuzzle(numb) {
  // start back at 1, if at 5
  if (numb > 5) {
    start = 1;
    loadPuzzle(start);
    return;
  }
  loadPuzzle(numb);
}

// calback to verify user answer
function verifySolution() {
  // create 9x9 grid for polynomial time verification.
  let grid = createGrid(firstRow)
    .concat(createGrid(secondRow))
    .concat(createGrid(thirdRow));

  // loop thru the row and column of grid
  for (let i = 0; i < grid.length; i++) {
    // track values at each coordinate
    let rowHash = {};
    let colHash = {};
    let squareHash = {};

    // only allow numbers 1 - 9
    let validEntries = {
      "1": true,
      "2": true,
      "3": true,
      "4": true,
      "5": true,
      "6": true,
      "7": true,
      "8": true,
      "9": true
    };

    for (let j = 0; j < grid[i].length; j++) {
      // check each row and column
      if (
        !validEntries[grid[i][j]] ||
        rowHash[grid[i][j]] ||
        colHash[grid[j][i]]
      ) {
        return false;
      }
      // check each 3x3 square
      let row = Math.floor(j / 3) + Math.floor(i / 3) * 3;
      let col = (i % 3) * 3 + (j % 3);

      if (squareHash[grid[row][col]]) {
        return false;
      }
      // else store all values in hash table
      rowHash[grid[i][j]] = true;
      colHash[grid[j][i]] = true;
      squareHash[grid[row][col]] = true;

      // console.log(i + 1 + 'cube', row, col);
    }
  }
  return true;
}

function createGrid(row) {
  // return 9 x 3 for each row
  let grid = [[], [], []];

  // loop thru first row
  for (let i = 0; i < row.length; i++) {
    // loop thru children of first row and construct grid
    for (let j = 0; j < row[i].children.length; j++) {
      if (j < 3) {
        grid[0].push(row[i].children[j].children[0].value);
      } else if (j > 2 && j < 6) {
        grid[1].push(row[i].children[j].children[0].value);
      } else {
        grid[2].push(row[i].children[j].children[0].value);
      }
    }
  }

  return grid;
}

// load puzzle function
function loadPuzzle(numb) {
  // load the data into the sudoku grid
  for (let row in puzzles[numb]) {
    // for each corresponding row, upload data into row
    if (row === "firstRow") {
      for (let i = 0; i < firstRow.length; i++) {
        // loop through each number in row
        for (let j = 0; j < firstRow[i].children.length; j++) {
          // remove the disabled from input
          firstRow[i].children[j].children[0].disabled = false;
          // set the value inside puzzle row
          firstRow[i].children[j].children[0].value = puzzles[numb][row][i][j];
          // disable input if number
          if (puzzles[numb][row][i][j] !== "") {
            firstRow[i].children[j].children[0].disabled = true;
          }
        }
      }
    } else if (row === "secondRow") {
      for (let i = 0; i < secondRow.length; i++) {
        // loop through each number in row
        for (let j = 0; j < secondRow[i].children.length; j++) {
          // remove the disabled from input
          secondRow[i].children[j].children[0].disabled = false;
          // set the value inside puzzle row
          secondRow[i].children[j].children[0].value = puzzles[numb][row][i][j];
          // disable input if number
          if (puzzles[numb][row][i][j] !== "") {
            secondRow[i].children[j].children[0].disabled = true;
          }
        }
      }
    } else {
      for (let i = 0; i < thirdRow.length; i++) {
        // loop through each number in row
        for (let j = 0; j < thirdRow[i].children.length; j++) {
          // remove the disabled from input
          thirdRow[i].children[j].children[0].disabled = false;
          // set the value inside puzzle row
          thirdRow[i].children[j].children[0].value = puzzles[numb][row][i][j];
          // disable input if number
          if (puzzles[numb][row][i][j] !== "") {
            thirdRow[i].children[j].children[0].disabled = true;
          }
        }
      }
    }
  }
}

// callback function to be used for input element and its parent
function textFocus(el) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}

// focus on input when clicking on grid
for (number of numbersGrid) {
  number.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target.className === "col") {
      event.target.children[0].focus();
      textFocus(event.target.children[0]);
    }
  });
}

// go end of of input when clicked
for (input of inputs) {
  input.addEventListener("click", event => textFocus(event.target));
}

// callback when pushing new puzzle button
newPuzzleButton.addEventListener("click", () => {
  start++;
  changePuzzle(start);
});

// callback when verifying user input
verifyButton.addEventListener("click", () => {
  if (verifySolution()) {
    alert("Congratulations! You solved it. Try another puzzle!");
    return;
  }
  alert("Incomplete, please try again!");
});

// load the puzzle
loadPuzzle(start);

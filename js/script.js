// DOM elements for reference
let numbersGrid = document.querySelectorAll(".col");
let inputs = document.querySelectorAll("input");

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

let start = 1;

// load puzzle function
function loadPuzzle(numb) {
  // get the 3 rows of sudoku
  let firstRow = document.querySelectorAll(".first-row")[0].children;
  let secondRow = document.querySelectorAll(".second-row")[0].children;
  let thirdRow = document.querySelectorAll(".third-row")[0].children;

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

// load the puzzle
loadPuzzle(start);

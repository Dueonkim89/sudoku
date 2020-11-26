// DOM elements for reference
let numbersGrid = document.querySelectorAll('.col');
let inputs = document.querySelectorAll('input');


// 5 different puzzles to choose.
let puzzles = {
    1: {
        'firstRow': [[?,?,?,?,?,5,9,6,?], [9,?,?,?,?,?,4,1,?], [5,?,1,4,2,?,3,7,?]],
        'secondRow':[[?,?,6,?,1,?,7,5,?], [?,?,?,3,?,?,?,?,?], [?,?,?,7,4,5,1,?,?]], 
        'thirdRow': [[5,?,?,?,?,7,6,?,9], [6,7,?,?,4,?,8,?,1], [?,?,?,?,?,?,?,?,?]]

        }, 
    2: {
        'firstRow': [[], [], []], 
        'secondRow':[[], [], []], 
        'thirdRow': [[], [], []]
    },
    3: {
        'firstRow': [[], [], []], 
        'secondRow':[[], [], []], 
        'thirdRow': [[], [], []]
    },
    4: {
        'firstRow': [[], [], []], 
        'secondRow':[[], [], []], 
        'thirdRow': [[], [], []]
    },
    5: {
        'firstRow': [[], [], []], 
        'secondRow':[[], [], []], 
        'thirdRow': [[], [], []]
    },
}; 

let start = 1;

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

// function to load puzzle.


// focus on input when clicking on grid
for (number of numbersGrid) {
    number.addEventListener('click', (event) => {
        event.stopPropagation();
        if (event.target.className === 'col') {
            event.target.children[0].focus();
            textFocus(event.target.children[0]);
        }
    })
}

// go end of of input when clicked 
for (input of inputs) {
    input.addEventListener('click', (event) => textFocus(event.target));
}




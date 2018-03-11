
var playerOne = prompt('Enter your name Player One. Your color will be Blue.');
var playerOneColor = 'rgb(0, 153, 255)';

var playerTwo = prompt('Enter your name Player Two. Your color will be Red.');
var playerTwoColor = 'rgb(255, 71, 26)';

var gameOn = true;
var table = $('table tr');

function reportWin(rowNumber, columnNumber) {
  console.log('You won starting at this row and column:');
  console.log(rowNumber);
  console.log(columnNumber);
}

function changeColor(rowIndex, columnIndex, color) {
    // Returning table cell by row and coulmn index using jQuery and changing
    // background color of button in this cell.
    return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color', color)
}

function reportColor(rowIndex, columnIndex) {
    // Returning table cell color by row and coulmn index using jQuery
    return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color')
}

function checkBottom(columnIndex){
  // Taking an columnIndex which was clicked and checking first avaliable grey
  // button in column. Function return his index.
  var colorReport = reportColor(5, columnIndex)

  for (var row = 5; row > -1; row--) {
    colorReport = reportColor(row, columnIndex)
    if(colorReport === 'rgb(204, 204, 204)'){
      return row
    }
  }
}

function colorMatchCheck(chipOne, chipTwo, chipThree, chipFour){
  // Checking if next four buttons have the same color and this color is diff
  // than defauls. Also checking that comparing slots aren't undefined.
  return (chipOne === chipTwo && chipOne === chipThree && chipOne === chipFour && chipOne !== undefined && chipOne !==  'rgb(204, 204, 204)')
}

function horizontalWinCheck() {
  // Checking for horizontal wins by comparations color of 4 next to chips in
  // each row - 4 situations. If win situations occurs, then call reportWin()
  // and return true
  var boardRows = 6
  for (var row = 0; row < boardRows; row++) {
    for (var column = 0; column < 4; column++) {
      if (colorMatchCheck(reportColor(row, column), reportColor(row, column + 1), reportColor(row, column + 2),reportColor(row, column + 3))) {
        console.log('hrz');
        reportWin(row,column);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  // Checking for vertical wins by comparations color of 4 next to chips in
  // each row - 3 situations. If win situations occurs, then call reportWin()
  // and return true
  var boardColumns = 7
  for (var column = 0; column < boardColumns; column++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(reportColor(row, column), reportColor(row + 1, column), reportColor(row + 2, column),reportColor(row + 3, column))) {
        console.log('vrt');
        reportWin(row,column);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  // Checking for diagonal wins by comparations color of 4 chips in positive or
  // negative slope. If win situations occurs, then call reportWin()
  // and return true
  for (var column = 0; column < 5; column++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(reportColor(row, column), reportColor(row + 1, column + 1), reportColor(row + 2, column + 2),reportColor(row + 3, column + 3))) {
        console.log('diag-neg');
        reportWin(row, column);
        return true;
      }
      else if (colorMatchCheck(reportColor(row, column), reportColor(row - 1, column + 1), reportColor(row - 2, column + 2),reportColor(row - 3, column + 3))) {
        console.log('diag-pos');
        reportWin(row, column);
        return true;
      }
    }
  }
}

// Game starts by Player One move.
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$('h3').text(playerOne + " it's your turn. Plesae pick a column to drop in.")

$('.board button').on('click', function() {

  // Finding index of column pickeb by method 'click'
  var clickedColumn = $(this).closest('td').index();

  // Changing color of first available chips in picked column
  var bottomAvailable = checkBottom(clickedColumn);
  changeColor(bottomAvailable, clickedColumn, currentColor);

  // Win check situation
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName + ' win this round!');
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * - 1;

  if (currentPlayer === 1) {
    currentName = playerOne
    $('h3').text(currentName + ' it is your turn.')
    currentColor = playerOneColor
  } else {
    currentName = playerTwo
    $('h3').text(currentName + ' it is your turn.')
    currentColor = playerTwoColor
  }


})

define(["jquery"], function($) {

  function Sudoku(params) {
    var t = this;
      this.INIT = 0,
      this.RUNNING = 1,
      this.END = 2,
      this.id = params.id || 'game_container',
      this.displaySolution = params.displaySolution || 0,
      this.displaySolutionOnly = params.displaySolutionOnly || 0,
      this.displayTitle = params.displayTitle || 0,
      this.highlight = params.highlight || 0,
      this.fixCellsNr = params.fixCellsNr || 32,
      this.n = 3,
      this.nn = this.n * this.n,
      this.cellsNr = this.nn * this.nn;
      if (this.fixCellsNr < 10) this.fixCellsNr = 10;
        if (this.fixCellsNr > 70) this.fixCellsNr = 70;
    this.init();

    //counter
    setInterval(function() {
      t.timer();
    }, 1000);
    return this;
  }

  Sudoku.prototype.init = function() {
    this.status = this.INIT;
    this.cellsComplete = 0;
    this.board = [];
    this.boardSolution = [];
    this.cell = null;
    this.secondsElapsed = 0;

    if (this.displayTitle == 0) {
      $('#game_title').hide();
    }
    $('#score').remove();
    this.board = this.boardGenerator(this.n, this.fixCellsNr);
    return this;
  };

  Sudoku.prototype.timer = function() {
    if (this.status === this.RUNNING) {
      this.secondsElapsed++;
      $('#timeElapsed').text('Time Elapsed: ' + this.secondsElapsed);
    }
  };

  /**
  Utlity Method for Shuffle
  */
  Sudoku.prototype.shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue = 0,
      randomIndex = 0;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  /**
  Create the sudoku board
  */
  Sudoku.prototype.boardGenerator = function(n, fixCellsNr) {
    var
      index = 0,
      i = 0,
      j = 0,
      jAxisStart = 0,
      jAxisStop = 0,
      gridFields = [];
    this.boardSolution = [];
    //shuffle indexes
    for (i = 0; i < this.nn; i++) {
      gridFields[i] = i + 1;
    }
    //shuffle sudoku solution
    gridFields = this.shuffle(gridFields);
    for (i = 0; i < n * n; i++) {
      for (j = 0; j < n * n; j++) {
        var value = Math.floor((i * n + i / n + j) % (n * n) + 1);
        this.boardSolution[index] = value;
        index++;
      }
    }
    //shuffle sudoku horizontal and vertical
    var emptyIndexes = [];
    for (i = 0; i < this.n; i++) {
      emptyIndexes[i] = i + 1;
    }
    //shuffle horizontal index
    var sudokuHorizontalIndexes = this.shuffle(emptyIndexes);
    var tempSolution = [];
    index = 0;
    for (i = 0; i < sudokuHorizontalIndexes.length; i++) {
      jAxisStart = (sudokuHorizontalIndexes[i] - 1) * this.n * this.nn;
      jAxisStop = sudokuHorizontalIndexes[i] * this.n * this.nn;
      for (j = jAxisStart; j < jAxisStop; j++) {
        tempSolution[index] = this.boardSolution[j];
        index++;
      }
    }
    this.boardSolution = tempSolution;
    //shuffle sudokus bands vertical
    var bands_vertical_indexes = this.shuffle(emptyIndexes);
    tempSolution = [];
    index = 0;
    for (k = 0; k < this.nn; k++) {
      for (i = 0; i < this.n; i++) {
        jAxisStart = (bands_vertical_indexes[i] - 1) * this.n;
        jAxisStop = bands_vertical_indexes[i] * this.n;
        for (j = jAxisStart; j < jAxisStop; j++) {
          tempSolution[index] = this.boardSolution[j + (k * this.nn)];
          index++;
        }
      }
    }
    this.boardSolution = tempSolution;
    // Sudoku Board Matrix indexes
    var sudokuBoardIndexes = [],
      sudokuBoardInit = [];
    //shuffle board indexes and cut empty cells
    for (i = 0; i < this.boardSolution.length; i++) {
      sudokuBoardIndexes[i] = i;
      sudokuBoardInit[i] = 0;
    }
    sudokuBoardIndexes = this.shuffle(sudokuBoardIndexes);
    sudokuBoardIndexes = sudokuBoardIndexes.slice(0, this.fixCellsNr);
    //build the init board
    for (i = 0; i < sudokuBoardIndexes.length; i++) {
      sudokuBoardInit[sudokuBoardIndexes[i]] = this.boardSolution[sudokuBoardIndexes[i]];
      if (parseInt(sudokuBoardInit[sudokuBoardIndexes[i]]) > 0) {
        this.cellsComplete++;
      }
    }
    console.log(sudokuBoardInit);
    return (this.displaySolutionOnly) ? this.boardSolution : sudokuBoardInit;
  };

  /**
  Geneerate the template for sudoku board & render
  */
  Sudoku.prototype.sudokuBoardDraw = function() {
    var index = 0,
      position = {
        x: 0,
        y: 0
      },
      group_position = {
        x: 0,
        y: 0
      };

    var sudoku_board = $('<div></div>').addClass('card-panel hoverable sudoku_board');
    var sudoku_statistics = $('<ul id="score" class="collection hoverable"><li class="collection-item"><div class="ui-widget"><h1 class="ui-value">' + this.cellsComplete + '</h1><span class="ui-label">' + this.cellsNr + '</span></div></li><li id="timeElapsed" class="collection-item">Time Elapsed: ' + this.secondsElapsed + '</li></ul>');
    var sudoko_controls = $('<div class="card-panel cp_game_controls"><a id="startNewGame" class="btn-floating btn-small waves-effect waves-light red"><i class="fa fa-refresh"></i></a></div>');
    $('#' + this.id).empty();
    //draw board
    for (i = 0; i < this.nn; i++) {
      for (j = 0; j < this.nn; j++) {
        position = {
          x: i + 1,
          y: j + 1
        };
        group_position = {
          x: Math.floor((position.x - 1) / this.n),
          y: Math.floor((position.y - 1) / this.n)
        };
        var value = (this.board[index] > 0 ? this.board[index] : ''),
          value_solution = (this.boardSolution[index] > 0 ? this.boardSolution[index] : ''),
          cell = $('<div></div>')
          .addClass('cell')
          .attr('x', position.x)
          .attr('y', position.y)
          .attr('gr', group_position.x + '' + group_position.y)
          .html('<span>' + value + '</span>');
        if (this.displaySolution) {
          $('<span class="solution">(' + value_solution + ')</span>').appendTo(cell);
        }
        if (value > 0) {
          cell.addClass('fix');
        }
        if (position.x % this.n === 0 && position.x != this.nn) {
          cell.addClass('border_h');
        }
        if (position.y % this.n === 0 && position.y != this.nn) {
          cell.addClass('border_v');
        }
        if (position.x === 1) {
          cell.addClass('cp_outer_border top');
        }
        if (position.y === 9) {
          cell.addClass('cp_outer_border right');
        }
        if (position.x === 9) {
          cell.addClass('cp_outer_border bottom');
        }
        if (position.y === 1) {
          cell.addClass('cp_outer_border left')
        }
        cell.appendTo(sudoku_board);
        index++;
      }
    }
    sudoku_board.appendTo('#' + this.id);
    //draw console
    var sudoku_console_cotainer = $('<div></div>').addClass('board_console_container');
    var sudoku_console = $('<div></div>').addClass('board_console card-panel');
    for (i = 1; i <= this.nn; i++) {
      $('<div></div>').addClass('num waves-effect waves-light btn-large').text(i).appendTo(sudoku_console);
    }
    $('<div></div>').addClass('num waves-effect waves-light btn-large remove').text('Clear & close').appendTo(sudoku_console);
    //add all to sudoku container
    sudoku_console_cotainer.appendTo('#' + this.id).hide();
    sudoku_console.appendTo(sudoku_console_cotainer);
    sudoku_statistics.appendTo('#' + 'scorecard');
    sudoko_controls.appendTo('#score');
    if ($('.sudoku_board .cell span').is(':empty')) {
      $('.sudoku_board .cell span:empty').each(function(index) {
        $(this).parent().addClass('empty_cell');
      });
    }
    //adjust size
    this.resizeWindow();
  };

  Sudoku.prototype.resizeWindow = function() {
    var screen = {
      w: $(window).width(),
      h: $(window).height()
    };

    var b_pos = $('#' + this.id + ' .sudoku_board').offset(),
      b_dim = {
        w: $('#' + this.id + ' .sudoku_board').width(),
        h: $('#' + this.id + ' .sudoku_board').height()
      },
      s_dim = {
        w: $('#' + this.id + ' .statistics').width(),
        h: $('#' + this.id + ' .statistics').height()
      };
    var screen_wr = screen.w + s_dim.h + b_pos.top + 10;
    if (screen_wr > screen.h) {
      $('#' + this.id + ' .sudoku_board').css('width', (screen.h - b_pos.top - s_dim.h - 14));
    } else {
      $('#' + this.id + ' .sudoku_board').css('width', '98%');
    }
    var cell_width = $('#' + this.id + ' .sudoku_board .cell:first').width(),
      note_with = Math.floor(cell_width / 2) - 1;
    $('#' + this.id + ' .sudoku_board .cell').height(cell_width);
    $('#' + this.id + ' .sudoku_board .cell span').css('line-height', cell_width + 'px');
  };

  /**
  Show console
  */
  Sudoku.prototype.showConsole = function(cell) {
    $('#' + this.id + ' .board_console_container').fadeIn(300);
    var t = this;
    //init
    $('#' + t.id + ' .board_console .num').removeClass('selected');
    return this;
  };

  /**
  Hide console
  */
  Sudoku.prototype.hideConsole = function(cell) {
    $('#' + this.id + ' .board_console_container').fadeOut(700);
    return this;
  };

  /**
  Select cell and prepare it for input from sudoku board console
  */
  Sudoku.prototype.cellSelect = function(cell) {
    this.cell = cell;
    var value = $(cell).text() | 0,
      position = {
        x: $(cell).attr('x'),
        y: $(cell).attr('y')
      },
      group_position = {
        x: Math.floor((position.x - 1) / 3),
        y: Math.floor((position.y - 1) / 3)
      },
      horizontal_cells = $('#' + this.id + ' .sudoku_board .cell[x="' + position.x + '"]'),
      vertical_cells = $('#' + this.id + ' .sudoku_board .cell[y="' + position.y + '"]'),
      group_cells = $('#' + this.id + ' .sudoku_board .cell[gr="' + group_position.x + '' + group_position.y + '"]'),
      same_value_cells = $('#' + this.id + ' .sudoku_board .cell span:contains(' + value + ')');
    $('#' + this.id + ' .sudoku_board .cell').removeClass('selected current group');
    $('#' + this.id + ' .sudoku_board .cell span').removeClass('samevalue');
    if (this.highlight > 0) {
      horizontal_cells.addClass('selected');
      vertical_cells.addClass('selected');
      group_cells.addClass('selected group');
      if (!$(this.cell).hasClass('fix')) {
        same_value_cells.not($(cell).find('span')).addClass('samevalue');
      }
    }
    if (!$(this.cell).hasClass('fix')) {
      $(cell).addClass('current');
      if ($(this.cell).hasClass('valid') && $(this.cell).hasClass('notvalid')) {
        $(cell).addClass('current');
      }
      this.showConsole();
      this.resizeWindow();
    } else {
      this.hideConsole();
    }
  };

  /**
  Add value from sudoku console to selected board cell
  */
  Sudoku.prototype.addValue = function(value) {
    var position = {
        x: $(this.cell).attr('x'),
        y: $(this.cell).attr('y')
      },
      group_position = {
        x: Math.floor((position.x - 1) / 3),
        y: Math.floor((position.y - 1) / 3)
      },
      horizontal_cells = '#' + this.id + ' .sudoku_board .cell[x="' + position.x + '"]',
      vertical_cells = '#' + this.id + ' .sudoku_board .cell[y="' + position.y + '"]',
      group_cells = '#' + this.id + ' .sudoku_board .cell[gr="' + group_position.x + '' + group_position.y + '"]',
      horizontal_cells_exists = $(horizontal_cells + ' span:contains(' + value + ')'),
      vertical_cells_exists = $(vertical_cells + ' span:contains(' + value + ')'),
      group_cells_exists = $(group_cells + ' span:contains(' + value + ')'),
      old_value = parseInt($(this.cell).not('.notvalid').text()) || parseInt($(this.cell).not('.valid').text());
    same_value_cells = $('#' + this.id + ' .sudoku_board .cell span:contains(' + value + ')');
    old_same_value_cells = $('#' + this.id + ' .sudoku_board .cell span:contains(' + old_value + ')');
    if ($(this.cell).hasClass('fix')) {
      return;
    }
    old_same_value_cells.not($(this.cell).find('span')).removeClass('samevalue');
    same_value_cells.not($(this.cell).find('span')).addClass('samevalue');
    if ($(this.cell) !== null &&
      typeof($(this.cell)) != 'undefined' &&
      (horizontal_cells_exists.length === 0 && vertical_cells_exists.length === 0 && group_cells_exists.length === 0)) {
      $(this.cell).addClass('valid').removeClass('notvalid').removeClass('current');
      this.cellsComplete += 1;
      $('#score .ui-widget .ui-value').text(this.cellsComplete);
      $('#score .ui-widget .ui-label').text(this.cellsNr);
      $(this.cell).find('span').text((value === 0) ? '' : value);
      console.log('Valid Value added ', value);
    } else {
      if ($(this.cell).hasClass('valid')) {
        this.cellsComplete -= 1;
      }
      $(this.cell).addClass('notvalid').removeClass('valid').removeClass('current');
      $(this.cell).find('span').text(value);
      $('#score .ui-widget .ui-value').text(this.cellsComplete);
      $('#score .ui-widget .ui-label').text(this.cellsNr);
      console.log('Invalid Value added ', value);
    }
    if (this.cellsComplete === this.cellsNr) {
      this.gameCompletedSucess();
    }
    return this;
  };

  /**
Game complete
  */
  Sudoku.prototype.gameCompletedSucess = function() {
    console.log('GAME OVER!');
    this.status = this.END;
    $('#gameOver').openModal();
  };

  /**
  BootStrap Sudoku game
  */
  Sudoku.prototype.run = function() {
    this.status = this.RUNNING;
    var t = this;
    this.sudokuBoardDraw();
    //click on board cell
    $('#' + this.id + ' .sudoku_board .cell').on('click', function(e) {
      t.cellSelect(this);
    });

    $('#' + this.id + ' .board_console .num').on('click', function(e) {
      var value = $.isNumeric($(this).text()) ? parseInt($(this).text()) : 0,
        clickRemove = $(this).hasClass('remove'),
        numSelected = $(this).hasClass('selected');
      if (value !== 0) {
        t.addValue(value).hideConsole();
      } else {
        t.hideConsole();
      }
    });

    //click outer console
    $('#' + this.id + ' .board_console_container').on('click', function(e) {
      if ($(e.target).is('.board_console_container')) {
        $(this).fadeOut(500);
      }
    });

    $('#gameOver .modal-footer a').on('click', function() {
      //$('#gameOver').closeModal().game.init().run();
    });

    $(window).resize(function() {
      t.resizeWindow();
    });
  };

  /*Step before real Game BootStrap
   */
  var initializeSudoku = function() {
    $('.modal-trigger').leanModal();
    $('.preloader-wrapper').remove();
    $('head').append('<meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width,height=device-height,target-densitydpi=device-dpi,user-scalable=yes" />');
    var game = new Sudoku({
      id: 'game_container',
      fixCellsNr: 81,
      highlight: 1,
      displayTitle: 1
    });
    game.run();
    $('#startNewGame').on('click', function(e) {
      game.init().run();
    });
  };
  return {
    initialize: initializeSudoku
  };
});

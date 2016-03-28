/*RequireJS Main Config File */
requirejs.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'materialize': 'lib/Materialize/dist/js/materialize',
    'hammer': 'lib/Materialize/js/hammer.min',
    'sudoku': 'app/sudoku/sudoku'
  },

  shim: {
    "materialize": {
      deps: ['jquery','hammer']
    }
  }
});

requirejs(["jquery", "sudoku","materialize"], function($, Sudoku, Materialize) {
  Sudoku.initialize();
});

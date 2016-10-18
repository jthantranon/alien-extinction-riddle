// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<div></div>').text(dream).appendTo('ul#dreams');
    });
  });

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   dream = $('input').val();
  //   $.post('/dreams?' + $.param({dream: dream}), function() {
  //     $('<li></li>').text(dream).appendTo('ul#dreams');
  //     $('input').val('');
  //     $('input').focus();
  //   });
  // });

});

// Registering ServiceWorker
if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register( 'sw.js' ).then(function(registration) {

    // Registration was successful
    $( '.console__serviceworker span' ).text( 'ServiceWorker registration successful. Scope: ' + registration.scope )
  }).catch(function(err) {

    // Registration failed with error
     $( '.console__serviceworker span' ).text( 'ServiceWorker registration failed' + err);
  });
}

$(document).ready(function () {

    // Simple note list for demo
    var noteList = function() {

      var $noteList         = $(' .notepad__list' ),
          $noteListItem     = $( '.notepad__list-item' ),
          $noteForm         = $( '.notepad__form' ),
          $noteFormInput    = $( '.notepad__form-input' ),
          i                 = 0;

      function displayNotes() {
        for (i = 0; i < localStorage.length; i++) {
          var noteID = 'task-' + i;

          // Build note list
          $noteList.append("<li class='notepad__list-item' id='" + noteID + "'>" + localStorage.getItem(noteID) + "</li>");
        }
      }

      function storeNote() {
        if ( $noteFormInput.val() !== '' ) {

            var noteID      = 'task-' + i,
                task        = $( '#' + noteID ),
                taskMessage = $noteFormInput.val();

            localStorage.setItem( noteID, taskMessage );

            // Add to note list
            $noteList.append( "<li class='notepad__list-item' id='" + noteID + "'>" + taskMessage + "</li>" );

            // Reset
            task.css( 'display', 'none' );
            task.slideDown();
            $noteFormInput.val('');
            i++;
        }
      }

      function removeNote( noteItem ) {
        var noteID    = noteItem.attr( 'id' );
        
        localStorage.removeItem( noteID );
        noteItem.slideUp(300, function () {
            noteItem.remove();
        });
      }

      function bindEvents() {

        // Show any existing notes from localStorage
        displayNotes();

        // Create new note
        $noteForm.submit(function() {
            storeNote();
            return false;
        });

        // Remove existing note
        $noteList.on( 'click', 'li', function () {
          var item = $(this);
          removeNote( item );
        });
      }

      bindEvents();
    };

    noteList();
});

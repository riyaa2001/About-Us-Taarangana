$(document).ready(function() {

  var curPage = 1;
  var numOfPages = $(".skw-page").length;
  var animTime = 1000;
  var scrolling = false;
  var pgPrefix = ".skw-page-";

  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    $(pgPrefix + (curPage - 1)).addClass("inactive");
    $(pgPrefix + (curPage + 1)).removeClass("active");

    setTimeout(function() {
      scrolling = false;
    }, animTime);
  };

  function navigateUp() {
    if (curPage === 1) return;
    curPage--;
    pagination();
  };

  function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;
    pagination();
  };
  $(document).on("mousewheel DOMMouseScroll ", function(e) {
    if (scrolling) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
      flag=true;
    }

  });


  (function (window, document) {

      'use strict';

      // patch CustomEvent to allow constructor creation (IE/Chrome) - resolved once initCustomEvent no longer exists
      if ('initCustomEvent' in document.createEvent('CustomEvent')) {

          window.CustomEvent = function (event, params) {

              params = params || { bubbles: false, cancelable: false, detail: undefined };

              var evt = document.createEvent('CustomEvent');
              evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
              return evt;
          };

          window.CustomEvent.prototype = window.Event.prototype;
      }

      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);
      document.addEventListener('touchend', handleTouchEnd, false);

      var xDown = null;
      var yDown = null;
      var xDiff = null;
      var yDiff = null;
      var timeDown = null;
      var startEl = null;

      function handleTouchEnd(e) {

          // if the user released on a different target, cancel!
          if (startEl !== e.target) return;

          var swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);    // default 10px
          var swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);      // default 1000ms
          var timeDiff = Date.now() - timeDown;
          var eventType = '';

          if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
              if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                  if (xDiff > 0) {
                      eventType = 'swiped-left';
                  }
                  else {
                      eventType = 'swiped-right';
                  }
              }
          }
          else {
              if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                  if (yDiff > 0) {
                      eventType = 'swiped-up';
                      navigateDown();
                  }
                  else {
                      eventType = 'swiped-down';
                      navigateUp();
                  }
              }
          }

          if (eventType !== '') {

              // fire event on the element that started the swipe
              startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));

              if (console && console.log) console.log(eventType + ' fired on ' + startEl.tagName);
          }

          // reset values
          xDown = null;
          yDown = null;
          timeDown = null;
      }

      function handleTouchStart(e) {

          // if the element has data-swipe-ignore="true" we stop listening for swipe events
          if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

          startEl = e.target;

          timeDown = Date.now();
          xDown = e.touches[0].clientX;
          yDown = e.touches[0].clientY;
          xDiff = 0;
          yDiff = 0;
      }

      function handleTouchMove(e) {

          if (!xDown || !yDown) return;

          var xUp = e.touches[0].clientX;
          var yUp = e.touches[0].clientY;

          xDiff = xDown - xUp;
          yDiff = yDown - yUp;
      }

  }(window, document));



  $(document).on("keydown", function(e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });

});

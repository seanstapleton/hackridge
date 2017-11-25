(function() {
  $(document).ready(function() {

    var faqs;

    $.getJSON("/data/faq.json", function(res) {
      faqs = res;
      var faq_container = $("<div class='faq-container-div'></div>");
      for (var i = 0; i < faqs.length; i++) {
        var container = $("<div class='faq-container'></div>");
        var question = $("<h2></h2>").text(faqs[i].Q);
        var answer = $("<p></p>").text(faqs[i].A);
        container.append(question,answer);
        faq_container.append(container);
      }
      $("#faq").append(faq_container);
    });

    AOS.init({
      duration: 1000
    });

    $.fn.extend({
      animateCss: function (animationName) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          this.addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
          });
      }
    });

    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 2000);
            return false;
          }
        }
      });
    });


  });
}());

(function() {
  $(document).ready(function() {

    var faqs;

    $.getJSON("/data/faq.json", function(res) {
      faqs = res;
      for (var i = 0; i < faqs.length; i++) {
        var container = $("<div class='faq-container'></div>");
        var question = $("<h2></h2>").text(faqs[i].Q);
        var answer = $("<p></p>").text(faqs[i].A);
        container.append(question,answer);
        $("#faq").append(container);
      }
    });


  });
}());

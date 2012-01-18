$(function() {
  section_template = '<li><a href="#{{id}}" section="{{id}}" class="{{id}}" i="{{i}}">{{title}}</a></li>'; 
  sections_html = new Array;
  $('#main section').each(function(i) {
    s = $(this);
    sections_html.push(Mustache.to_html(section_template, {
      'id': s.attr('id'),
      'title': s.attr('title'),
      'i': i
    }));
    s.attr('i', i);
  });
  header_html = '<header><ul>'+sections_html.join('\n')+'</ul></header>';

  $('#main section').each(function(i) {
    var local_head = header_html;
    var domRep = $(local_head);
    var s = $(this);
    var id =  s.attr("id");
    domRep.find('.'+id).addClass("selected");
    s.prepend(domRep);
  });
});
$(function(){
  $('section header a').click(function(e) {
    a = $(this);
    b =  $("#"+a.attr('section'));
    e.preventDefault();
    start = $(window).scrollTop();
    end = b.offset().top;
    dist = start - end;
    if(start < end) {
      dist = dist*-1;
    }

    $('html,body').animate({scrollTop: b.offset().top},1.5*dist);
  });
});

(function(){
  
  module("Basic DOM building");
  
  test("simple dom building",function(){
    // dom element with no content
    equals(
      cabin("li").nodeType,
      document.createElement("li").nodeType,
      "Simple li with text inside");
    // dom element with text content
    equals(
      cabin("li","Fresh").outerHTML,
      "<li>Fresh</li>","Sets interior text properly");
    equals(
      cabin("li",cabin("span","Nice")).outerHTML,
      "<li><span>Nice</span></li>", "Sets inner html with span inside");
  });
  
  test("true textNode additions",function(){
    equals(
      cabin("text","fresh").nodeType,
      document.createTextNode("fresh").nodeType,
      "can build a true text node");
  });
  
  test("setting id and class and nesting with dom css selectors",function(){
    // setting attributes with a selector
    equals(
      cabin("li#fresh").id,
      "fresh", "Sets the id properly");
    equals(
      cabin("li.super.fresh").className,
      "super fresh", "Sets classes properly");
    // nesting elements
    equals(
      cabin("li div span.name em").outerHTML,
      "<li><div><span class=\"name\"><em></em></span></div></li>",
      "Setting nested selectors correctly");
  });
  
  test("setting attributes with attribute hash",function(){
    // setting other attributes with explicit hash
    equals(
      cabin("div",{ rel: "okay" }).getAttribute("rel"),
      "okay", "Sets rel properly through object literal");
    equals(
      cabin("div",{ "data-fresh": "very" }).getAttribute("data-fresh"),
      "very", "Sets data- attribute properly");
  });
  
  test("using the curry function for a short cabin reference",function(){
    var curried = cabin.curry(function(o){
      return o;
    });
    equals(curried(),cabin,"the enclosed variable equals the original cabin variable");
  });
  
})();
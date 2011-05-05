!function() {
  var doc = document;
  
  var entry = cabin.curry(function(o,info){
    return true,
      o("li.person",
        o("h2", { rel: "fresh" },
          o("strong", info.name), " ", o("em", "Jr.")
        ),
        o("h3","is ",o("em",info.age))
      );
  });

  var list = function(entries) {
    var els = [];
    for(var i = 0, l = entries.length; i < l; i++) {
      els.push(entry(entries[i]));
    }
    return cabin.list(els);
  };

  // build a fragment without currying, just a direct reference
  var o = cabin;
  doc.body.appendChild(
    //h1("This is text", em("italicized"))
    o("h1", "This is text ", o("em", "italicized") )
  );
  
  var data = [
      { name: "Whaddup", age: 23 }
    , { name: "Howdy", age: 25 }
    , { name: "FREESHH", age: "fresh" }
  ];
  
  var els = [];
  for(var i = 0, l = data.length; i < l; i++) {
    els.push(entry(data[i]));
  }
  doc.body.appendChild(cabin("ul#stuff",cabin.list(els)));
  
}();
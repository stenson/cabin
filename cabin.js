var cabin = (function(){
  var doc = document
    , toA = function(args) {
        return Array.prototype.slice.apply(args);
      }
    , extract = function(pattern,str) {
        var matches = [];
        str.replace(pattern,function(_,c){
          matches.push(c);
        });
        return matches;
      }
    , lastTag = /[^\s]+$/
    , elR = /^[^\.#]+/
    , idR = /#([^\.$]+)/
    , classR = /\.([^\.$#]+)/g
    // borowed from underscore
    , isStringNumber = function(o) {
        return !!(o === '' || (o && o.charCodeAt && o.substr));
      }
    , curry = function(fn) {
        var args = toA(arguments).slice(1);
        return function() {
          return fn.apply(null,args.concat(toA(arguments)));
        };
      }
    
  // the building function
  var build = function(selector,duck) {
    // quick check, different case for text nodes
    if(tag == "text") return doc.createTextNode(duck);
    
    var tag = lastTag.exec(selector)[0]
      , nest = selector.slice(0,-tag.length-1)
      , noOpts = duck.nodeType || isStringNumber(duck)
      , opts = noOpts ? {} : duck
      , kids = toA(arguments).slice(noOpts ? 1 : 2)
      , id = idR.exec(tag)
      , classes = extract(classR,tag)
      , el = doc.createElement(elR.exec(tag));
    
    for(var o in opts) {
      if(opts.hasOwnProperty(o)) el.setAttribute(o,opts[o]);
    }
    // if there's an id, get the good match
    if(id) el.id = id[1];
    // make a string out of the classes
    if(classes.length) el.className = classes.join(" ");
    // if no kids, just blank text
    if(!kids.length) kids.push("");
    // now the actual appending
    for(var i = 0, l = kids.length; i < l; i++) {
      var kid = kids[i];
      el.appendChild(kid.nodeType ? kid : doc.createTextNode(kid));
    }
    // recurse on nest if there is one
    return nest ? build(nest,el) : el;
  };
  
  build.list = function(entries) {
    var fragment = doc.createDocumentFragment();
    for(var i = 0, l = entries.length; i < l; i++) {
      fragment.appendChild(entries[i]);
    }
    return fragment;
  };
  
  build.curry = function(fn) {
    return curry(fn,build);
  };
  
  return build;
})();
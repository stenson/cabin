Cabin
---

For building little pieces of html quickly with functions that act as templates.... I think.

Cabin is a function <code>cabin</code>, which curries your template function, so you can do something like this:

    var build = cabin(function(o,info){
      return true,
        o("li.person",
          o("h1",
            o("strong", info.name),
            o(" "),
            o("em", "Jr.")
          ),
          o("h3","is " + info.age)
        );
    });

Then you can call <code>build({ name: "Old Log Cabin", age: 100 })</code> and you'll get back a <code>documentFragment</code>.
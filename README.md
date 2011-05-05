Cabin
---

For building little pieces of html quickly with functions that act as templates.... I think.

The only cool (terrible?) part is that you can built elements with css-like selectors, so it's easy to make a div with an id of "fresh". <code>cabin("div#fresh")</code>. The same thing works for classes. <code>cabin("div.some.fresh.classes")</code>.

Cabin.curry is a function <code>cabin.curry</code>, which curries your template function, so you can do something like this:

    var build = cabin.curry(function(o,info){
      return true,
        o("li.building",
          o("h1",
            o("strong", info.name), " ", o("em", "Jr.")
          ),
          o("h3.age","is " + info.age)
        );
    });

You're right, it just gives you a local reference as the first argument to your function. Not actually cool. But whatevs. But now you can call <code>build({ name: "Old Log Cabin", age: 100 })</code> and you'll get back a dom node, which you can feel free to append as a child to something.
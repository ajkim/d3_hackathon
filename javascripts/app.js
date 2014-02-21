var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);
    console.log(bubble, "this is the bubble");

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
    console.log(svg, "this is the svg");

 var dthreeFunc = function(root) 
 {
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });



  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });
      //transitioning radius from 0 to full here
      //where on mouseover-ing it will hover opacity and allow you to clickthru to site url

  node.append("circle")
      .attr("r", 0)
      .on("mouseenter", function() { d3.select(this).attr("opacity", .5); })
      .on("mouseleave", function() { d3.select(this).attr("opacity", 1); })
      .on('click', function(d) {
          document.location.href = d.url;
        })
      .transition()
      .duration(3000)
      .attr("r", function(d) 
      { 
        return d.r;
      })
      .style("fill", function(d) { return color(d.packageName); })
      ;



  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); })
      // .transition()
      // .duration(5000);

      var tooltip = d3.select("circle")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("hello");
}
      ;

   

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

//pushing hashes into an array here, renamed our keyvalue set, can add year here too
  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, url: node.url});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

dthreeFunc(companies);

function bindClickEvents(){
d3.selectAll('node').selectAll(".node").on('mouseover', function(){
  console.log('this');
})
};



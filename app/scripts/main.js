var svg,
    bubble,
    count = 0,
    color,
    interval;

$(document).on('ready', function() {
  'user strict';

  createBubbleChart();
  drawPies();

  // try expand the menu for the hero
  $('.open-selector').on('click', function() {

    console.log('clicked on the button');

    if($(this).attr('data-open') === "true") {
      $(this).attr('data-open', "false");
      return $('.selector-box').css('display', 'none');
    }

    // set it to open
    $(this).attr('data-open', "true");

    $('.selector-box').css({
      'top': $('.open-selector').offset().top,
      'left': $('.open-selector').offset().left,
      'display': 'block',
      '-webkit-transform-origin': '27px 382px;'
    })
  });

  $('.start-animation').on('click', function() {
    count = 0;
    interval = setInterval(draw, 1000)
  })

  $('.progress-start').on('click', function() {
    $('.progress-bar').css('width', '90%');
    $('.progress-percent').text('90%');
  });

});

function draw() {
      if(!data[count]) {
        return clearInterval(interval);
      }

      redraw(data[count]);
      count++;
}


function drawPies() {
  console.log('drawing pies')
  var chart1 = c3.generate({
    data: {
      bindto: '#pie1',
        // iris data from R
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type : 'pie',
    }
  });

  var pie2 = c3.generate({
    data: {
      bindto: '#pie2',
        // iris data from R
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type : 'pie',
    }
  });

  var pie3 = c3.generate({
    data: {
      bindto: '#pie3',
        // iris data from R
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type : 'pie',
    }
  });
}

function createBubbleChart() {

  console.log('creating bubble chart')

  var diameter = 450,
      height = 450,
      format = d3.format(",d");

      color = d3.scale.category20c();

  bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  svg = d3.select('#coolAsFuckTreeContainer').append("svg")
      .attr("width", diameter)
      .attr("height", height)
      .attr("class", "bubble");

  var root = {
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 3938}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 2222}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 6785}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 989}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 3445}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 5647}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 5847}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 3453}
    ]
  }
  ]
}

    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
        .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        //.style("fill", function(d) { return d3.hsl("123", "100%", d.packageName+"%"); })
        .style("fill", function (d){ console.log("rgb(31, 119, "+ d.r +")"); return "hsl(106, 100%, "+ (100 - Math.floor(d.r)) +"%)"})
        // .style("fill", function(d) { return color(d.packageName); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className.substring(0, d.r / 3); });

}

function redraw(data) {

        // asign new data to existing layout
        var node = svg.selectAll(".node")
           .data(bubble.nodes(classes(data))
           .filter(function(d) { return !d.children; }));

        // access brand new data
        node.enter().append("g")
                .classed("node", true)
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .append("circle")
                .transition();

        node.transition()
            .duration(500)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.select("circle")
            .transition()
            .duration(500)
            .attr("r", function (d) { return d.r; })
            .style("fill", function (d){ console.log("rgb(31, 119, "+ d.r +")"); return "hsl(106, 100%, "+ (100 - Math.floor(d.r)) +"%)"})

        node.append("text")
            .text(function (d) { return d.name; });
};

var data = [{
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 3000}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 3226}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 2967}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 4563}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 1982}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 5463}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 1837}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 4000}
    ]
  }
  ]
},{
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 2345}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 3456}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 2343}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 4532}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 2342}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 4345}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 6574}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 2435}
    ]
  }
  ]
},{
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 2643}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 1000}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 3000}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 4000}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 3000}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 2989}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 2000}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 1000}
    ]
  }
  ]
},{
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 2342}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 3454}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 2323}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 7623}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 4362}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 3847}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 2746}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 3652}
    ]
  }
  ]
},{
 "name": "flare",
 "children": [
  {
   "name": "Bowland",
   "children": [
      {"name": "Bowland", "size": 2000}
    ]
  },
  {
   "name": "Fylde",
   "children": [
      {"name": "Fylde", "size": 2343}
    ]
  },
  {
   "name": "Lonsdale",
   "children": [
      {"name": "Lonsdale", "size": 2983}
    ]
  },
  {
   "name": "County",
   "children": [
      {"name": "County", "size": 3245}
    ]
  },
  {
   "name": "Pendle",
   "children": [
      {"name": "Pendle", "size": 2898}
    ]
  },
  {
   "name": "Furness",
   "children": [
      {"name": "Furness", "size": 3423}
    ]
  },
  {
   "name": "Cartmel",
   "children": [
      {"name": "Cartmel", "size": 1999}
    ]
  },
  {
   "name": "Graduate",
   "children": [
      {"name": "Graduate", "size": 2324}
    ]
  }
  ]
}]

function classes(root) {
  var classes = [];
  console.log('classes func', root);

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}


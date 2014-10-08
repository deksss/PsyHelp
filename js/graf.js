function drawGraf( data, targetView ) {

    var margin = {
            top: 20,
            right: 120,
            bottom: 20,
            left: 120
        },
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.x, d.y];
        });
    d3.select("svg")
        .remove();
    var svg = d3.select(targetView).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // load the external data
    d3.json(data, function(error, treeData) {
        root = treeData[0];
        update(root);
    });


    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);


        // Normalize for fixed-depth. тут вычисляеться растояние между нодами
        nodes.forEach(function(d) {
            d.y = d.depth * 50;
        });

        // Declare the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id || (d.id = ++i);
            });

        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        var circles = nodeEnter.filter(function(d) {
                return d.figure == "rhomb"
            })
            .append("rect")
            .attr("width", 40)
            .attr("height", 40)
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("transform", "translate(" + (-100) + ", 0)")
            .attr("transform", "rotate(45)")  
            ;

        var rect = nodeEnter.filter(function(d) {
                return d.figure == "rect"
            })
            .append("rect")
            .attr("width", 40)
            .attr("height", 40)
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("transform", "translate(" + (-20) + ", 0)")
            ;

        var rect = nodeEnter.filter(function(d) {
                return d.figure == "line"
            })
            .append("rect")
            .attr("width", 1)
            .attr("height", 1)
            .attr("rx", 1)
            .attr("ry", 1);

        nodeEnter.append("text")
            .attr("x", function(d) {
                return d.children || d._children ? 30 : -13;
            })
            .attr("y", +10)
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.name;
            })
            .style("fill-opacity", 1);

        // Declare the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) {
                return d.target.id;
            });

        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", diagonal);
    }
}
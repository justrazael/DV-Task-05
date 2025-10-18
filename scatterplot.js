// scatter-plot.js
d3.csv("data/Ex5_TV_energy.csv").then(function(data) {
    // Parse data
    data.forEach(d => {
        d.energy_consumpt = +d.energy_consumpt;
        d.star2 = +d.star2;
    });

    // Set up dynamic SVG dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = window.innerWidth * 0.45 - margin.left - margin.right; // 45% of window width
    const height = 400;

    const svg = d3.select("#scatter-plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up scales (invert x and y axes)
    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.star2)]).range([0, width]);  // star2 on x-axis
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.energy_consumpt)]).range([height, 0]);  // energy_consumpt on y-axis

    // Add axes (swap x and y axes)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add scatter plot points
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.star2))  // Use star2 for the x position
        .attr("cy", d => y(d.energy_consumpt))  // Use energy_consumpt for the y position
        .attr("r", 5)
        .style("fill", "steelblue");
});

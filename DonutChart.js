// donut-chart.js
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(function(data) {
    // Set up dynamic SVG dimensions
    const width = window.innerWidth * 0.45;  // 45% of window width
    const height = 450;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Set up color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up pie chart
    const svg = d3.select("#donut-chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Set up pie chart data
    const pie = d3.pie().value(d => d["Mean(Labelled energy consumption (kWh/year))"]);

    // Set up arc generator
    const arc = d3.arc().outerRadius(radius).innerRadius(radius - 100);
    const labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40); // Arc for labels

    // Create the pie chart
    const paths = svg.selectAll("path")
        .data(pie(data))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i));

    // Add labels to the slices
    svg.selectAll("text")
        .data(pie(data))
        .enter().append("text")
        .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")  // Position the text on the arc
        .attr("dy", ".35em")  // Adjust vertical positioning
        .attr("text-anchor", "middle")  // Center the text
        .text(d => d.data.Screen_Tech)  // Display the screen technology name or other relevant data
        .style("font-size", "14px")
        .style("fill", "white");
});

// line-chart.js
d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(function(data) {
    // Parse the data to ensure the "Year" is treated as an integer
    data.forEach(d => {
        d.Year = +d.Year; // Ensure the Year is a number
        d["Average Price (notTas-Snowy)"] = +d["Average Price (notTas-Snowy)"]; // Ensure price is a number
    });

    // Set up dynamic SVG dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = window.innerWidth * 0.45 - margin.left - margin.right; // 45% of window width
    const height = 400;

    const svg = d3.select("#line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up x scale (years should be discrete)
    const x = d3.scaleBand()
        .domain(data.map(d => d.Year))  // Use the Year as a band (discrete)
        .range([0, width])
        .padding(0.1); // Add some padding between bars

    // Set up y scale (spot price)
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Average Price (notTas-Snowy)"])])
        .range([height, 0]);

    // Add line for average price
    const line = d3.line()
        .x(d => x(d.Year) + x.bandwidth() / 2) // Adjust to place the line correctly at the center of each band
        .y(d => y(d["Average Price (notTas-Snowy)"]));

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", "steelblue")
        .style("fill", "none")
        .style("stroke-width", 2);

    // Add x axis with customized ticks (every 2nd year)
    const tickValues = data.filter((d, i) => i % 2 === 0).map(d => d.Year); // Filter every other year for ticks
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(d3.format("d"))); // Format x-axis ticks as integers (years)

    // Add y axis
    svg.append("g")
        .call(d3.axisLeft(y));
});

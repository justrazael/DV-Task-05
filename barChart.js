// bar-chart.js
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(function(data) {
    // Set up dynamic SVG dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = window.innerWidth * 0.45 - margin.left - margin.right; // 45% of window width
    const height = 400;

    const svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up x scale
    const x = d3.scaleBand().domain(data.map(d => d.Screen_Tech)).range([0, width]).padding(0.1);

    // Set up y scale
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d["Mean(Labelled energy consumption (kWh/year))"])]).range([height, 0]);

    // Add bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Screen_Tech))
        .attr("y", d => y(d["Mean(Labelled energy consumption (kWh/year))"]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d["Mean(Labelled energy consumption (kWh/year))"]))
        .attr("fill", "steelblue");

    // Add x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add y axis
    svg.append("g")
        .call(d3.axisLeft(y));
});

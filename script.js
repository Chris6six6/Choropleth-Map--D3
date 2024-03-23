(async () => {
    // Fetch data
    const [educationData, countyMapa] = await Promise.all([
        d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'),
        d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json') ]);

    // Map education data to county FIPS
    const educationMap = {};
    educationData.forEach(d => {
            educationMap[d.fips] = {
            state: d.state,
            area_name: d.area_name,
            education: d.bachelorsOrHigher
        };
    });

    // Create SVG container
    const svg = d3.select('body')
        .append('svg')
        .attr('width', 950)
        .attr('height', 600)

    // Draw counties
    svg.selectAll('.county')
        .data(topojson.feature(countyMapa, countyMapa.objects.counties).features)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => educationMap[d.id]?.education || 0) // Default to 0 if data is missing
        .attr('fill', d => {
            const education = educationMap[d.id]?.education || 0;
            return education <= 5 ? '#f1eef6' :
                    education <= 15 ? '#d0d1e6' :
                    education <= 25 ? '#a6bddb' :
                    education <= 35 ? '#74a9cf' :
                    education <= 45 ? '#3690c0' :
                    education <= 55 ? '#0570b0' : '#045a8d';
        })
        .attr('d', d3.geoPath())
        .on('mouseover', function (event, d) {
            // Cuando se activa el evento mouseover, se muestra el tooltip
            tooltip.transition()
                .duration(200) // Duración de la transición
                .style('opacity', 0.9) // Hace visible el tooltip
                .attr('data-education', educationMap[d.id].education);
            // Establece el contenido del tooltip
            tooltip.html(`${educationMap[d.id].area_name || 'Unknown'}, ${educationMap[d.id].state}: ${educationMap[d.id].education}%`)
                .style('left', (event.pageX + 10) + 'px') // Posiciona el tooltip horizontalmente
                .style('top', (event.pageY + 10) + 'px') // Posiciona el tooltip verticalmente
                .style("background-color", "black")
        })
        .on('mouseout', function (d) {
            // Cuando se activa el evento mouseout, se oculta el tooltip
            tooltip.transition()
                .duration(100) // Duración de la transición
                .style('opacity', 0); // Oculta el tooltip
        });

    // Crea el tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0) // Establece la opacidad inicial del tooltip
        .style("position", "absolute")
        .style("background-color", "steelblue") // Color de fondo del tooltip
        .style("color", "#fff") // Color del texto del tooltip
        .style("padding", "10px") // Añade un relleno al tooltip
        .style("font-size", "15px") // Establece el tamaño de fuente del tooltip
        .style("text-align", "left"); // Alinea el texto a la izquierda    

    // Define la escala lineal para el eje x del legend
    var x = d3.scaleLinear()
    .domain([2.6, 75.1]) // Establece el dominio de la escala lineal (valor mínimo y máximo)
    .rangeRound([600, 860]); // Mapea el dominio al rango (posición mínima y máxima)

    var color = d3.scaleThreshold()
    .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8)) // Divide el rango del dominio en intervalos discretos
    .range(d3.schemeBlues[9]); // Define la paleta de colores para los intervalos discretos

    // Crea un grupo SVG para el legendario y lo posiciona
    var g = svg.append('g')
    .attr('class', 'key')
    .attr('id', 'legend')
    .attr('transform', 'translate(0,40)');

    // Agrega rectángulos coloreados al legendario, uno para cada intervalo de color
    g.selectAll('rect')
    .data(color.range().map(d => color.invertExtent(d)))
    .enter()
    .append('rect')
    .attr('height', 8) // Altura del rectángulo
    .attr('x', d => x(d[0])) // Posición horizontal del rectángulo
    .attr('width', d => d[0] && d[1] ? x(d[1]) - x(d[0]) : x(null)) // Ancho del rectángulo
    .attr('fill', d => color(d[0])); // Color del rectángulo

    // Añade el eje x al legendario
    g.call(d3.axisBottom(x)
    .tickSize(13) // Longitud de las marcas del eje
    .tickFormat(x => Math.round(x) + '%') // Formato de las marcas del eje
    .tickValues(color.domain())) // Valores a mostrar en el eje
    .select('.domain') // Selecciona la línea del eje
    .remove(); // Elimina la línea del eje

})();
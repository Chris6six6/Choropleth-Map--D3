# Choropleth Map Visualization Project

This project is a choropleth map visualization displaying education data across US counties. It fulfills the requirements set forth by FreeCodeCamp's Data Visualization curriculum.

## Project Description

The choropleth map displays US counties with different fill colors representing education levels. It includes features such as a title, description, legend, and tooltip for interactive exploration of the data.

## User Stories

1. My choropleth should have a title with a corresponding id="title".
2. My choropleth should have a description element with a corresponding id="description".
3. My choropleth should have counties with a corresponding class="county" that represent the data.
4. There should be at least 4 different fill colors used for the counties.
5. My counties should each have data-fips and data-education properties containing their corresponding fips and education values.
6. My choropleth should have a county for each provided data point.
7. The counties should have data-fips and data-education values that match the sample data.
8. My choropleth should have a legend with a corresponding id="legend".
9. There should be at least 4 different fill colors used for the legend.
10. I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
11. My tooltip should have a data-education property that corresponds to the data-education of the active area.

## Technologies Used

- HTML
- CSS
- JavaScript
- D3.js (Data-Driven Documents)

## Datasets

The datasets required for this project can be found below:
- [US Education Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json)
- [US County Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json)

## Project Structure

The project includes HTML, CSS, and JavaScript files. The HTML file contains the structure of the webpage, including DOM elements for the visualization. The CSS file styles the webpage elements for better presentation. The JavaScript file contains the logic to fetch the datasets, process the data, and create the choropleth map visualization using D3.js.

## Usage

To view the choropleth map visualization, simply open the HTML file in a web browser.

## Acknowledgments

- [FreeCodeCamp](https://www.freecodecamp.org/) for providing the project requirements and datasets.
- D3.js community for the powerful data visualization library.
- Developers contributing to open datasets for educational purposes.

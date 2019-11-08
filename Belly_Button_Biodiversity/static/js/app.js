async function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`
  const metaData = await d3.json(url).catch(e => e.console.warn(e));
  // console.log(metaData)

  // Use d3 to select the panel with id of `#sample-metadata`
  var metaDataSelector = d3.select("#sample-metadata");
    
  // Use `.html("") to clear any existing metadata
  metaDataSelector.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  Object.entries(metaData).forEach(([key, value]) => {
    metaDataSelector.append("li").text(`${key}: ${value}`)
  });

};

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

async function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  url2 = `/samples/${sample}`
  const sampleData = await d3.json(url2).catch(e => e.console.warn(e));

  Object.entries(sampleData).forEach(([key, value]) => {
   console.log(`${key}: ${value}`)
  });

  // @TODO: Build a Bubble Chart using the sample data

    

  // var trace1 = {
  //   x: [1, 2, 3, 4],
  //   y: [10, 11, 12, 13],
  //   mode: 'markers',
  //   marker: {
  //     size: [40, 60, 80, 100]
  //   }
  // };
  
  // var data = [trace1];
  
  // var layout = {
  //   title: 'Marker Size',
  //   showlegend: false,
  //   height: 600,
  //   width: 600
  // };
  
  // Plotly.newPlot('myDiv', data, layout);

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).

  // Slices first two names
  const left = names.slice(0, 10);
  console.log(left);

  // var data = [{
  //   values: [sample_values],
  //   labels: [otu_ids],
  //   type: 'pie'
  // }];
  
  // var layout = {
  //   height: 400,
  //   width: 500
  // };

   // Plotly.newPlot('myDiv', data, layout);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

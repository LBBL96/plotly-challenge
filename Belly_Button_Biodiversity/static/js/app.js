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

async function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  url2 = `/samples/${sample}`
  const sampleData = await d3.json(url2).catch(e => e.console.warn(e));

  // Build a Bubble Chart using the sample data

  var trace1 = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    hoverinfo: "sampleData.otu_labels",
    mode: 'markers',
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids
    }
  };
  
  var layout = {
    title: `ID: ${sample}`,
  };
  
  Plotly.newPlot('bubble', [trace1], layout);

  // Build a Pie Chart
 
  // Slice first ten items
  const otu_10 = sampleData.otu_ids.slice(0, 10);
  const labels_10 = sampleData.otu_labels.slice(0, 10);
  const sample_10 = sampleData.sample_values.slice(0, 10);
 
  var data = [{
    values: sample_10,
    labels: otu_10,
    hoverinfo: labels_10,
    type: 'pie'
  }];
  
  var layout = {
    title: "Top 10"
  };

   Plotly.newPlot('pie', data, layout);
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

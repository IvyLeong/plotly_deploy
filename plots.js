function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("id:"+ result.id);
      PANEL.append("h6").text("ethnicity:"+ result.ethnicity);
      PANEL.append("h6").text("gender:"+ result.gender);
      PANEL.append("h6").text("age:"+ result.age);
      PANEL.append("h6").text("location:"+ result.location);
      PANEL.append("h6").text("bbtype:"+ result.bbtype);
      PANEL.append("h6").text("wfreq:"+ result.wfreq);
    });
  }
  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      
      var toptenbacteriaid = result.otu_ids.slice(0,10).map(x=>"OTU" + x.toString()).reverse();
      var toptenbacteriavalue = result.sample_values.slice(0,10).reverse();
      var trace = {
       x: toptenbacteriavalue,
       y: toptenbacteriaid,
       type: "bar",
       orientation:'h'
      };
      var data = [trace];
      var layout = {
      title: "Top Ten Bacteria",
      xaxis: { title: "sample_values" },
      yaxis: { title: "otu_id"}
      };
      Plotly.newPlot("bar", data, layout);

      var bacteriaidbb = result.otu_ids;
      var bacteriavalue = result.sample_values;
      var bacterianame = result.otu_labels;
      var trace1 = {
        x: bacteriaidbb,
        y: bacteriavalue,
        mode: 'markers',
        text: bacterianame, 
        marker:{color:"bacteriaidbb", size: bacteriavalue, color_continuous_scale: ["blue", "green", "brown"]}
      };
      
      var data = [trace1];
      
      var layout = {
        showlegend: false,
        height: 600,
        width: 1000
      };
      
      Plotly.newPlot('bubble', data, layout);

      
    });
  }
  
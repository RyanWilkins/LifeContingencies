import { current } from "@reduxjs/toolkit";
import * as d3 from "d3";
import $ from "jquery";

function hover(svg, path, data, xScale, yScale, mLeft, mTop, theme) {
  if (data.length === 0) {
    return null;
  }
  if ("ontouchstart" in document)
    svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left);
  else
    svg.on("mousemove", moved).on("mouseenter", entered).on("mouseleave", left);

  const dot = d3.select("#highlightDot").raise();
  const xline = d3.select("#highlightxline").raise();
  const yline = d3.select("#highlightyline").raise();

  dot
    .append("circle")
    .attr("r", 5)
    .attr("z-index", 9999)
    .attr("fill", "none")
    .attr("stroke", theme.palette.secondary.main)
    .attr("stroke-width", 2);

  dot
    .append("text")
    .attr("fill", theme.palette.secondary.contrastText)
    .attr("id", "textone")
    .attr("text-anchor", "middle")
    .attr("y", -25);
  dot
    .append("text")
    .attr("fill", theme.palette.secondary.contrastText)
    .attr("id", "texttwo")
    .attr("text-anchor", "middle")
    .attr("y", -10);

  function moved(e) {
    //console.log(e)
    e.preventDefault();
    //console.log(this)
    var elm = $(this).offset();
    const pointer =
      e.type === "touchmove"
        ? [
            e.targetTouches[0].pageX - elm.left,
            e.targetTouches[0].pageY - elm.top,
          ]
        : d3.pointer(e, this);
    //console.log(pointer)
    const xm = xScale.invert(pointer[0] - mLeft);
    const ym = yScale.invert(pointer[1] - mTop);
    // console.log(xm,ym)
    const i = d3.bisectCenter([...Array(100).keys()], xm);
    //console.log(i)
    const s = d3.least(data, (d) => Math.abs(d.age - xm));
    // const s = data.filter((d) => d.age === i)
    //console.log(mLeft,mTop)
    // console.log(i)
    // console.log(s)
    // path.attr("opacity", d => d === s ? 1 : 0.5).filter(d => d === s).raise();
    dot.attr(
      "transform",
      `translate(${xScale(i) + mLeft},${yScale(s.ex) + mTop})`
    );
    dot.select("#textone").text(`Age: ${s.age}`);

    dot
      .select("#texttwo")
      .text(`Expected Years: ${parseFloat(s.ex).toFixed(2)}`);

    xline
      .attr("x1", xScale(i) + mLeft)
      .attr("y1", yScale(s.ex) + mTop + 5)
      .attr("x2", xScale(i) + mLeft)
      .attr("y2", yScale(0) + mTop);

    yline
      .attr("x1", mLeft)
      .attr("y1", yScale(s.ex) + mTop)
      .attr("x2", xScale(i) + mLeft - 5)
      .attr("y2", yScale(s.ex) + mTop);
  }

  function entered(event) {
    //console.log(event)
    //console.log("Entered")
    // path.style("mix-blend-mode", null).attr("opacity", 0.5);
    dot.attr("display", null);
    xline.attr("display", null);
    yline.attr("display", null);
  }

  function left() {
    // path.style("mix-blend-mode", "multiply").attr("opacity", 1);
    dot.attr("display", "none");
    xline.attr("display", "none");
    yline.attr("display", "none");
  }
}

export const renderGraph = (data, cur_age, table_name, average_age, final_age, theme, mobile, resizing = false) => {
  var svg = d3.select("#ex-graph");

  // console.log(data);

  var height = $("#ex-graph-container").height();
  var width = $("#ex-graph-container").width();
  var vb = "0 0 " + width + " " + height;
  svg.attr("height", height)
  svg.attr("width", width)

  svg.attr("viewBox", vb);
  // console.log(width)
  // console.log(vb);

  const margin = {
    top: 50,
    bottom: 50,
    left: 60,
    right: 30,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // console.log("InnerHeight: " + innerWidth)

  // define scales

  const xScale = d3.scaleLinear().domain([0, final_age ? final_age.age : 100]).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

  var graph = svg.selectAll(".graphGroup").data([`${height},${width}`], (key) => key);
  // var graph = svg.selectAll(".graphGroup").data([null])


  graph.exit().remove()

  var graphEnter = graph
    .enter()
    .append("g")
    .attr("class", "graphGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  graphEnter
    .append("rect")
    .attr("x", "0")
    .attr("y", "0")
    .attr("height", innerHeight)
    .attr("width", innerWidth)
    .attr("fill", theme.palette.grey['700'])
    // .attr("opacity", "0.1")
    .attr("rx", "5");

    svg.append("g").attr("id", "highlightDot").remove()
    svg.append("line").attr("id", "highlightxline").remove()
    svg.append("line").attr("id", "highlightyline").remove()

  svg.append("g").attr("id", "highlightDot").attr("display", "none");
  svg.append("line").attr("id", "highlightxline").attr("stroke", theme.palette.secondary.main);
  svg.append("line").attr("id", "highlightyline").attr("stroke", theme.palette.secondary.main);

  // Title Section
  graphEnter
    .append("text")
    .attr("class", "graphTitle")
    .attr("transform", `translate(${innerWidth * 0.5}, -10)`)
    .attr("text-anchor", "middle")
    .attr("font-family", theme.typography.subtitle1.fontFamily)
    .attr("fill", theme.palette.primary.contrastText)
    .attr("font-size", mobile ? "1.5em" : "2em")
    .text("Life Expectancy Curve");

  var xaxfunc = d3.axisBottom(xScale).ticks(10);

  const xaxis = svg.selectAll(".graph_xaxis").data([`${height},${width}`], (key) => key);

  xaxis
    .enter()
    .append("g")
    .attr("class", "graph_xaxis")
    .attr("transform", `translate(${margin.left}, ${margin.top + innerHeight})`)
    .call(xaxfunc)
    // .attr("font-size", null)
    // .attr("font-family", null)
    .merge(xaxis)
    .call(xaxfunc);

  // x label
  const xlabel = graphEnter.selectAll(".xaxislabel").data([`${height},${width}`]);

  xlabel
    .enter()
    .append("text")
    .attr("class", "axisLabel xaxislabel")
    .attr("font-family", theme.typography.subtitle2.fontFamily)
    .attr("fill", theme.palette.primary.contrastText)
    .attr(
      "transform",
      `translate(${innerWidth / 2},${innerHeight + margin.bottom * 0.8})`
    )
    .attr("text-anchor", "middle")
    .merge(xlabel)
    .text("Current Age");

  xaxis.exit().remove();

  const yaxis = svg.selectAll(".graph_yaxis").data([`${height},${width}`], (key) => key);

  var yaxfunc = d3
    .axisLeft(yScale)
    // .tickFormat(axis_format.y.tickFormat)
    .ticks(10);

  yaxis
  
    .enter()
    .append("g")
    .attr("class", "graph_yaxis")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(yaxfunc)
    .merge(yaxis)
    .call(yaxfunc);

  const ylabel = svg.selectAll(".yaxislabel").data([`${height},${width}`], (key) => key);

  yaxis
    .enter()
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .append("text")
    .merge(ylabel)
    .attr("font-family", theme.typography.subtitle2.fontFamily)
    .attr("fill", theme.palette.primary.contrastText)
    .text("Expected Years Remaining")
    .attr("class", "axisLabel yaxislabel")
    .attr(
      "transform",
      `translate(${-margin.left * 0.6},${innerHeight / 2})rotate(270)`
    )
    .attr("text-anchor", "middle");

  yaxis.exit().remove();
ylabel.exit().remove()
  // gridlines

  // const make_x_gridlines = () => {
  //   return d3.axisBottom().ticks(10);
  // };

  graphEnter
    .append("g")
    .attr("class", "grid")
    .attr("color", theme.palette.grey['800'])
    .call(d3.axisBottom(xScale).ticks(10).tickSize(innerHeight).tickFormat(""));

  graphEnter
    .append("g")
    .attr("class", "grid")
    .attr("color", theme.palette.grey['800'])
    .call(d3.axisLeft(yScale).ticks(10).tickSize(-innerWidth).tickFormat(""));

  // append data
  var genLine = d3
    .line()
    .x((d, i) => xScale(d.age))
    .y((d, i) => yScale(d.ex));

  // var mypath = svg.selectAll(".graphLine").data([data], (key) => {
  //   // console.log(table_name);
  //   return key[0] ? `${key[0].qx}${height}${width}` : "blank";
  // });

    // d3.select("#graphpath").remove()
  var mypath = svg.selectAll(".graphLine").data([data], () => Math.random())

  var pathentry = mypath
    .enter()
    .append("path")
    .attr("id", "graphpath")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("class", "graphLine")
    .attr("d", (d) => genLine(data))
    .attr("stroke", theme.palette.primary.light)
    .attr("stroke-width", 3)
    .attr("fill", "none")

  mypath.exit().remove();

  if (!resizing) {
    // console.log("NOT RESIZING")
    const transitionPath = d3.transition().ease(d3.easePolyIn).duration(1500);

    pathentry.each(function () {
      //console.log(this.getTotalLength())
      var pathlength = this.getTotalLength();

      d3.select(this)
        .attr("stroke-dashoffset", pathlength)
        .attr("stroke-dasharray", pathlength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);
    });
  }

  const renderLine = (agedata, color, id, label, labelwidth) => {
    d3.select("#" + id + "group").remove();
    // d3.select("#" + id).remove();

    const hlgroup = svg.append("g").attr("id", id + "group");

    hlgroup
      .append("circle")
      .attr("id", id + "circle")
      .attr("r", 5)
      .attr("fill", color)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr(
        "transform",
        `translate(${xScale(agedata.age) + margin.left},${
          yScale(agedata.ex) + margin.top
        })`
      )
      .raise();

    hlgroup
      .append("line")
      .attr("id", id)
      .attr("stroke", color)
      .attr("x1", xScale(agedata.age) + margin.left)
      .attr("y1", innerHeight + margin.top)
      .attr("x2", xScale(agedata.age) + margin.left)
      .attr("y2", yScale(agedata.ex) + margin.top + 5);

    hlgroup
      .append("rect")
      .attr(
        "transform",
        `translate(${xScale(agedata.age) + margin.left - labelwidth / 2},${
          yScale(agedata.ex) + margin.top - 30
        })`
      )
      .attr("fill", "white")
      .attr("height", mobile ? 15 : 20)
      .attr("width", labelwidth)
      .attr("rx", 10)
      .attr("y", mobile ? 5 : 0)
      .attr("fill", "black");

    hlgroup
      .append("text")
      .attr(
        "transform",
        `translate(${xScale(agedata.age) + margin.left},${
          yScale(agedata.ex) + margin.top
        })`
      )
      .attr("fill", "white")
      .attr("id", id + "text")
      .attr("text-anchor", "middle")
      .attr("y", -15)
      .attr("font-size", mobile ? "0.75em" : "1em")
      .text(label);
  };

  const avline = average_age
    ? renderLine(
        average_age,
        theme.palette.secondary.light,
        "meanline",
        "Av. Age at Death: " + average_age.age.toFixed(0),
        mobile ? 110 : 150
      )
    : null;

    const curline = cur_age
    ? renderLine(
        cur_age,
        theme.palette.success.main,
        "curline",
        "Av. Years Left: " + cur_age.ex.toFixed(2),
        mobile ? 110 : 150
      )
    : null;


  svg.call(hover, pathentry, data, xScale, yScale, margin.left, margin.top, theme);
};

export var lifeGraph = (cur_age, cur_table, table_name, average_age, final_age, theme, resizing=false) => {
  // console.log(cur_table)
  // renderGraphBoth()

  const cur_age_data = cur_table.filter((x) => x.age === cur_age)[0]

  const mobile = window.matchMedia(
    `(max-width: ${theme.breakpoints.values.md}px)`
  ).matches;

  $(document).ready(function() {
  if (cur_table === []) {
    renderGraph([], cur_age_data, table_name, average_age, final_age, theme, mobile, resizing);
  } else {
    renderGraph([...cur_table], cur_age_data, table_name, average_age, final_age, theme, mobile, resizing);
  }
})
};

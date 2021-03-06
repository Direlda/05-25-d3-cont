'use strict'; //strict mode: catch silly errors

//the data!
var dataList = [
   {id:1, name:'A', sleep:1},
   {id:2, name:'B', sleep:3},
   {id:3, name:'C', sleep:6},
];
    
  function update(dataList){
    
    var sleepMax = d3.max(dataList, function(d){ return d.sleep;});
    var widthScale = d3.scale.linear()
         .domain([0, sleepMax])   //sleep interval
         .range([10, 380]); //pixel interval
    
    var svg = d3.select('svg'); // Select svg element and assign to variable
    
    var xAxis = d3.svg.axis() //create the axis
        .scale(widthScale) //specify the scale for the axis

    d3.select('svg')
      svg.append('g') //to position the axis
      .attr('transform','translate(20,20)')
      
      .call(xAxis); //add axis to SVG group
    
    var rectList = svg.selectAll('rect'); // Reference all the rect elements inside svg
    
    var dataJoin = rectList.data(dataList); // Data binding--connects the two arrays
    
    dataJoin.enter().append("rect")
    
    dataJoin
      .on('click', function(item){
        item.sleep +=1;
        update(dataList);
      })
      .on('mouseover', function(item){
        d3.select(this).attr()
      }) 
      .transition()
      .attr({x:10, height:40}) // set constant values for x and height
      .attr('y', function(dataItem){ // y is a function of the item
        return dataItem.id*50; // equal to the item's id multiplied by 50
      })
      .attr('width', function(item){ // width is a function of the item
        return widthScale(item.sleep); // equal to the item's sleep multiplied 20
      })
      .attr("fill", function(item){
        if (item.sleep <= 4){
          return "#722f37";
        }
        else{
          return "sienna";
        }
      }); // done changing stuff
    
    dataJoin.exit().remove();
  };







/** Button Handlers **/
$('#addButton').click(function(){
  var lastId = 0; //last person's id
  if(dataList.length > 0){
    lastId = dataList[dataList.length-1].id;
  }

  //add new person at end
  dataList.push({
    id:lastId+1, //increment id
    name:'New',
    sleep: Math.floor(Math.random()*24) //random sleep (integer)
  })
  console.log(dataList);
  update(dataList);
});

$('#remButton').click(function(){
  //remove first person
  dataList.shift();
  console.log(dataList);
  update(dataList);
});

$('#moreButton').click(function(){
  dataList[0].sleep += 1; //increase first guy
  console.log(dataList);
  update(dataList);
});

$('#lessButton').click(function(){
  //decrease first guy; min 0
  dataList[0].sleep = Math.max(dataList[0].sleep - 1, 0);
  console.log(dataList);
  update(dataList);
});

$('#resetButton').click(function(){
  dataList = [
    {id:1, name:'A', sleep:1},
    {id:2, name:'B', sleep:3},
    {id:3, name:'C', sleep:6},
  ];
  console.log(dataList);
  update(dataList);
});
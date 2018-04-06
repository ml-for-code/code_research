const fs = require("fs");

const TrainSourceCorrectDir = "./TrainSourceCorrect/";
const TrainSourceBuggyDir = "./TrainSourceBuggy/";
const TestSourceCorrectDir = "./TestSourceCorrect/";
const TestSourceBuggyDir = "./TestSourceBuggy/";
const DevSourceCorrectDir = "./DevSourceCorrect/";
const DevSourceBuggyDir = "./DevSourceBuggy/";

var dirs = [TrainSourceCorrectDir, TrainSourceBuggyDir, TestSourceCorrectDir, TestSourceBuggyDir, DevSourceCorrectDir, DevSourceBuggyDir];

for(var i in dirs)
{
  var dir = dirs[i];
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

var devstats = {'NOMINAL': 0, 'REPAIR': 0, 'MUTANT_REPAIR': 0};
var trainstats = {'NOMINAL': 0, 'REPAIR': 0, 'MUTANT_REPAIR': 0};
var teststats = {'NOMINAL': 0, 'REPAIR': 0, 'MUTANT_REPAIR': 0};

var dataset = fs.readFileSync("dataset.json");
var datasetJSON = JSON.parse(dataset);
var buggyTrain = []; 
var correctTrain = [];
var buggyTest = []; 
var correctTest = [];
var buggyDev = [];
var correctDev = [];

var examples = [correctTrain, buggyTrain, 
	correctTest, buggyTest, correctDev, buggyDev];
var devSplit = 10;


for(var i = 0; i< datasetJSON.length; i++)
{
  var changePairs = datasetJSON[i].sliceChangePair;
  var isDevSet = i % 10 == 0;
  var isTestSet = false;

  for(var j = 0; j < changePairs.length; j++)
  {   
    if(changePairs[j].type === "REPAIR")
    {
      isTestSet = true;
    }
  }

  for(var j = 0; j < changePairs.length; j++)
  {
    var changePair = changePairs[j];
    var before = changePair.before;
    var after = changePair.after; 
    var type = changePair.type;   
 
    if(isTestSet)
    {
      teststats[type] += 1;  
      buggyTest.push(before);
      correctTest.push(after);
    }
    else if(isDevSet)
    {
      devstats[type] += 1;
      buggyDev.push(before);
      correctDev.push(after);
    }
    else
    {
      trainstats[type] +=1;
      buggyTrain.push(before);
      correctTrain.push(after);
    }
  }
}

for(var i = 0; i < examples.length; i++){
  var exampleSet = examples[i];
  var dir = dirs[i];
  for(var j = 0; j < exampleSet.length; j++){
    fs.writeFileSync(dir + j + '.js', exampleSet[j], function (err) {
	if (err) throw err;
	console.log('Processed ' + j + '.js' + ' in ' + dir);			});
  }
}

console.log('Train Stats:');
console.log(trainstats);
console.log('Dev Stats:');
console.log(devstats);
console.log('Test Stats:');
console.log(teststats);


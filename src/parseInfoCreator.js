const ParseInfo=require('./parseInfo.js');
const StrictParseInfo=require('./strictParseInfo.js');

const basic=function(initialParsingFunction) {
  return new ParseInfo(initialParsingFunction);
}

const strict=function(listOfKeys,option) {
  return function(initialParsingFunction) {
    return new StrictParseInfo(initialParsingFunction,listOfKeys,option);
  }
}
module.exports = {
  basic: basic,
  strict: strict
}

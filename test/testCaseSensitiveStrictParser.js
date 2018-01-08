const src=function(filePath){return "../src/"+filePath};
const errors=function(filePath){return "../src/errors/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;
const InvalidKeyError=require(errors('invalidKeyError.js'));

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in lower case and actual key contain capital letter",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NaMe"]="jayanth";
    let parsed=kvParser.parse("NaMe=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are lowercase alpha-Numeric and actual keys are in uppercase alph-Numeric",function(){
    let kvParser=new StrictParser(["name12","age1"],false);
    let expected=new Parsed();
    expected["naME12"]="john";
    expected["Age1"]="23";
    let parsed=kvParser.parse("naME12=john Age1=23");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in lowercase & contain underscore and actual keys contain capital letter",function(){
    let kvParser=new StrictParser(["name_12","age_1"],false);
    let expected=new Parsed();
    expected["naME_12"]="john";
    expected["Age_1"]="23";
    let parsed=kvParser.parse("naME_12=john Age_1=23");
    assert.deepEqual(parsed,expected);
  });

  it("should not parse when specified keys are in lowercase and actual keys are not and case-sensitive mode is on",function(){
    let kvParser=new StrictParser(["name","age"]);
    assert.throws(()=>{
      try{
        let parsed=kvParser.parse("naME=john Age=23");
      }catch(e){
        if(invalidKeyErrorChecker("naMe","john") && e) throw e;
      }
    })
  });

});

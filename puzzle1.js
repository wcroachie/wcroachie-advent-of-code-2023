/* PUZZLE 1 - parts 1 and 2 */
function recoverMap1( input ){
  
  /* get lines */
  let lines = input.match(/.+/gm).map(line=>line.trim());
  /* get only numbers */
  lines = lines.map( line => line.split(/[^0-9]/).join("") );
  /* get first and last numbers for each line */
  lines = lines.map( line => line[0] + "" + line[line.length-1] );
  /* convert to integers */
  lines = lines.map( line => parseInt(line) );
  
  /* add together */
  return lines.reduce((a,b)=>a+b,0);
  
}


function recoverMap2( input ){

  function replaceFirstAndLastNumberStringInLine( line ){
    let numberStrings = ["zero","one","two","three","four","five","six","seven","eight","nine"];
    
    /* first remove the first appearance of a number string in the line, replacing it with its index */
    line = line.replace(/zero|one|two|three|four|five|six|seven|eight|nine/, match => numberStrings.indexOf(match) + "" + match );
    
    /* now, flip the string and find the last appearance of a reversed number string in the line */
    line = line.split("").reverse().join("");
    numberStrings = numberStrings.map( str => str.split("").reverse().join("") );
    
    line = line.replace(/orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/, match => match + "" + numberStrings.indexOf(match) );
    /* flip the line back to normal again */
    line = line.split("").reverse().join("");
    return line;
  }

  let lines = input.match(/.+/g).map( line => line.trim() );
  lines = lines.map( line => replaceFirstAndLastNumberStringInLine( line ) );
  lines = lines.map( line => line.split(/[^0-9]/).join("") );
  lines = lines.map( line => parseInt(line[0] + "" + line[line.length-1]) );
  return lines.reduce( (a,b) => a+b, 0);
}

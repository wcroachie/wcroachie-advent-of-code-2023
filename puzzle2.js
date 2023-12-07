/* PUZZLE 2 */

/* first, create an object that makes the input easier to work with */
function getGameInfos( input ){

  /* get the lines */
  let lines = input.match(/.+/g).map( line => line.trim() );

  const games = {};

  /* process a single line */
  function getGameInfo( gameString ){

    /* get the game id */
    let id = gameString.split(/:/)[0];

    /* get what happens in the game */
    let game = gameString.slice(id.length+1).trim();

    /* get the number from the id but as a string still (make sure to do this after getting the second part of the string before the amount of characters changes) */
    id = id.split(/\s/).pop() + "";
    
    /* get the reveals for the game */
    let reveals = game.split(/;/);
    
    /* process the reveals */
    reveals = reveals.map( reveal => {

      reveal = reveal.trim();

      let colorCounts = reveal.split(/,/);

      let o = {
        red : 0,
        green : 0,
        blue : 0,
      };

      colorCounts.forEach( str => {
        str = str.trim();
        let countString = str.split(/\s/)[0] + "";
        let colorString = str.slice( countString.length + 1 );
        o[colorString] = countString;
      });

      return o;
    });
    
    return [id, reveals];
  }

  /* now use the above function to process the lines of the input */
  lines.forEach( line => {
    let entry = getGameInfo( line );
    let id = entry[0];
    let game = entry[1];
    games[id] = game;
  });

  return games;
}




/* see which games were possible with the cube counts provided */
function filterGamesByMaxCubeCounts( games, maxCubeCounts ){
  
  /* note - the puzzle doesnt start counting from 0, it starts at 1, so i am using a regular object as opposed to an array */
  let possibleGames = {};

  for( let id in games ){

    /* set this flag to false later if the game is impossible. we will find out. */
    let isGamePossible = true;

    /* essentially, "game" and "reveals" are the same thing but renaming it for brevity */
    let game = games[id];
    let reveals = game;

    /* see if all the reveals pass inspection */
    reveals.forEach( reveal=> {
      if(
        (reveal.red > maxCubeCounts.red) ||
        (reveal.green > maxCubeCounts.green) ||
        (reveal.blue > maxCubeCounts.blue)
      ){
        /* oh no its not possible. set the flag to false */
        isGamePossible = false;
      }
    });

    /* if it was possible, add it to possibleGames */
    if( isGamePossible ){
      possibleGames[id] = game;
    }

  }

  return possibleGames;

}




function addUpIdsFromPossibleGames( possibleGamesObj ){
  /* get the ids (they are the object keys) */
  let ids = Object.keys(possibleGamesObj);
  console.log(ids);
  /* the id's are strings so we will have to convert to ints */
  let idsAsInts = ids.map( key=>parseInt(key) );
  /* add together with array.reduce */
  return idsAsInts.reduce( (a,b)=>a+b,0 );
}

function processInput( input, rule ){
  let games = getGameInfos( input );
  let possibleGames = filterGamesByMaxCubeCounts( games, rule );
  console.log( possibleGames );
  return addUpIdsFromPossibleGames( possibleGames );
}



/* puzzle 2 part 2 */
function findMaxCubesPlayablePerGame( game ){
  
  let reveals = game;

  /* get max by combining reveals together for each cube*/
  let maxRed = Math.max(...reveals.map( reveal => reveal.red ));
  let maxBlue = Math.max(...reveals.map( reveal => reveal.blue ));
  let maxGreen = Math.max(...reveals.map( reveal => reveal.green ));

  return {
    maxRed, maxBlue, maxGreen
  };

}

function getGamePower( game ){
  let maxCounts = findMaxCubesPlayablePerGame( game );
  let power = maxCounts.maxRed * maxCounts.maxBlue * maxCounts.maxGreen;
  return power;
}

function processInput( input ){
  let games = getGameInfos( input );
  let acc = 0;
  for( let id in games ){
    let game = games[id];
    let power = getGamePower( game );
    acc += power;
  }
  return acc;
}

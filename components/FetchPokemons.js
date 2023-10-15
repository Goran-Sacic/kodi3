import styles from "./FetchPokemons.module.css";
import { useState, useEffect } from "react";

function FetchPokemons() {
  const [pokemon1, setPokemon1] = useState({
    id: "",
    name: "",
    hp: "",
    img: "",
    attack: "",
    defense: "",
    speed: "",
  });

  const [pokemon2, setPokemon2] = useState({
    id: "",
    name: "",
    hp: "",
    img: "",
    attack: "",
    defense: "",
    speed: "",
  });

  const [fetching, setFetching] = useState(false);

  const [firstStrike, setFirstStrike] = useState(true);

  const [battleLog, setBattleLog] = useState([]);

  const [pokemon1Attacking, setPokemon1Attacking] = useState(false);
  const [pokemon2Attacking, setPokemon2Attacking] = useState(false);

  const [pokemon1AttackOver, setPokemon1AttackOver] = useState(false);
  const [pokemon2AttackOver, setPokemon2AttackOver] = useState(false);

  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Function to fetch all available Pokemons:
  /* const [allPokemons, setAllPokemons] = useState([]);

  const handleGetAllPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000"
      );
      const allPokemonData = await response.json();
      setAllPokemons(allPokemonData.results);
    } catch (error) {
      console.log(error);
    }
  }; */
  //
  // Calculating a random number between 0 and 100.
  const randomNumberGenerator = () => {
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    return randomNumber;
  };
  //
  const executeCheck = () => {
    console.log(
      "Pokemon1 speed i poke2speed iz checka su: " + pokemon1.speed,
      pokemon2.speed
    );
    if (pokemon1.speed > pokemon2.speed) {
      setPokemon1Attacking(true);
      setPokemon2Attacking(false);
    } else if (pokemon2.speed > pokemon1.speed) {
      setPokemon2Attacking(true);
      setPokemon1Attacking(false);
    } else if (pokemon1.speed === pokemon2.speed) {
      let whoStrikes = randomNumberGenerator();
      if (whoStrikes < 50.0) {
        setPokemon1Attacking(true);
        setPokemon2Attacking(false);
      } else if (whoStrikes === 50.0 || whoStrikes > 50.0)
        setPokemon2Attacking(true);
      setPokemon1Attacking(false);
    }
  };

  const handleGetRandomPokemons = async () => {
    setFetching(true);
    setPokemon1AttackOver(true);
    setPokemon2AttackOver(true);
    setFirstStrike(true);
    setBattleLog([]);

    setGameOver(false);
    /* let randomId1 = Math.floor(Math.random() * 1292 + 1);
    let randomId2 = Math.floor(Math.random() * 1292 + 1); */
    let randomId1 = Math.floor(Math.random() * 1017 + 1);
    let randomId2 = Math.floor(Math.random() * 1017 + 1);
    /* console.log(randomId1);
    console.log(randomId2); */
    try {
      const response1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId1}`
      );
      if (response1.status === 404) {
        throw new Error(`Pokemon with the id of ${randomId1} was not found`);
      }
      const pokemon1Data = await response1.json();
      console.log(pokemon1Data);
      setPokemon1({
        id: pokemon1Data.id,
        name: pokemon1Data.name,
        hp: pokemon1Data.stats[0].base_stat,
        img: pokemon1Data.sprites.front_default,
        attack: pokemon1Data.stats[1].base_stat,
        defense: pokemon1Data.stats[2].base_stat,
        speed: pokemon1Data.stats[5].base_stat,
      });
    } catch (error) {
      console.log(error);
      // Ovaj block koda se ne bi trebao nikad izvršiti, maksimalni broj pokemona ograničen je na 1017.
      if (
        error.message === `Pokemon with the id of ${randomId1} was not found`
      ) {
        handleGetRandomPokemons();
      }
      //
    }

    try {
      const response2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId2}`
      );
      if (response2.status === 404) {
        throw new Error(`Pokemon with the id of ${randomId2} was not found`);
      }
      const pokemon2Data = await response2.json();
      setPokemon2({
        id: pokemon2Data.id,
        name: pokemon2Data.name,
        hp: pokemon2Data.stats[0].base_stat,
        img: pokemon2Data.sprites.front_default,
        attack: pokemon2Data.stats[1].base_stat,
        defense: pokemon2Data.stats[2].base_stat,
        speed: pokemon2Data.stats[5].base_stat,
      });
    } catch (error) {
      console.log(error);
      // Ovaj block koda se ne bi trebao nikad izvršiti, maksimalni broj pokemona ograničen je na 1017.
      if (
        error.message === `Pokemon with the id of ${randomId2} was not found`
      ) {
        handleGetRandomPokemons();
      }
      //
    }

    setFetching(false);
    setGameStart(true);
  };

  useEffect(() => {
    console.log("Effect running!");
    console.log(pokemon1.speed, pokemon2.speed);
    executeCheck();
  }, [pokemon1.speed, pokemon2.speed]);

  /* console.log("Pokemon1.hp: " + pokemon1.hp);
  console.log("Pokemon1.hp: " + pokemon2.hp); */

  // Sorting of all pokemons:
  // allPokemons.sort((a, b) => a.name.localeCompare(b.name)); //
  //

  const handleReduceHP = () => {
    // Calculating diminishing returns for Pokemon defense stat >80:
    let pokemon1Defense = pokemon1.defense;
    pokemon1Defense =
      pokemon1Defense > 80 ? 80 + pokemon1Defense * 0.05 : pokemon1Defense;
    let pokemon2Defense = pokemon2.defense;
    pokemon2Defense =
      pokemon2Defense > 80 ? 80 + pokemon2Defense * 0.05 : pokemon2Defense;
    //

    /* let hitChance = randomNumberGenerator(); */
    let pokemon1DefenseCalculated = (pokemon1Defense / 100).toFixed(2);
    let pokemon2DefenseCalculated = (pokemon2Defense / 100).toFixed(2);

    let pokemon1Attack = (pokemon1.attack / 2).toFixed(2);
    let pokemon2Attack = (pokemon2.attack / 2).toFixed(2);

    let pokemon1AttackCalculated = (
      pokemon1Attack -
      pokemon1Attack * pokemon2DefenseCalculated
    ).toFixed(2);
    let pokemon2AttackCalculated = (
      pokemon2Attack -
      pokemon2Attack * pokemon1DefenseCalculated
    ).toFixed(2);

    if (firstStrike) {
      if (pokemon1.speed > pokemon2.speed) {
        let hitChance = randomNumberGenerator();
        if (hitChance > 20.0) {
          let pokemon2HpCalculated = pokemon2.hp - pokemon1AttackCalculated;
          console.log(pokemon2HpCalculated);
          if (pokemon2HpCalculated > 0) {
            setPokemon2({ ...pokemon2, hp: pokemon2HpCalculated.toFixed(2) });
          } else {
            setPokemon2({ ...pokemon2, hp: 0 });
          }
          battleLog.push(
            `${pokemon1.name} attacked ${pokemon2.name} for ${pokemon1AttackCalculated} damage.`
          );
        } else {
          battleLog.push(`${pokemon1.name} missed!`);
        }
        setPokemon1AttackOver(true);
        setPokemon2AttackOver(false);
        setPokemon1Attacking(false);
        setPokemon2Attacking(true);
        setFirstStrike(false);
      } else if (pokemon2.speed > pokemon1.speed) {
        let hitChance = randomNumberGenerator();
        if (hitChance > 20.0) {
          let pokemon1HpCalculated = pokemon1.hp - pokemon2AttackCalculated;
          console.log(pokemon1HpCalculated);
          if (pokemon1HpCalculated > 0) {
            setPokemon1({ ...pokemon1, hp: pokemon1HpCalculated.toFixed(2) });
          } else {
            setPokemon1({ ...pokemon1, hp: 0 });
          }
          battleLog.push(
            `${pokemon2.name} attacked ${pokemon1.name} for ${pokemon2AttackCalculated} damage.`
          );
        } else {
          battleLog.push(`${pokemon2.name} missed!`);
        }
        setPokemon1AttackOver(false);
        setPokemon2AttackOver(true);
        setPokemon1Attacking(true);
        setPokemon2Attacking(false);
        setFirstStrike(false);
      } else if (pokemon1.speed === pokemon2.speed) {
        /* let whoStrikes = randomNumberGenerator(); */
        if (whoStrikes < 50.0) {
          battleLog.push(
            `Pokemons have same attack speed! Rolling... ${pokemon1.name} will attack first.`
          );
          let hitChance = randomNumberGenerator();
          if (hitChance > 20.0) {
            let pokemon2HpCalculated = pokemon2.hp - pokemon1AttackCalculated;
            console.log(pokemon2HpCalculated);
            if (pokemon2HpCalculated > 0) {
              setPokemon2({ ...pokemon2, hp: pokemon2HpCalculated.toFixed(2) });
            } else {
              setPokemon2({ ...pokemon2, hp: 0 });
            }
            battleLog.push(
              `${pokemon1.name} attacked ${pokemon2.name} for ${pokemon1AttackCalculated} damage.`
            );
          } else {
            battleLog.push(`${pokemon1.name} missed!`);
          }
          setPokemon1AttackOver(true);
          setPokemon2AttackOver(false);
          setPokemon1Attacking(false);
          setPokemon2Attacking(true);
          setFirstStrike(false);
        } else if (whoStrikes === 50.0 || whoStrikes > 50.0) {
          battleLog.push(
            `Pokemons have same attack speed! Rolling... ${pokemon2.name} will attack first.`
          );
          let hitChance = randomNumberGenerator();
          if (hitChance > 20.0) {
            let pokemon1HpCalculated = pokemon1.hp - pokemon2AttackCalculated;
            console.log(pokemon1HpCalculated);
            if (pokemon1HpCalculated > 0) {
              setPokemon1({ ...pokemon1, hp: pokemon1HpCalculated.toFixed(2) });
            } else {
              setPokemon1({ ...pokemon1, hp: 0 });
            }
            battleLog.push(
              `${pokemon2.name} attacked ${pokemon1.name} for ${pokemon2AttackCalculated} damage.`
            );
          } else {
            battleLog.push(`${pokemon2.name} missed!`);
          }
          setPokemon1AttackOver(false);
          setPokemon2AttackOver(true);
          setPokemon1Attacking(true);
          setPokemon2Attacking(false);
          setFirstStrike(false);
        }
      }
    } else {
      if (pokemon1AttackOver) {
        setPokemon2Attacking(true);
        setPokemon1Attacking(false);
        let hitChance = randomNumberGenerator();
        if (hitChance > 20.0) {
          let pokemon1HpCalculated = pokemon1.hp - pokemon2AttackCalculated;
          console.log(pokemon1HpCalculated);
          battleLog.push(
            `${pokemon2.name} attacked ${pokemon1.name} for ${pokemon2AttackCalculated} damage.`
          );
          if (pokemon1HpCalculated > 0) {
            setPokemon1({ ...pokemon1, hp: pokemon1HpCalculated.toFixed(2) });
          } else {
            setPokemon1({ ...pokemon1, hp: 0 });
            setGameOver(true);
            battleLog.push(`${pokemon2.name} has slain ${pokemon1.name}.`);
          }

          setPokemon1AttackOver(false);
          setPokemon2AttackOver(true);
        } else {
          battleLog.push(`${pokemon2.name} missed!`);
          setPokemon1AttackOver(false);
          setPokemon2AttackOver(true);
        }
        setPokemon2Attacking(false);
        setPokemon1Attacking(true);
      } else if (pokemon2AttackOver) {
        setPokemon1Attacking(true);
        setPokemon2Attacking(false);
        let hitChance = randomNumberGenerator();
        if (hitChance > 20.0) {
          let pokemon2HpCalculated = pokemon2.hp - pokemon1AttackCalculated;
          console.log(pokemon2HpCalculated);
          battleLog.push(
            `${pokemon1.name} attacked ${pokemon2.name} for ${pokemon1AttackCalculated} damage.`
          );
          if (pokemon2HpCalculated > 0) {
            setPokemon2({ ...pokemon2, hp: pokemon2HpCalculated.toFixed(2) });
          } else {
            setPokemon2({ ...pokemon2, hp: 0 });
            setGameOver(true);
            battleLog.push(`${pokemon1.name} has slain ${pokemon2.name}.`);
          }

          setPokemon1AttackOver(true);
          setPokemon2AttackOver(false);
        } else {
          battleLog.push(`${pokemon1.name} missed!`);
          setPokemon1AttackOver(true);
          setPokemon2AttackOver(false);
        }
        setPokemon2Attacking(true);
        setPokemon1Attacking(false);
      }
    }
  };

  const rotateLeft = pokemon1Attacking;
  /* const rotateRight = pokemon2Attacking; */

  return (
    <div>
      {
        // In this part of the code we display all pokemons fetched from PokeAPI.
        /* <button onClick={handleGetAllPokemons}>Find all Pokemons</button>
      <h1>All the Pokemons: </h1>
      {allPokemons.length > 0 ? (
        <div>
          {allPokemons.map((poke, index) => (
            <li key={index}>{poke.name}</li>
          ))}
        </div>
      ) : (
        ""
      )} */
      }
      <h1>POKEMON BRE</h1>
      <button onClick={handleGetRandomPokemons}>
        NAĐI MI DVA RANDOM POKEMONA BRE
      </button>
      <button onClick={handleReduceHP} disabled={gameOver}>
        BORITE SE PSI!!
      </button>
      <div className={styles.flex}>
        <div>
          <h1>{pokemon1.name}</h1>
          <h3>HP: {pokemon1.hp}</h3>
          <img src={pokemon1.img} />
          <p>Attack: {pokemon1.attack}</p>
          <p>Defense: {pokemon1.defense}</p>
          <p>Speed: {pokemon1.speed}</p>
        </div>
        {gameStart ? (
          <div
            className={`${styles.arrow} ${
              rotateLeft ? styles.left : styles.right
            }`}
          >
            {"-------------------------->>>>"}
          </div>
        ) : (
          ""
        )}
        <div>
          <h1>{pokemon2.name}</h1>
          <h3>HP: {pokemon2.hp}</h3>
          <img src={pokemon2.img} />
          <p>Attack: {pokemon2.attack}</p>
          <p>Defense: {pokemon2.defense}</p>
          <p>Speed: {pokemon2.speed}</p>
        </div>
      </div>
      {fetching ? <p>Loading Pokemons...</p> : ""}
      <h3>Battle log</h3>
      <div>
        {battleLog.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </div>
    </div>
  );
}

export default FetchPokemons;

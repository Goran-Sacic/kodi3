import Link from "next/link";
import styles from "./FetchPokemons.module.css";
import { useState, useEffect } from "react";
import arrow from "../assets/arrow.svg";
import Image from "next/image";

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

  const [poke1MaxHP, setPoke1MaxHP] = useState("");
  const [poke2MaxHP, setPoke2MaxHP] = useState("");

  const [divClass, setDivClass] = useState("");

  const [modal, setModal] = useState(false);

  const [dmgClassName, setDmgClassName] = useState("");

  const [dmgIndicator, setDmgIndicator] = useState([]);

  const resetState = () => {
    setPokemon1({
      id: "",
      name: "",
      hp: "",
      img: "",
      attack: "",
      defense: "",
      speed: "",
    });
    setPokemon2({
      id: "",
      name: "",
      hp: "",
      img: "",
      attack: "",
      defense: "",
      speed: "",
    });

    setFetching(false);
    setFirstStrike(true);
    setBattleLog([]);
    setPokemon2AttackOver(false);
    setPokemon2Attacking(false);
    setPokemon1AttackOver(false);
    setPokemon2AttackOver(false);
    setGameStart(false);
    setGameOver(false);
    setPoke1MaxHP("");
    setPoke2MaxHP("");
    setModal(!modal);
    setDmgIndicator([]);
  };

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
    setPokemon1({
      id: "",
      name: "",
      hp: "",
      img: "",
      attack: "",
      defense: "",
      speed: "",
    });
    setPokemon2({
      id: "",
      name: "",
      hp: "",
      img: "",
      attack: "",
      defense: "",
      speed: "",
    });
    setFetching(true);
    setPokemon1AttackOver(true);
    setPokemon2AttackOver(true);
    setFirstStrike(true);
    setBattleLog([]);
    setDmgIndicator([]);

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
        name:
          pokemon1Data.name.charAt(0).toUpperCase() +
          pokemon1Data.name.slice(1),
        hp: pokemon1Data.stats[0].base_stat,
        /* img: pokemon1Data.sprites.front_default, */
        img: pokemon1Data.sprites.other["official-artwork"].front_default,
        attack: pokemon1Data.stats[1].base_stat,
        defense: pokemon1Data.stats[2].base_stat,
        speed: pokemon1Data.stats[5].base_stat,
      });
      setPoke1MaxHP(pokemon1Data.stats[0].base_stat);
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
        name:
          pokemon2Data.name.charAt(0).toUpperCase() +
          pokemon2Data.name.slice(1),
        hp: pokemon2Data.stats[0].base_stat,
        /* img: pokemon2Data.sprites.front_default, */
        img: pokemon2Data.sprites.other["official-artwork"].front_default,
        attack: pokemon2Data.stats[1].base_stat,
        defense: pokemon2Data.stats[2].base_stat,
        speed: pokemon2Data.stats[5].base_stat,
      });
      setPoke2MaxHP(pokemon2Data.stats[0].base_stat);
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
    /* if (pokemon1.speed > pokemon2.speed) {
      battleLog.push(`${pokemon1.name} will attack first.`);
    } else if (pokemon2.speed > pokemon1.speed) {
      battleLog.push(`${pokemon2.name} will attack first.`);
    } */
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
          dmgIndicator.push(`${pokemon1AttackCalculated} DMG`);
        } else {
          battleLog.push(`${pokemon1.name} missed!`);
          dmgIndicator.push("MISS!");
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
          dmgIndicator.push(`${pokemon2AttackCalculated} DMG`);
        } else {
          battleLog.push(`${pokemon2.name} missed!`);
          dmgIndicator.push("MISS!");
        }
        setPokemon1AttackOver(false);
        setPokemon2AttackOver(true);
        setPokemon1Attacking(true);
        setPokemon2Attacking(false);
        setFirstStrike(false);
      } else if (pokemon1.speed === pokemon2.speed) {
        let whoStrikes = randomNumberGenerator();
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
            dmgIndicator.push(`${pokemon1AttackCalculated} DMG`);
          } else {
            battleLog.push(`${pokemon1.name} missed!`);
            dmgIndicator.push("MISS!");
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
            dmgIndicator.push(`${pokemon2AttackCalculated} DMG`);
          } else {
            battleLog.push(`${pokemon2.name} missed!`);
            dmgIndicator.push("MISS!");
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
          dmgIndicator.push(`${pokemon2AttackCalculated} DMG`);
          if (pokemon1HpCalculated > 0) {
            setPokemon1({ ...pokemon1, hp: pokemon1HpCalculated.toFixed(2) });
          } else {
            setPokemon1({ ...pokemon1, hp: 0 });
            setGameOver(true);
            battleLog.push(`${pokemon2.name} has slain ${pokemon1.name}.`);
            return;
          }

          setPokemon1AttackOver(false);
          setPokemon2AttackOver(true);
        } else {
          battleLog.push(`${pokemon2.name} missed!`);
          dmgIndicator.push("MISS!");
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
          dmgIndicator.push(`${pokemon1AttackCalculated} DMG`);
          if (pokemon2HpCalculated > 0) {
            setPokemon2({ ...pokemon2, hp: pokemon2HpCalculated.toFixed(2) });
          } else {
            setPokemon2({ ...pokemon2, hp: 0 });
            setGameOver(true);
            battleLog.push(`${pokemon1.name} has slain ${pokemon2.name}.`);
            return;
          }

          setPokemon1AttackOver(true);
          setPokemon2AttackOver(false);
        } else {
          battleLog.push(`${pokemon1.name} missed!`);
          dmgIndicator.push("MISS!");
          setPokemon1AttackOver(true);
          setPokemon2AttackOver(false);
        }
        setPokemon2Attacking(true);
        setPokemon1Attacking(false);
      }
    }
    /* if (pokemon1Attacking) {
      setDmgClassName("dmg-left");
    } else if (pokemon2Attacking) {
      setDmgClassName("dmg-right");
    } else {
      setDmgClassName("");
    }
    console.log("dmg class name is: " + dmgClassName); */
  };

  useEffect(() => {
    if (gameOver) {
      setDivClass("visible");
      setModal(true);
    } else {
      setDivClass("");
    }
  }, [gameOver]);

  useEffect(() => {
    if (pokemon1Attacking) {
      setDmgClassName("dmg-right");
    } else if (pokemon2Attacking) {
      setDmgClassName("dmg-left");
    } else {
      setDmgClassName("");
    }
  }, [pokemon1Attacking, pokemon2Attacking]);

  const rotateLeft = pokemon1Attacking;
  /* const rotateRight = pokemon2Attacking; */

  const Poke1HealthBar = () => {
    let maxHP1 = poke1MaxHP;
    let hp1 = pokemon1.hp;
    const bar1Width = ((hp1 / maxHP1) * 100).toFixed(2);
    return bar1Width;
  };
  const Poke2HealthBar = () => {
    let maxHP2 = poke2MaxHP;
    let hp2 = pokemon2.hp;
    const bar2Width = ((hp2 / maxHP2) * 100).toFixed(2);
    return bar2Width;
  };

  let bar1Width = Poke1HealthBar();
  let bar2Width = Poke2HealthBar();

  const resetGame = () => {
    resetState();
    handleGetRandomPokemons();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [modal]);

  let lastEntryOfDmgIndicator = dmgIndicator[dmgIndicator.length - 1];

  return (
    <div>
      <div>
        <div className={styles[`${divClass}`]}>
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
          <h1>Kodimon</h1>
          <p>
            Pokemon sa većim attack speedom napada prvi. Defense stat iznad 80
            ima diminishing returns.
          </p>
          <div className={styles.btn_container}>
            <button onClick={handleGetRandomPokemons} disabled={gameOver}>
              Find some Pokemons...
            </button>
            <Link href="/HomePage">
              <button>BACK</button>
            </Link>
          </div>
          {pokemon1.hp === 0 && (
            <div>
              <h1>{pokemon2.name} wins!</h1>
            </div>
          )}
          {pokemon2.hp === 0 && (
            <div>
              <h1>{pokemon1.name} wins!</h1>
            </div>
          )}
          <div className={`${styles.flex} ${styles.pokemon_battle}`}>
            <div className={styles.pokemon_container}>
              {dmgClassName === "dmg-right" ? (
                <div className={styles[`${dmgClassName}`]}>
                  {" "}
                  {lastEntryOfDmgIndicator}
                </div>
              ) : (
                <div className={styles.dmgNone}></div>
              )}
              {pokemon1.name && pokemon2.name ? (
                <div className={styles.healthBarContainer}>
                  <p
                    className={
                      (Poke1HealthBar() > 50 && `${styles.p_green}`) ||
                      (Poke1HealthBar() < 50 &&
                        Poke1HealthBar() > 30 &&
                        `${styles.p_orange}`) ||
                      (Poke1HealthBar() < 30 && `${styles.p_red}`)
                    }
                  >
                    {Poke1HealthBar()}%
                  </p>
                  <div
                    className={
                      (pokemon1.name &&
                        Poke1HealthBar() > 50 &&
                        `${styles.health_bar} ${styles.health_bar_green}`) ||
                      (pokemon1.name &&
                        Poke1HealthBar() < 50 &&
                        Poke1HealthBar() > 30 &&
                        `${styles.health_bar} ${styles.health_bar_orange}`) ||
                      (pokemon1.name &&
                        Poke1HealthBar() < 30 &&
                        `${styles.health_bar} ${styles.health_bar_red}`)
                    }
                  >
                    <div
                      className={
                        (pokemon1.name &&
                          Poke1HealthBar() > 50 &&
                          `${styles.hit_points} ${styles.hit_points_green}`) ||
                        (pokemon1.name &&
                          Poke1HealthBar() < 50 &&
                          Poke1HealthBar() > 30 &&
                          `${styles.hit_points} ${styles.hit_points_orange}`) ||
                        (pokemon1.name &&
                          Poke1HealthBar() < 30 &&
                          `${styles.hit_points} ${styles.hit_points_red}`)
                      }
                      style={{ width: `${bar1Width}%` }}
                    >
                      {/* {pokemon1.hp}/{poke1MaxHP} */}
                    </div>
                  </div>
                  <div
                    className={
                      (Poke1HealthBar() > 50 && `${styles.p_green}`) ||
                      (Poke1HealthBar() < 50 &&
                        Poke1HealthBar() > 30 &&
                        `${styles.p_orange}`) ||
                      (Poke1HealthBar() < 30 && `${styles.p_red}`)
                    }
                  >
                    <h3>HP: {pokemon1.hp}</h3>
                  </div>
                </div>
              ) : (
                ""
              )}

              <h1>{pokemon1.name}</h1>

              <img src={pokemon1.img} />

              {gameStart && (
                <div className={styles.stats_container}>
                  <p>Stats:</p>
                  <div className={styles.stats_border}>
                    <p>Attack: {pokemon1.attack}</p>
                    <p>Defense: {pokemon1.defense}</p>
                    <p>Speed: {pokemon1.speed}</p>
                  </div>
                </div>
              )}
            </div>

            {gameStart ? (
              <div className={styles.arrow_btn_container}>
                <div
                  className={`${styles.arrow} ${
                    rotateLeft ? styles.left : styles.right
                  }`}
                >
                  <Image src={arrow} alt="indikator napada - strelica" />
                </div>
                <div>
                  <button
                    className={styles.attack_btn}
                    onClick={handleReduceHP}
                    disabled={gameOver || !gameStart}
                  >
                    Attack!
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className={styles.pokemon_container}>
              {dmgClassName === "dmg-left" ? (
                <div className={styles[`${dmgClassName}`]}>
                  {" "}
                  {lastEntryOfDmgIndicator}
                </div>
              ) : (
                <div className={styles.dmgNone}></div>
              )}
              {pokemon1.name && pokemon2.name ? (
                <div className={styles.healthBarContainer}>
                  <p
                    className={
                      (Poke2HealthBar() > 50 && `${styles.p_green}`) ||
                      (Poke2HealthBar() < 50 &&
                        Poke2HealthBar() > 30 &&
                        `${styles.p_orange}`) ||
                      (Poke2HealthBar() < 30 && `${styles.p_red}`)
                    }
                  >
                    {Poke2HealthBar()}%
                  </p>

                  <div
                    className={
                      (pokemon1.name &&
                        Poke2HealthBar() > 50 &&
                        `${styles.health_bar} ${styles.health_bar_green}`) ||
                      (pokemon1.name &&
                        Poke2HealthBar() < 50 &&
                        Poke2HealthBar() > 30 &&
                        `${styles.health_bar} ${styles.health_bar_orange}`) ||
                      (pokemon1.name &&
                        Poke2HealthBar() < 30 &&
                        `${styles.health_bar} ${styles.health_bar_red}`)
                    }
                  >
                    <div
                      className={
                        (pokemon1.name &&
                          Poke2HealthBar() > 50 &&
                          `${styles.hit_points} ${styles.hit_points_green}`) ||
                        (pokemon1.name &&
                          Poke2HealthBar() < 50 &&
                          Poke2HealthBar() > 30 &&
                          `${styles.hit_points} ${styles.hit_points_orange}`) ||
                        (pokemon1.name &&
                          Poke2HealthBar() < 30 &&
                          `${styles.hit_points} ${styles.hit_points_red}`)
                      }
                      style={{ width: `${bar2Width}%` }}
                    >
                      {/* {pokemon2.hp}/{poke2MaxHP} */}
                    </div>
                  </div>
                  <div
                    className={
                      (Poke2HealthBar() > 50 && `${styles.p_green}`) ||
                      (Poke2HealthBar() < 50 &&
                        Poke2HealthBar() > 30 &&
                        `${styles.p_orange}`) ||
                      (Poke2HealthBar() < 30 && `${styles.p_red}`)
                    }
                  >
                    <h3>HP: {pokemon2.hp}</h3>
                  </div>
                </div>
              ) : (
                ""
              )}

              <h1>{pokemon2.name}</h1>
              <img src={pokemon2.img} />

              {gameStart && (
                <div className={styles.stats_container}>
                  <p>Stats:</p>
                  <div className={styles.stats_border}>
                    <p>Attack: {pokemon2.attack}</p>
                    <p>Defense: {pokemon2.defense}</p>
                    <p>Speed: {pokemon2.speed}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {gameStart && (
            <div className={dmgClassName}>
              <p>only last</p>
              <div>
                {lastEntryOfDmgIndicator}
                {/* {dmgIndicator.map((log, index) => (
                  <li key={index}>{log}</li>
                ))} */}
              </div>
            </div>
          )}
          {fetching ? <p>Loading Pokemons...</p> : ""}
          {gameStart && (
            <div>
              <h3>Battle log</h3>
              <div>
                {battleLog.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc. What is Lorem Ipsum? Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it? It is a long established
          fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed
          to using 'Content here, content here', making it look like readable
          English. Many desktop publishing packages and web page editors now use
          Lorem Ipsum as their default model text, and a search for 'lorem
          ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes
          on purpose (injected humour and the like). Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham. Where can I get
          some? There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc. What is Lorem Ipsum? Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it? It is a long established
          fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed
          to using 'Content here, content here', making it look like readable
          English. Many desktop publishing packages and web page editors now use
          Lorem Ipsum as their default model text, and a search for 'lorem
          ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes
          on purpose (injected humour and the like). Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham. Where can I get
          some? There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p> */}
      </div>

      {modal && (
        <div className={styles.modal}>
          <div /* onClick={toggleModal} */ className={styles.overlay}></div>
          <div className={styles.modal_content}>
            {pokemon2.hp === 0 ? (
              <h1>{pokemon1.name} WINS!</h1>
            ) : (
              <h1>{pokemon2.name} WINS!</h1>
            )}
            <h3>MENU</h3>
            <Link href="/HomePage">
              <button>Home</button>
            </Link>
            <Link href="/GetMePokimane">
              <button onClick={resetGame}>New Game</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchPokemons;

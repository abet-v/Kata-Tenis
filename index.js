const POINT = ["0", "15", "30", "40", "A"];
const PLAYER_1 = 1;
const PLAYER_2 = 2;

var score = {
  player1: {
    jeu: 0,
    actualSet: 0,
    sets: [],
  },
  player2: {
    jeu: 0,
    actualSet: 0,
    sets: [],
  },
};

function updateJeu(player) {
  return { ...player, jeu: player.jeu + 1 };
}

function resetScoreBoard() {
  // reset score after a set won
  return {
    player1: {
      ...score.player1,
      jeu: 0,
      actualSet: 0,
    },
    player2: {
      ...score.player2,
      jeu: 0,
      actualSet: 0,
    },
  };
}

function playerWonJeu(player) {
  if (player === PLAYER_1) {
    let actualSet = score.player1.actualSet + 1;
    if (actualSet >= 6 && score.player2.actualSet < actualSet - 1) {
      // if the set is won we store the actual value of the set and reset score
      score.player1.sets.push(actualSet);
      score.player2.sets.push(score.player2.actualSet);
      score = resetScoreBoard();
    } else {
      score = {
        player1: {
          ...score.player1,
          jeu: 0,
          actualSet: score.player1.actualSet + 1,
        },
        player2: { ...score.player2, jeu: 0 },
      };
    }
  } else {
    let actualSet = score.player2.actualSet + 1;
    if (actualSet >= 6 && score.player1.actualSet < actualSet - 1) {
      // if the set is won we store the actual value of the set and reset score
      score.player2.sets.push(actualSet);
      score.player1.sets.push(score.player1.actualSet);
      score = resetScoreBoard();
    } else {
      score = {
        player1: { ...score.player1, jeu: 0 },
        player2: {
          ...score.player2,
          jeu: 0,
          actualSet: score.player2.actualSet + 1,
        },
      };
    }
  }
}

function handleDeuce(winnerScore, oponentScore, player) {
  if (winnerScore === 4) {
    playerWonJeu(player);
    return;
  }
  if (oponentScore === 3) {
    winnerScore = 4;
  }
  if (oponentScore === 4) {
    oponentScore = 3;
  }
  score =
    player === PLAYER_1
      ? {
          player1: { ...score.player1, jeu: winnerScore },
          player2: { ...score.player2, jeu: oponentScore },
        }
      : {
          player2: { ...score.player2, jeu: winnerScore },
          player1: { ...score.player1, jeu: oponentScore },
        };
}

function isTieBreak() {
  if (score.player1.actualSet === 6 && score.player2.actualSet === 6) {
    return true;
  }
  return false;
}

function handleTieBreak(player) {
  if (
    player === PLAYER_1 &&
    score.player1.jeu >= 6 &&
    score.player2.jeu < score.player1.jeu - 1
  ) {
    playerWonJeu(player);
  } else if (
    player === PLAYER_2 &&
    score.player2.jeu >= 6 &&
    score.player1.jeu < score.player2.jeu - 1
  ) {
    playerWonJeu(player);
  } else {
    player === PLAYER_1
      ? (score = { ...score, player1: updateJeu(score.player1) })
      : (score = { ...score, player2: updateJeu(score.player2) });
  }
}

function updateScore(player) {
  if (isTieBreak()) {
    // Dans le cas d'un tie break les points sne sont plus compté jusqu'a 40 mais le premier a 7 avec 2 points d'écart
    handleTieBreak(player);
  } else {
    if (score.player1.jeu >= 3 && score.player2.jeu >= 3) {
      // Dans le cas d'un "deuce" (40-40) il faut rentrer dans la logique d'avantage
      if (player === PLAYER_1) {
        handleDeuce(score.player1.jeu, score.player2.jeu, player);
      } else {
        handleDeuce(score.player2.jeu, score.player1.jeu, player);
      }
    } else {
      if (player === PLAYER_1) {
        if (score.player1.jeu === 3) {
          playerWonJeu(player);
        } else {
          score = { ...score, player1: updateJeu(score.player1) };
        }
      } else if (player === PLAYER_2) {
        if (score.player2.jeu === 3) {
          playerWonJeu(player);
        } else {
          score = { ...score, player2: updateJeu(score.player2) };
        }
      }
    }
  }
}

function isWinner() {
  // premier joueur a 2 set gagnant
  let player1Victory = 0;
  let player2Victory = 0;
  score.player1.sets.forEach(function (set, index) {
    if (set > score.player2.sets[index]) {
      player1Victory = player1Victory + 1;
    } else {
      player2Victory = player2Victory + 1;
    }
  });
  if (player1Victory >= 2) {
    console.log("JEU SET ET MATCH PLAYER 1");
  } else if (player2Victory >= 2) {
    console.log("JEU SET ET MATCH PLAYER 2");
  }
}

function showScore() {
  console.log(
    "Player 1 \t",
    score.player1.sets.length
      ? score.player1.sets.reduce((acc, cur) => acc + " " + cur)
      : "",
    score.player1.actualSet,
    " | ",
    isTieBreak() ? score.player1.jeu : POINT[score.player1.jeu]
  );
  console.log(
    "Player 2 \t",
    score.player2.sets.length
      ? score.player2.sets.reduce((acc, cur) => acc + " " + cur)
      : "",
    score.player2.actualSet,
    " | ",
    isTieBreak() ? score.player2.jeu : POINT[score.player2.jeu]
  );
  if (isTieBreak()) {
    console.log("TIE BREAK !");
  }
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");

console.log("Quel player a marqué ? 1 : 2");
process.stdin.on("data", function (input) {
  const player = parseInt(input.trim());
  if (player === PLAYER_1 || player === PLAYER_2) {
    updateScore(player);
  } else {
    console.log("Player undefined");
  }
  showScore();
  if (isWinner()) {
    return false;
  }
  console.log("Quel player a marqué ? 1 : 2");
});

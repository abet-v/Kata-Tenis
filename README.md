---
title: "KataTennis"
draft: false
date: "2018-01-23T14:30:00"
aliases:
  - "/KataTennis"
---

**About this Kata**

This Kata is about implementing a simple tennis game. I came up with itwhile thinking about Wii tennis, where they have simplified tennis, soeach set is one game.The scoring system is rather simple:

1\. Each player can have either of these points in one game 0 15 30 40

2\. If you have 40 and you win the ball you win the game, however thereare special rules.

3\. If both have 40 the players are deuce. a. If the game is in deuce,the winner of a ball will have advantage and game ball. b. If the playerwith advantage wins the ball he wins the game c. If the player withoutadvantage wins they are back at deuce.

---

## Game

1\. A game is won by the first player to have won at least four points intotal and at least two points more than the opponent.

2\. The running score of each game is described in a manner peculiar totennis: scores from zero to three points are described as "love","fifteen", "thirty", and "forty" respectively.

3\. If at least three points have been scored by each player, and thescores are equal, the score is "deuce".

4\. If at least three points have been scored by each side and a playerhas one more point than his opponent, the score of the game is"advantage" for the player in the lead.

---

## Set

1\. A set is won by the first player to have won at least 6 games in total and atleast two points more than the opponent.

2\. If 5 games have been scored by each side, the first player to win 7 games wins the set.3\. If 6 games have been scored by each side, there is a "tie break" : points increase normally (1, 2, 3, ...).The first player to win at least 7 points with at least 2 points more than the opponent wins the set.

---

## Match

1\. The first player to win 2 sets wins the match.

**Source**http://codingdojo.org/kata/Tennis/

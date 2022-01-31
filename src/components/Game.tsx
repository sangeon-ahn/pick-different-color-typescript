import { useCallback, useRef, useState } from "react";
import React from 'react';
import GameBoard from "./GameBoard";
import ScoreBoard from './ScoreBoard';
import createRandomColor from "../utils/createRandomColor";
import createRandomId from "../utils/createRandomId";
import createEndMessage from "../utils/createEndMessage";
import useInterval from "../hooks/useInterval";
import styled from 'styled-components';

const INITIAL_NUMBER_OF_TILES: number = 4;
const INITIAL_TIME_COUNT: number = 15;
const PENALTY_TIME: number = 3

interface GameState {
  stage: number,
  score: number,
  tiles: Array<{id: string}>,
  randomId: string,
  randomRgbList: Array<number>,
  timeCount: number
}

const initialState = {
  stage: 1,
  score: 0,
  tiles: [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ],
  randomId: createRandomId(INITIAL_NUMBER_OF_TILES),
  randomRgbList: createRandomColor(),
  timeCount: INITIAL_TIME_COUNT,
} as GameState;

const GameBlock = styled.div`
  display: flex;
  width: 600px;
  height: 600px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const Game = () => {
  const [state, setState] = useState(initialState);

  const { tiles, stage, randomId, randomRgbList, timeCount, score } = state;

  const numberOfTiles = useRef(INITIAL_NUMBER_OF_TILES);

  useInterval(() => {
    if (timeCount <= 0) {
      window.alert(createEndMessage(stage, score));

      setState({
        ...initialState,
        randomId: createRandomId(INITIAL_NUMBER_OF_TILES),
        randomRgbList: createRandomColor(),
      });

      numberOfTiles.current = INITIAL_NUMBER_OF_TILES;

      return null;
    }

    setState(state => ({
      ...state,
      timeCount: state.timeCount - 1
    }));

  }, 1000);

  const handleGameBoardClick = useCallback((e) => {
    if (e.target.id !== randomId) {
      console.log('diff: ', e.target.id, randomId);
      setState(state => ({
        ...state,
        timeCount: state.timeCount - PENALTY_TIME < 0 ? 0 : state.timeCount - PENALTY_TIME
      }));

      return null;
    }
    console.log('same');
    numberOfTiles.current = Math.pow(Math.round((stage + 1 + 0.5) / 2) + 1, 2);

    setState(state => {
      const newTiles = [];

      for (let i = 0; i < numberOfTiles.current; i++) {
        newTiles.push({ id: `${i + 1}` });
      }

      return {
        ...state,
        randomId: createRandomId(numberOfTiles.current),
        randomRgbList: createRandomColor(),
        stage: state.stage + 1,
        tiles: newTiles,
        timeCount: INITIAL_TIME_COUNT,
        score: state.score + Math.pow(state.stage, 3) * state.timeCount
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomId]);

  return (
    <GameBlock>
      <ScoreBoard
        stage={stage}
        timeCount={timeCount}
        score={score}
      />
      <GameBoard
        stage={stage}
        randomRgbList={randomRgbList}
        randomId={randomId}
        tiles={tiles}
        handleGameBoardClick={handleGameBoardClick}
        numberOfTiles={numberOfTiles.current}
      />
    </GameBlock>
  );
};

export default React.memo(Game);


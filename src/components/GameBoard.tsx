import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import type { ReactElement, HTMLAttributes } from 'react';

const EASY_MODE = 3.0;
const NORMAL_MODE = 2.0;
const HARD_MODE = 1.5;

const GameBoardBlock = styled.div`
  position: relative;
  display: flex;
  width: 360px;
  height: 360px;
  flex-wrap: wrap;
`;

interface TileProps extends HTMLAttributes<HTMLElement> {
  numberOfTiles: number,
  randomId?: string,
  randomRgbList?: number[],
  similarRgbList?: number[],
  id?: string
}

const TileBlock = styled.div<TileProps>`
  position: relative;
  width: ${props => (360 / Math.sqrt(props.numberOfTiles)) - 4}px;
  height: ${props => (360 / Math.sqrt(props.numberOfTiles)) - 4}px;
  margin: 2px;
  background-color: ${props => props.id === props.randomId ?
    `rgb(${props.similarRgbList})` :
    `rgb(${props.randomRgbList})`
  };
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;

  button {
    padding: 5px;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    background-color: wheat;
    font-weight: 600;
    cursor: pointer;
  }
`;

interface Props {
  stage: number,
  randomRgbList: number[],
  randomId: string,
  tiles: Array<{id: string}>,
  handleGameBoardClick: React.MouseEventHandler<HTMLDivElement>,
  numberOfTiles: number,
}

const GameBoard = React.memo(({
  stage,
  randomRgbList,
  randomId,
  tiles,
  handleGameBoardClick,
  numberOfTiles
}: Props): ReactElement => {
  const [red, green, blue] = randomRgbList;
  const [difficulty, setDifficulty] = useState(HARD_MODE);

  const createAnswerTileRgbList: () => number[] =() => {

    return [Math.pow((stage - 0.5)/stage, difficulty) * red, Math.pow((stage - 0.5)/stage, difficulty) * green, Math.pow((stage - 0.5)/stage, difficulty) * blue];
  };

  return (
    <GameBoardBlock
      onClick={handleGameBoardClick}
    >
      {tiles.map(tile => {
        return (
          <TileBlock
            key={tile.id}
            id={tile.id}
            numberOfTiles={numberOfTiles}
            randomId={randomId}
            randomRgbList={randomRgbList}
            similarRgbList={createAnswerTileRgbList()}
          />
        );
      })}
      <ButtonsContainer>
        <button onClick={() => setDifficulty(HARD_MODE)}>어려움</button>
        <button onClick={() => setDifficulty(NORMAL_MODE)}>중간</button>
        <button onClick={() => setDifficulty(EASY_MODE)}>쉬움</button>
      </ButtonsContainer>
    </GameBoardBlock>
  );
});

export default GameBoard;


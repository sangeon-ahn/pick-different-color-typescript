import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';

interface ITileStyleProps {
  numberOfTiles: number,
  correctTileId?: string,
  randomRgb?: number[],
  similarRgbList?: number[],
  id?: string
}

interface IGameBoardProps {
  stage: number,
  randomRgb: number[],
  correctTileId: string,
  tiles: Array<{id: string}>,
  handleGameBoardClick: React.MouseEventHandler<HTMLDivElement>,
  numberOfTiles: number,
}

const EASY_MODE = 3.0;
const NORMAL_MODE = 2.0;
const HARD_MODE = 1;

const GameBoardBlock = styled.div`
  position: relative;
  display: flex;
  width: 360px;
  height: 360px;
  flex-wrap: wrap;
`;

const TileBlock = styled.div<ITileStyleProps>`
  position: relative;
  width: ${props => (360 / Math.sqrt(props.numberOfTiles)) - 4}px;
  height: ${props => (360 / Math.sqrt(props.numberOfTiles)) - 4}px;
  margin: 2px;
  background-color: ${props => props.id === props.correctTileId ?
    `rgb(${props.similarRgbList})` :
    `rgb(${props.randomRgb})`
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

function GameBoard({
  stage,
  randomRgb,
  correctTileId,
  tiles,
  handleGameBoardClick,
  numberOfTiles
}: IGameBoardProps) {
  const [difficulty, setDifficulty] = useState<number>(HARD_MODE);

  const createAnswerTileRgbList = () => {
    const colorCoefficient = Math.pow((stage - 0.5) / stage, difficulty);

    return randomRgb.map(color => colorCoefficient * color);
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
            correctTileId={correctTileId}
            randomRgb={randomRgb}
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
};

export default React.memo(GameBoard);


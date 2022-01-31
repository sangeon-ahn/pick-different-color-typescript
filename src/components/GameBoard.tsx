import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';

interface ITileStyleProps {
  numberOfTiles: number,
  answerTileId?: string,
  normalTileRgb?: number[],
  answerTileRgb?: number[],
  id?: string
}

interface IGameBoardProps {
  stage: number,
  normalTileRgb: number[],
  answerTileId: string,
  tiles: Array<{id: string}>,
  handleGameBoardClick: React.MouseEventHandler<HTMLDivElement>,
  numberOfTiles: number,
}

const EASY_MODE = 0.1;
const NORMAL_MODE = 0.15;
const HARD_MODE = 0.25;

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
  background-color: ${props => props.id === props.answerTileId ?
    `rgb(${props.answerTileRgb})` :
    `rgb(${props.normalTileRgb})`
  };
  -webkit-tap-highlight-color: transparent;
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
  normalTileRgb,
  answerTileId,
  tiles,
  handleGameBoardClick,
  numberOfTiles
}: IGameBoardProps) {
  const [difficulty, setDifficulty] = useState<number>(HARD_MODE);

  const createAnswerTileRgbList = () => {
    const colorCoefficient = stage < 5 ? 0.8 : 2 / Math.PI * Math.atan(stage * difficulty)

    return normalTileRgb.map(color => colorCoefficient * color);
  };

  return (
    <div>
      <GameBoardBlock
        onClick={handleGameBoardClick}
      >
        {tiles.map(tile => {
          return (
            <TileBlock
              key={tile.id}
              id={tile.id}
              numberOfTiles={numberOfTiles}
              answerTileId={answerTileId}
              normalTileRgb={normalTileRgb}
              answerTileRgb={createAnswerTileRgbList()}
            />
          );
        })}
      </GameBoardBlock>
      <ButtonsContainer>
        <button onClick={() => setDifficulty(HARD_MODE)}>어려움</button>
        <button onClick={() => setDifficulty(NORMAL_MODE)}>중간</button>
        <button onClick={() => setDifficulty(EASY_MODE)}>쉬움</button>
      </ButtonsContainer>
    </div>
  );
};

export default React.memo(GameBoard);


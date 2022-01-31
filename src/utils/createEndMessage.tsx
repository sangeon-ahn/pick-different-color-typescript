function createEndMessage(stage: number, score: number) {
  return (`GAME OVER! \n스테이지: ${stage}, 점수: ${score}`);
};

export default createEndMessage;
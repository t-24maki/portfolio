import { createGame, runExperiment, startPlanning, chooseRecipe, growFinalGarden } from '../../lib/miracle-garden.mjs';

export function finishedGame(seed = 12, finalWater = 50) {
  let game = createGame({ seed });
  for (let i = 0; i < 12; i++) game = runExperiment(game, {
    flowerId: 'peach', water: [25, 50, 75, 60][i % 4], fertilizerId: ['none', 'leaf', 'gold'][i % 3],
  });
  return growFinalGarden(chooseRecipe(startPlanning(game), { flowerId: 'peach', water: finalWater, fertilizerId: 'none' }));
}

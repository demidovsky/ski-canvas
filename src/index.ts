/**
 * The entry point for the game. Creates the game, kicks off any loading that's needed and then starts the game running.
 */

import '../css/game.css';
import { Game } from './Core/Game';

document.addEventListener("DOMContentLoaded",async () => {
    const score = document.getElementById("score") as HTMLElement;
    const skiGame: Game = new Game(score);
    await skiGame.load();
    skiGame.run();

    const canvas = document.getElementById('skiCanvas') as HTMLCanvasElement;

    document.getElementById("playpause")!.addEventListener("click", () => {
        skiGame.playpause();
        canvas.toggleAttribute('disabled');
    });

    document.getElementById("restart")!.addEventListener("click", () => {
        skiGame.restart();
        canvas.removeAttribute('disabled');
    });
});
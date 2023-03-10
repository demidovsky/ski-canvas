import { expect, test } from "@jest/globals";
import { IMAGES, IMAGE_NAMES } from "../src/Constants";
// import { Game } from "./src/Core/Game";
import { ImageManager } from "../src/Core/ImageManager";
import { ObstacleManager } from "../src/Entities/Obstacles/ObstacleManager";

import { Skier, STATES } from '../src/Entities/Skier';



global.document.createElement = (function (create) {
    return function () {
        const element: HTMLElement = create.apply(this, arguments)
        
        if (element.tagName === 'IMG') {
          setTimeout(() => {
            // const [w, h] = ["32", "32"];
            // element.setAttribute('width', w)
            // element.setAttribute('naturalWidth', w)
            // element.setAttribute('height', h)
            // element.setAttribute('naturalHeight', h)
            element.onload!(new Event('load'))
          }, 100)
        }
        return element
     }
    })(document.createElement)



test('The skier should enter the jumping state when they hit the jump ramp.', () => {
    const skier = new Skier(0, 0, null, null, null);
    skier.jump();
    expect(skier.state).toBe(STATES.STATE_JUMP);
});

test('The skier should also enter the jumping state when the user presses the spacebar.', () => {
    const skier = new Skier(0, 0, null, null, null);
    skier.handleInput(' ');
    expect(skier.state).toBe(STATES.STATE_JUMP);
});


test('Rocks can be jumped over', async () => {
    const imageManager = new ImageManager();
    await imageManager.loadImages(IMAGES)
    const obstacleManager = new ObstacleManager(imageManager, null);
    obstacleManager.placeObstacle(0,0, IMAGE_NAMES.ROCK1)
    const skier = new Skier(0, 0, imageManager, obstacleManager, null);
    skier.jump();
    skier.checkIfHitObstacle();
    expect(skier.state).toBe(STATES.STATE_JUMP);
});



test('Trees can NOT be jumped over', async () => {
    // document.body.innerHTML = '<canvas id="skiCanvas"></canvas>';
    // const skiGame: Game = new Game();
    // await skiGame.load();
    const imageManager = new ImageManager();
    await imageManager.loadImages(IMAGES)
    const obstacleManager = new ObstacleManager(imageManager, null);
    obstacleManager.placeObstacle(0,0, IMAGE_NAMES.TREE)
    const skier = new Skier(0, 0, imageManager, obstacleManager, null);
    skier.jump();
    skier.checkIfHitObstacle();
    expect(skier.state).toBe(STATES.STATE_CRASHED);
});


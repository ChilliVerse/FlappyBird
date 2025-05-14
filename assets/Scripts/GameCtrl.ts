
import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node } from 'cc';

const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'this is ground',
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: "Result is here"
    })
    public results: Results;

    @property({
        type: Bird,
        tooltip: "Bird is here"
    })
    public bird: Bird;

    @property({
        type: PipePool,
        tooltip: "Pipe pool is here"
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    onLoad() {
        this.iniListener();

        this.results.resetScore();

        director.pause();
    }

    iniListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        })

    }

    //testing method DELETE ME IN FINAL VERSION
    onKeyDown(even: EventKeyboard) {
        switch (even.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.results.addScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
        }
    }

    startGame() {
        this.results.hideResult();
        director.resume();
    }

    gameOver() {
        this.results.showResult();
        director.pause();
    }

    resetGame() {
        this.results.resetScore();
        this.pipeQueue.reset();
        this.startGame();
    }

    passPipe() {
        this.results.addScore();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }
}
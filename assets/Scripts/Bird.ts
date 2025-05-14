
import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'How high can they fly'
    })
    public jumpHigh: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'How long can they fly'
    })
    public jumpDuration: number = 3.5;

    public birdAnimation: Animation;
    public birdLocation: Vec3;

    protected onLoad(): void {
        this.resetBird();

        this.birdAnimation = this.getComponent(Animation);
    }

    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);

        this.node.setPosition(this.birdLocation);
    }

    fly() {
        this.birdAnimation.stop();

        // 🧠 Gán lại vị trí hiện tại thay vì giữ (0,0)
        this.birdLocation = this.node.getPosition();

        tween(this.node.position.clone()) // clone để tránh mutate
            .to(this.jumpDuration, new Vec3(this.birdLocation.x, this.birdLocation.y + this.jumpHigh, 0), {
                easing: 'smooth',
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.setPosition(target);
                }
            })
            .start();

        this.birdAnimation.play();
    }
}
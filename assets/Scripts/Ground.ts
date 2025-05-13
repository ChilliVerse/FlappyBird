
import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: "Ground 1 is here"
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: "Ground 2 is here"
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: "Ground 3 is here"
    })
    public ground3: Node;

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1 = new Vec3();
    public tempStartLocation2 = new Vec3();
    public tempStartLocation3 = new Vec3();

    public gameSpeed: number = 50;

    protected onLoad(): void {
        this.startUp();
    }

    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}
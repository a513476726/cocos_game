import { _decorator, Component, EventKeyboard, EventMouse, input, Input, Node, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;
export const BLOCK_SIZE = 40; // 添加一个放大比
@ccclass('PlayerController')



export class PlayerController extends Component {
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _leftRun: boolean = false;
    private _rightRun: boolean = false;

    @property({type: Animation})
    private BodyAnim: Animation | null = null;


    start() {

    }

    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        } else {
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        }
    }
    update(deltaTime: number) {

        if(this._leftRun){
            console.log('左移动？', this._deltaPos.x)
            this._deltaPos.x -= 0.5 * deltaTime;
            this.toLeftRun(this._deltaPos);
        }

        if(this._rightRun){
            console.log('右移动？', this._deltaPos.x)
            this._deltaPos.x += 0.5 * deltaTime;
            this.toRightRun(this._deltaPos);
        }
    }

    onKeyDown(event: EventKeyboard){
        if(event.keyCode === 37 && !this._leftRun){
            console.log('向左')
            this._leftRun = true;
        }else if(event.keyCode === 39 && !this._rightRun){
            console.log('向右')
            this._rightRun = true;
        }

        if(event.keyCode === 67){
            if (this.BodyAnim) {
                this.BodyAnim.play('loopJump');
            }
        }

    }

    onKeyUp(event: EventKeyboard){
        if(event.keyCode === 37 && this._leftRun){
            this._leftRun = false;
        }else if(event.keyCode === 39 && this._rightRun){
            this._rightRun = false;
        }
    }
    toLeftRun(val){
        this._deltaPos.x = this.node.position.x - 1;
        this.node.setPosition(this._deltaPos);
    }

    toRightRun(val){
        this._deltaPos.x = this.node.position.x + 1;
        this.node.setPosition(this._deltaPos);
    }


}



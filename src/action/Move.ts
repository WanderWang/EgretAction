/**
 * Created by wander on 14-12-22.
 */
module egret.action {

    export class MoveBy extends ActionInterval {


        private _positionDelta:cc.Point;
        private _startPosition:cc.Point;
        private _previousPosition:cc.Point;


        constructor() {

            super();

            this._positionDelta = cc.p(0, 0);
            this._startPosition = cc.p(0, 0);
            this._previousPosition = cc.p(0, 0);
        }

        public initWithDuration(duration:number, position) {
            super.initWithDuration(duration,position);
            this._positionDelta.x = position.x;
            this._positionDelta.y = position.y;


        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            var locPosX = target.x;
            var locPosY = target.y;
            this._previousPosition.x = locPosX;
            this._previousPosition.y = locPosY;
            this._startPosition.x = locPosX;
            this._startPosition.y = locPosY;
        }


        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                var x = this._positionDelta.x * time;
                var y = this._positionDelta.y * time;
                var locStartPosition = this._startPosition;
                if (false) {//cc.ENABLE_STACKABLE_ACTIONS) { todo
//                var targetX = this._target.getPositionX();
//                var targetY = this._target.getPositionY();
//                var locPreviousPosition = this._previousPosition;
//
//                locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
//                locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
//                x = x + locStartPosition.x;
//                y = y + locStartPosition.y;
//
//                this._target.setPosition(x, y);
//                locPreviousPosition.x = x;
//                locPreviousPosition.y = y;
                } else {
                    this.target.x = locStartPosition.x + x;
                    this.target.y = locStartPosition.y + y;
                }
            }
        }


        public static create(duration, deltaPosition) {
            var moveBy = new MoveBy();
            moveBy.initWithDuration(duration, deltaPosition);
            return moveBy;
        }
    }


}

module cc {

    export function p(x:number, y:number):Point {
        return {x: x, y: y};
    }

    export interface Point {

        x:number;

        y:number;
    }

}
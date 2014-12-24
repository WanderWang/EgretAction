/**
 * Created by huanghaiying on 14/12/24.
 */


module egret.action {

    export class JumpBy extends ActionInterval {

        public _positionDelta:cc.Point;
        public _startPosition:cc.Point;
        private _previousPosition:cc.Point;

        _height:number;
        _jumps:number;


        constructor() {

            super();

            this._startPosition = cc.p(0, 0);
            this._previousPosition = cc.p(0, 0);
            this._positionDelta = cc.p(0, 0);
            this._height = 0;
            this._jumps = 0;
        }

        public initWithDuration(duration, position, height, jumps):boolean {
            super.initWithDuration(duration, position, height, jumps);
            this._positionDelta.x = position.x;
            this._positionDelta.y = position.y;
            this._height = height;
            this._jumps = jumps;
            return true;
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
                var frac = time * this._jumps % 1.0;
                var y = this._height * 4 * frac * (1 - frac);
                y += this._positionDelta.y * time;

                var x = this._positionDelta.x * time;
                var locStartPosition = this._startPosition;
                if (false) {
                    /**cc.ENABLE_STACKABLE_ACTIONS) { todo
                    var targetX = this.target.x;
                    var targetY = this.target.y;
                    var locPreviousPosition = this._previousPosition;

                    locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
                    locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
                    x = x + locStartPosition.x;
                    y = y + locStartPosition.y;

                    this.target.x = x;
                    this.target.y = y;
                    locPreviousPosition.x = x;
                    locPreviousPosition.y = y;*/
                } else {
                    this.target.x = locStartPosition.x + x;
                    this.target.y = locStartPosition.y + y;
                }
            }

        }

        public static create(duration, position, height, jumps) {
            var rotateBy:JumpBy = new JumpBy();
            rotateBy.initWithDuration(duration, position, height, jumps);
            return rotateBy;
        }
    }

    export class JumpTo extends JumpBy {

        public _endPosition:cc.Point;

        constructor() {

            super();

            this._endPosition = cc.p(0, 0);
        }

        public initWithDuration(duration, position, height, jumps):boolean {
            super.initWithDuration(duration, position, height, jumps);
            this._endPosition.x = position.x;
            this._endPosition.y = position.y;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);

            this._positionDelta.x = this._endPosition.x - this._startPosition.x;
            this._positionDelta.y = this._endPosition.y - this._startPosition.y;
        }

        public static create(duration, position, height, jumps) {
            var rotate:JumpTo = new JumpTo();
            rotate.initWithDuration(duration, position, height, jumps);
            return rotate;
        }
    }

}


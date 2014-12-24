/**
 * Created by huanghaiying on 14/12/24.
 */


module egret.action {

    export class ScaleBy extends ActionInterval {

        _startScaleX:number;
        _deltaScaleX:number;

        _startScaleY:number;
        _deltaScaleY:number;

        constructor() {

            super();

            this._startScaleX = 0;
            this._deltaScaleX = 0;
            this._startScaleY = 0;
            this._deltaScaleY = 0;
        }

        public initWithDuration(duration:number, sx, sy):boolean {
            super.initWithDuration(duration, sx, sy);
            this._deltaScaleX = sx;
            this._deltaScaleY = sy;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startScaleX = target.scaleX;
            this._startScaleY = target.scaleY;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.scaleX = this._startScaleX + this._deltaScaleX * time;
                this.target.scaleY = this._startScaleY + this._deltaScaleY * time;
            }
        }

        public static create(duration, sx, sy?) {
            sy = (sy != null) ? sy : sx;

            var rotate = new ScaleBy();
            rotate.initWithDuration(duration, sx, sy);
            return rotate;
        }
    }

    export class ScaleTo extends ActionInterval {

        _startScaleX:number;
        _endScaleX:number;

        _startScaleY:number;
        _endScaleY:number;

        constructor() {

            super();

            this._startScaleX = 0;
            this._endScaleX = 0;
            this._startScaleY = 0;
            this._endScaleY = 0;
        }

        public initWithDuration(duration:number, sx, sy):boolean {
            super.initWithDuration(duration, sx, sy);
            this._endScaleX = sx;
            this._endScaleY = sy;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startScaleX = target.scaleX;
            this._startScaleY = target.scaleY;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.scaleX = this._startScaleX + (this._endScaleX - this._startScaleX) * time;
                this.target.scaleY = this._startScaleY + (this._endScaleY - this._startScaleY) * time;
            }
        }

        public static create(duration, sx, sy?) {
            sy = (sy != null) ? sy : sx;

            var rotate = new ScaleTo();
            rotate.initWithDuration(duration, sx, sy);
            return rotate;
        }
    }

}
/**
 * Created by huanghaiying on 14/12/24.
 */


module egret.action {

    export class SkewBy extends ActionInterval {

        _startSkewX:number;
        _deltaSkewX:number;

        _startSkewY:number;
        _deltaSkewY:number;

        constructor() {

            super();

            this._startSkewX = 0;
            this._deltaSkewX = 0;
            this._startSkewY = 0;
            this._deltaSkewY = 0;
        }

        public initWithDuration(duration:number, skx, sky):boolean {
            super.initWithDuration(duration, skx, sky);
            this._deltaSkewX = skx;
            this._deltaSkewY = sky;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startSkewX = target.skewX;
            this._startSkewY = target.skewY;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.skewX = this._startSkewX + this._deltaSkewX * time;
                this.target.skewY = this._startSkewY + this._deltaSkewY * time;
            }
        }

        public static create(duration, skx, sky) {
            var rotate = new SkewBy();
            rotate.initWithDuration(duration, skx, sky);
            return rotate;
        }
    }

    export class SkewTo extends ActionInterval {

        _startSkewX:number;
        _endSkewX:number;

        _startSkewY:number;
        _endSkewY:number;

        constructor() {

            super();

            this._startSkewX = 0;
            this._endSkewX = 0;
            this._startSkewY = 0;
            this._endSkewY = 0;
        }

        public initWithDuration(duration:number, skx, sky):boolean {
            super.initWithDuration(duration, skx, sky);
            this._endSkewX = skx;
            this._endSkewY = sky;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startSkewX = target.skewX;
            this._startSkewY = target.skewY;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.skewX = this._startSkewX + (this._endSkewX - this._startSkewX) * time;
                this.target.skewY = this._startSkewY + (this._endSkewY - this._startSkewY) * time;
            }
        }

        public static create(duration, skx, sky) {
            var rotate = new SkewTo();
            rotate.initWithDuration(duration, skx, sky);
            return rotate;
        }
    }

}
/**
 * Created by huanghaiying on 14/12/24.
 */


module egret.action {

    export class RotateBy extends ActionInterval {

        _startAngle:number;
        _diffAngle:number;

        constructor() {

            super();

            this._startAngle = 0;
            this._diffAngle = 0;
        }

        public initWithDuration(duration:number, rotate?):boolean {
            super.initWithDuration(duration, rotate);
            this._diffAngle = rotate;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startAngle = target.rotation;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.rotation = this._startAngle + this._diffAngle * time;
            }
        }

        public static create(duration, rotate) {
            var rotateBy:RotateBy = new RotateBy();
            rotateBy.initWithDuration(duration, rotate);
            return rotateBy;
        }
    }

    export class RotateTo extends ActionInterval {

        _startAngle:number;
        _desAngle:number;

        constructor() {

            super();

            this._startAngle = 0;
            this._desAngle = 0;
        }

        public initWithDuration(duration:number, rotate?):boolean {
            super.initWithDuration(duration, rotate);
            this._desAngle = rotate;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startAngle = target.rotation;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.rotation = this._startAngle + (this._desAngle - this._startAngle) * time;
            }
        }

        public static create(duration, deltaRotation) {
            var rotate:RotateTo = new RotateTo();
            rotate.initWithDuration(duration, deltaRotation);
            return rotate;
        }
    }

}
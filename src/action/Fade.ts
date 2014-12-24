/**
 * Created by huanghaiying on 14/12/24.
 */


module egret.action {

    export class FadeTo extends ActionInterval {

        _startFade:number;
        _endFade:number;

        constructor() {

            super();

            this._startFade = 0;
            this._endFade = 0;
        }

        public initWithDuration(duration:number, alpha):boolean {
            super.initWithDuration(duration, alpha);
            this._endFade = alpha;
            return true;
        }

        /**
         * @param {Number} target
         */
        public startWithTarget(target:DisplayObject) {
            super.startWithTarget(target);
            this._startFade = target.alpha;
        }

        /**
         * @param {Number} time time in seconds
         */
        public update(time) {
            if (this.target) {
                this.target.alpha = this._startFade + (this._endFade - this._startFade) * time;
            }
        }

        public static create(duration, alpha) {
            alpha = Math.max(0, alpha);
            alpha = Math.min(1, alpha);
            var rotate = new FadeTo();
            rotate.initWithDuration(duration, alpha);
            return rotate;
        }
    }

    export class FadeIn extends FadeTo {
        public static create(duration) {
            var rotate = new FadeIn();
            rotate.initWithDuration(duration, 1);
            return rotate;
        }
    }

    export class FadeOut extends FadeTo {
        public static create(duration) {
            var rotate = new FadeOut();
            rotate.initWithDuration(duration, 0);
            return rotate;
        }
    }

}
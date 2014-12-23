/**
 * Created by wander on 14-12-22.
 */
module egret.action {


    var FLT_EPSILON = 0.0000001192092896;

    export class ActionInterval extends FiniteTimeAction {

        private _speed:number;
        private _times:number;
        private _repeatForever:boolean;
        private MAX_VALUE:number;
        private _repeatMethod:boolean;
        private _speedMethod:boolean;
        private _elapsed:number;
        private _firstTick:boolean;

        constructor() {
            super();
            this._elapsed = 0;
            this._firstTick = false;
        }


        /**
         * Initializes the action.
         * @param {Number} d duration in seconds
         * @return {Boolean}
         */
        public initWithDuration(d,param) {//todo
            this._duration = (d === 0) ? FLT_EPSILON : d;
            // prevent division by 0
            // This comparison could be in step:, but it might decrease the performance
            // by 3% in heavy based action games.
            this._elapsed = 0;
            this._firstTick = true;
//            return true;
        }


        /**
         * Returns true if the action has finished.
         * @return {Boolean}
         */
        public isDone() {
            return (this._elapsed >= this._duration);
        }



        /**
         * called every frame with it's delta time. <br />
         * DON'T override unless you know what you are doing.
         *
         * @param {Number} dt
         */
        public step (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this._elapsed = 0;
        } else
            this._elapsed += dt;

        //this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
        //this.update(Math.max(0, Math.min(1, this._elapsed / Math.max(this._duration, cc.FLT_EPSILON))));
        var t = this._elapsed / (this._duration > 0.0000001192092896 ? this._duration : 0.0000001192092896);
        t = (1 > t ? t : 1);
        this.update(t > 0 ? t : 0);

        //Compatible with repeat class, Discard after can be deleted (this._repeatMethod)
        if(this._repeatMethod && this._times > 1 && this.isDone()){
            if(!this._repeatForever){
                this._times--;
            }
            //var diff = locInnerAction.getElapsed() - locInnerAction._duration;
            this.startWithTarget(this.target);
            // to prevent jerk. issue #390 ,1247
            //this._innerAction.step(0);
            //this._innerAction.step(diff);
            this.step(this._elapsed - this._duration);

        }
    }


    }


}
/**
 * Created by wander on 14-12-22.
 */


module egret.action {


    var ACTION_TAG_INVALID:number = -1;


    export class Action {


        private originalTarget:any;
        public target:any;
        private tag:number;

        constructor() {
            this.originalTarget = null;
            this.target = null;
            this.tag = ACTION_TAG_INVALID;
        }

        /**
         *
         * @return {cc.Node}
         */
        public getOriginalTarget() {
            return this.originalTarget;
        }


        /**
         * to copy object with deep copy.
         * returns a clone of action.
         *
         * @return {cc.Action}
         */
        public clone() {
            var action = new Action();
            action.originalTarget = null;
            action.target = null;
            action.tag = this.tag;
            return action;
        }


        /**
         * return true if the action has finished.
         *
         * @return {Boolean}
         */
        public isDone() {
            return true;
        }


        /**
         * called before the action start. It will also set the target.
         *
         * @param {cc.Node} target
         */
        public startWithTarget(target) {
            this.originalTarget = target;
            this.target = target;
        }

        /**
         * called after the action has finished. It will set the 'target' to nil. <br />
         * IMPORTANT: You should never call "action stop" manually. Instead, use: "target.stopAction(action);"
         */
        public stop() {
            this.target = null;
        }


        /**
         * called every frame with it's delta time. <br />
         * DON'T override unless you know what you are doing.
         *
         * @param {Number} dt
         */
        public step(dt) {
        }

        /**
         * Called once per frame. Time is the number of seconds of a frame interval.
         *
         * @param {Number}  dt
         */
        public update(dt) {

        }

    }


    export class FiniteTimeAction extends Action {


        public _duration:number = 0;


        /** get duration in seconds of the action
         *
         * @return {Number}
         */
        public getDuration() {
            return this._duration;
        }

    }


}
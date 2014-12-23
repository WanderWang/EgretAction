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
        public initWithDuration(d, param?):boolean {//todo
            this._duration = (d === 0) ? FLT_EPSILON : d;
            // prevent division by 0
            // This comparison could be in step:, but it might decrease the performance
            // by 3% in heavy based action games.
            this._elapsed = 0;
            this._firstTick = true;
            return true;
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
        public step(dt) {
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
            if (this._repeatMethod && this._times > 1 && this.isDone()) {
                if (!this._repeatForever) {
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

    export class DelayTime extends ActionInterval {

        public update(dt) {

        }

        public static create(d):DelayTime {
            var action = new DelayTime();
            action.initWithDuration(d);
            return action;
        }

    }


    export class Sequence extends ActionInterval {
        private _actions:Array<any>;
        private _split;
        private _last;

        private _one:Action;
        private _two:Action;

        constructor(tempArray?) {
            super();
            this._actions = [];
            var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
            var last = paramArray.length - 1;
            if ((last >= 0) && (paramArray[last] == null))
                console.log("parameters should not be ending with null in Javascript");

            if (last >= 0) {
                var prev = paramArray[0], action1;
                for (var i = 1; i < last; i++) {
                    if (paramArray[i]) {
                        action1 = prev;
                        prev = Sequence._actionOneTwo(action1, paramArray[i]);
                    }
                }
                this.initWithTwoActions(prev, paramArray[last]);
            }
        }


        public update(dt):void{
//            dt = this._computeEaseTime(dt);todo
            var new_t, found = 0;
            var locSplit = this._split, locActions = this._actions, locLast = this._last;
            if (dt < locSplit) {
                // action[0]
                new_t = (locSplit !== 0) ? dt / locSplit : 1;

                if (found === 0 && locLast === 1) {
                    // Reverse mode ?
                    // XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
                    // since it will require a hack to know if an action is on reverse mode or not.
                    // "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
                    locActions[1].update(0);
                    locActions[1].stop();
                }
            } else {
                // action[1]
                found = 1;
                new_t = (locSplit === 1) ? 1 : (dt - locSplit) / (1 - locSplit);

                if (locLast === -1) {
                    // action[0] was skipped, execute it.
                    locActions[0].startWithTarget(this.target);
                    locActions[0].update(1);
                    locActions[0].stop();
                }
                if (!locLast) {
                    // switching to action 1. stop action 0.
                    locActions[0].update(1);
                    locActions[0].stop();
                }
            }

            // Last action found and it is done.
            if (locLast === found && locActions[found].isDone())
                return;

            // Last action found and it is done
            if (locLast !== found)
                locActions[found].startWithTarget(this.target);

            locActions[found].update(new_t);
            this._last = found;
        }


        /** initializes the Spawn action with the 2 actions to spawn
         * @param {cc.FiniteTimeAction} action1
         * @param {cc.FiniteTimeAction} action2
         * @return {Boolean}
         */
        public initWithTwoActions(actionOne, actionTwo) {
            if(!actionOne || !actionTwo)
                throw "cc.Sequence.initWithTwoActions(): arguments must all be non nil";

            var d = actionOne._duration + actionTwo._duration;
            this.initWithDuration(d);

            this._actions[0] = actionOne;
            this._actions[1] = actionTwo;
            return true;
        }


        /**
         * @param {cc.Node} target
         */
        public startWithTarget(target) {
            super.startWithTarget(target);
            this._split = this._actions[0].getDuration() / this._duration;
            this._last = -1;
        }

        private static _actionOneTwo(actionOne, actionTwo) {
            var sequence = new Sequence();
            sequence.initWithTwoActions(actionOne, actionTwo);
            return sequence;
        }

        public static create(tempArray) {
            var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
            if ((paramArray.length > 0) && (paramArray[paramArray.length - 1] == null))
                console.log("parameters should not be ending with null in Javascript");

            var prev = paramArray[0];
            for (var i = 1; i < paramArray.length; i++) {
                if (paramArray[i])
                    prev = Sequence._actionOneTwo(prev, paramArray[i]);
            }
            return prev;
        }
    }
}
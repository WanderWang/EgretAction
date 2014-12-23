/**
 * Created by wander on 14-12-23.
 */

module egret.action {

    export class ActionInstant extends FiniteTimeAction {


        public isDown() {
            return true;
        }

        public step(dt) {
            this.update(1);
        }

        public update(dt) {

        }

        public reverse() {
            return this.clone();
        }

        public clone() {
            return new ActionInstant();
        }
    }

    export class CallFunc extends ActionInstant {

        private _selectorTarget:any;
        private _callFunc;
        private _function;
        private _data;


        constructor(selector, selectorTarget, data) {
            super();
            if (selector !== undefined) {
                if (selectorTarget === undefined)
                    this.initWithFunction(selector);
                else this.initWithFunction(selector, selectorTarget, data);
            }
        }

        /**
         * @param {function|Null} selector
         * @param {object} selectorTarget
         * @param {*|Null} data data for function, it accepts all data types.
         * @return {Boolean}
         */
        public initWithTarget(selector, selectorTarget, data) {
            this._data = data;
            this._callFunc = selector;
            this._selectorTarget = selectorTarget;
            return true;


        }


        /**
         * initializes the action with the std::function<void()>
         * @param {function} func
         * @returns {boolean}
         */
        public initWithFunction(selector, selectorTarget?, data?) {
            if (selectorTarget) {
                this._data = data;
                this._callFunc = selector;
                this._selectorTarget = selectorTarget;
            }
            else if (selector)
                this._function = selector;
            return true;
        }

        /**
         * execute the function.
         */
        public execute() {
            if (this._callFunc != null)
                this._callFunc.call(this._selectorTarget, this.target, this._data);
            else if (this._function)
                this._function.call(null, this.target);
        }

        public update(time) {
            this.execute();
        }

        public getTargetCallback() {
            return this._selectorTarget;
        }

        public setTargetCallback(sel) {
            if (sel != this._selectorTarget) {
                if (this._selectorTarget)
                    this._selectorTarget = null;
                this._selectorTarget = sel;
            }
        }

        public copy() {
            throw new Error("dd")
        }

        public clone() {
            throw new Error("dsfds");
            return null;
        }

        public static create(selector, selectorTarget, data?) {
            return new CallFunc(selector, selectorTarget, data);
        }
    }
}

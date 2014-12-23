/**
 * Created by wander on 14-12-22.
 */
module egret.action {


    function arrayRemoveObject(arr, delObj) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == delObj) {
                arr.splice(i, 1);
                break;
            }
        }
    };


    export class Manager {

        private _hashTargets;
        private _arrayTargets:Array<any>
        private _currentTarget;
        private _currentTargetSalvaged:boolean;


        constructor() {
            this._hashTargets = {};
            this._arrayTargets = [];
            this._currentTarget = null;
            this._currentTargetSalvaged = false;
        }


        /** Adds an action with a target.
         * If the target is already present, then the action will be added to the existing target.
         * If the target is not present, a new instance of this target will be created either paused or not, and the action will be added to the newly created target.
         * When the target is paused, the queued actions won't be 'ticked'.
         * @param {cc.Action} action
         * @param {cc.Node} target
         * @param {Boolean} paused
         */
        public addAction(action, target, paused) {
            if (!action)
                throw "cc.ActionManager.addAction(): action must be non-null";
            if (!target)
                throw "cc.ActionManager.addAction(): action must be non-null";

            //check if the action target already exists
            var element = this._hashTargets[target.__instanceId];
            //if doesnt exists, create a hashelement and push in mpTargets
            if (!element) {
                element = new HashElement();
                element.paused = paused;
                element.target = target;
                this._hashTargets[target.__instanceId] = element;
                this._arrayTargets.push(element);
            }
            //creates a array for that eleemnt to hold the actions
            this._actionAllocWithHashElement(element);

            element.actions.push(action);
            action.startWithTarget(target);
        }


        private _actionAllocWithHashElement(element) {
            // 4 actions per Node by default
            if (element.actions == null) {
                element.actions = [];
            }
        }


        /**
         * @param {Number} dt delta time in seconds
         */
        public update(dt) {
            var locTargets = this._arrayTargets , locCurrTarget;
            for (var elt = 0; elt < locTargets.length; elt++) {
                this._currentTarget = locTargets[elt];
                locCurrTarget = this._currentTarget;
                //this._currentTargetSalvaged = false;
                if (!locCurrTarget.paused) {
                    // The 'actions' CCMutableArray may change while inside this loop.
                    for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length;
                         locCurrTarget.actionIndex++) {
                        locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
                        if (!locCurrTarget.currentAction)
                            continue;

                        locCurrTarget.currentActionSalvaged = false;
                        //use for speed
                        locCurrTarget.currentAction.step(dt * ( locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1 ));
                        if (locCurrTarget.currentActionSalvaged) {
                            // The currentAction told the node to remove it. To prevent the action from
                            // accidentally deallocating itself before finishing its step, we retained
                            // it. Now that step is done, it's safe to release it.
                            locCurrTarget.currentAction = null;//release
                        } else if (locCurrTarget.currentAction.isDone()) {
                            locCurrTarget.currentAction.stop();
                            var action = locCurrTarget.currentAction;
                            // Make currentAction nil to prevent removeAction from salvaging it.
                            locCurrTarget.currentAction = null;
                            this.removeAction(action);
                        }

                        locCurrTarget.currentAction = null;
                    }
                }

                // elt, at this moment, is still valid
                // so it is safe to ask this here (issue #490)

                // only delete currentTarget if no actions were scheduled during the cycle (issue #481)
                if (this._currentTargetSalvaged && locCurrTarget.actions.length === 0) {
                    this._deleteHashElement(locCurrTarget);
                }
            }
        }


        /** Removes an action given an action reference.
         * @param {cc.Action} action
         */
        public removeAction(action:Action) {
            // explicit null handling
            if (action == null)
                return;
            var target = action.getOriginalTarget();
            var element = this._hashTargets[target.__instanceId];

            if (element) {
                for (var i = 0; i < element.actions.length; i++) {
                    if (element.actions[i] == action) {
                        element.actions.splice(i, 1);
                        break;
                    }
                }
            } else {
//            todo
//            cc.log(cc._LogInfos.ActionManager_removeAction);
            }
        }


        private _deleteHashElement(element) {
            if (element) {
                delete this._hashTargets[element.target.__instanceId];
                arrayRemoveObject(this._arrayTargets, element);
                element.actions = null;
                element.target = null;
            }
        }


    }


}


module egret.action {


    export class HashElement {

        public actions:Array<any>;
        public target:any;
        public actionIndex:number;
        public currentAction:any //CCAction
        public currentActionSalvaged:boolean
        public paused:boolean;
        public hh:any //ut hash handle
        /**
         * Constructor
         */
        public constractor() {
            this.actions = [];
            this.target = null;
            this.actionIndex = 0;
            this.currentAction = null; //CCAction
            this.currentActionSalvaged = false;
            this.paused = false;
            this.hh = null; //ut hash handle
        }


    }

}
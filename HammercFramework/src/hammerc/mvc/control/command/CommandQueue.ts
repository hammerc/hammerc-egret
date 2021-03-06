﻿// =================================================================================================
//
//    Hammerc Framework
//    Copyright 2016 hammerc.org All Rights Reserved.
//
//    See LICENSE for full license information.
//
// =================================================================================================

namespace hammerc {
    /**
     * CommandQueue 类实现了多个命令顺序执行的命令列表类.
     * @author wizardc
     */
    export abstract class CommandQueue implements ICommand {
        /**
         * 记录需要顺序执行的命令类列表.
         */
        protected _subCommands: any[];

        /**
         * CommandQueue 类为抽象类, 不能被实例化.
         */
        public constructor() {
            this._subCommands = [];
            this.initializeCommands();
        }

        /**
         * 初始化命令列表.
         */
        protected abstract initializeCommands(): void;

        /**
         * 添加一个需要执行的命令类.
         * @param commandClass 需要执行的命令类.
         */
        protected addSubCommand(commandClass: any): void {
            this._subCommands.push(commandClass);
        }

        /**
         * 执行具体命令的方法.
         * @param notificationName 消息的名称.
         * @param args 附带的数据.
         */
        public execute(notificationName: string, ...args): void {
            while (this._subCommands.length != 0) {
                let commandClass = this._subCommands.shift();
                let commandInstance: ICommand = new commandClass();
                commandInstance.execute(notificationName, ...args);
            }
        }
    }
}

// 渲染进程消息发送
export enum WindowHandler {
    min = "main:window:min",
    hidden = "main:window:hidden",
    close = "main:window:close",
    openUrl = "main:window:open:url",
    toggle = "main:window:toggle",
    windowTop = "main:window:window:top",
}

// 渲染进程消息监听
export enum WindowListener {
    ready = "ready",
    quitWindow = "quit:app",
}

export interface IndexDict {
    [k: string]: unknown;
}

export interface IndexString {
    [k: string]: string;
}

export interface ResponseAnswerData {
    result: Array<{
        content: string;
        type: "human" | "ai";
        id: string;
    }>;
    current_agent: string;
    current_step: string;
    done: boolean;
    subtasks: [
        {
            description: string;
            agent: string;
            step: string;
        },
    ];
}

export interface UserInfo {
    id: string;
    username: string;
    status: string;
    role: {
        name: string;
    };
    info: {
        nickname: string;
        sex: number;
        avatar_url: string;
        phone: string;
        des: string;
    };
}

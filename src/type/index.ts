export enum WindowAction {
    min = 'min',
    hidden = 'hidden',
    close = 'close',
    openUrl = 'open:url',
    toggle = 'toggle',
    windowTop = 'window:top'
}

export enum WindowListener {
    ready = 'ready',
    quitWindow = 'quit:window'
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
        type: 'human' | 'ai';
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
        }
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

export type StepStatus = 'success' | 'error' | 'pending' | undefined;

export interface SetupOption {
    key: string;
    title: string;
    status: StepStatus;
    description: string;
    answer?: string;
}

export interface RobotMessageProps {
    status: 'loading' | 'step' | 'text';
    result: string | Array<SetupOption>;
}

export interface RobotMessageStepProps extends RobotMessageProps {
    result: Array<SetupOption>;
}

export interface MessageItem {
    id: number;
    type: 'robot' | 'user';
    question?: string; // 当 type 为 robot 时，则question 存在值
    status?: RobotMessageProps['status'];
    value: string | RobotMessageProps['result'];
}

export type MessageHistoryList = Array<
    Omit<MessageItem, 'status'> & {
        status?: RobotMessageProps['status'] | 'error';
    }
>;

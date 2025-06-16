import { observer } from 'mobx-react-lite';
import { memo, useState, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';

import Sender from '@/view/home/component/Sender';
import MessageHistory from '@/component/MessageHistory';
import { MessageHistoryList } from '@/component/MessageHistory/type';
import Welcome from '@/view/home/component/Welcome';

import { WindowListener, ResponseAnswerData } from '@/type';
import useIpcListen from '@/hooks/useIpcListen';
import useEventSource from '@/hooks/useEventSource';
import { GET_ANSWER } from '@/request/sse/question';

export const Home = memo(
    observer(() => {
        const [thinking, setThinking] = useState(false);
        const [messageHistory, setMessageHistory] =
            useState<MessageHistoryList>([]);

        const ipcListen = useIpcListen();
        ipcListen(WindowListener.ready, (_: unknown, value: string) => {
            console.log('electron 启动成功...', value);
        });
        const getAnswer = useEventSource(GET_ANSWER);

        // 问题 loading 效果
        const loadingAnswer = (question: string) => {
            const id = Date.now();
            setThinking(true);
            const messages: typeof messageHistory = [
                {
                    id,
                    type: 'user',
                    value: question
                },
                {
                    id: id + 1,
                    type: 'robot',
                    value: '',
                    status: 'loading',
                    question
                }
            ];
            setMessageHistory(messageHistory.concat(messages));
        };

        // 问题异常效果
        const errorAnswer = () => {
            setMessageHistory((history) => {
                const newHistory = [...history];
                const lastHistoryItem = newHistory.at(-1);
                if (lastHistoryItem) {
                    lastHistoryItem.status = 'error';
                }
                return newHistory;
            });
            setThinking(false);
        };

        // 问题步骤分解
        const setupAnswer = (data: ResponseAnswerData) => {
            setMessageHistory((history) => {
                const newHistory = history;
                if (newHistory.length) {
                    if (data.done) {
                        const lastItem = newHistory.at(-1);
                        if (Array.isArray(lastItem?.value)) {
                            const lastStep = lastItem.value.at(-1);
                            const answer = data.result.at(-1);
                            if (lastStep && answer) {
                                lastStep.status = 'success';
                                lastStep.answer = answer.content;
                            }
                        }
                    } else {
                        if (!data.current_step && data.subtasks.length) {
                            // subtask 阶段
                            newHistory.pop();
                            const id = Date.now();
                            const subtasks: MessageHistoryList =
                                data.subtasks.map((item, index) => ({
                                    id: id + index,
                                    type: 'robot',
                                    status: 'step',
                                    value: [
                                        {
                                            key: item.step,
                                            title: item.agent,
                                            description: item.description,
                                            status:
                                                index === 0
                                                    ? 'pending'
                                                    : undefined
                                        }
                                    ]
                                }));
                            if (subtasks.length) newHistory.push(...subtasks);
                        } else {
                            // 匹配current step阶段
                            const lastItem = newHistory.at(-1);
                            if (Array.isArray(lastItem?.value)) {
                                let find = false;
                                lastItem.value = lastItem.value.map((item) => {
                                    if (item.key === data.current_step) {
                                        find = true;
                                        item.status = 'pending';
                                    } else {
                                        if (!find) item.status = 'success';
                                    }
                                    return item;
                                });
                            }
                        }
                    }
                }
                return JSON.parse(JSON.stringify(newHistory));
            });
        };

        // answer 返回 sse 实例
        const requestAnswer = useMemoizedFn(async (question: string) => {
            loadingAnswer(question);
            const close = getAnswer({ question }, (event, error) => {
                if (error) return errorAnswer();

                if (event?.data) {
                    const data: ResponseAnswerData = JSON.parse(event.data);
                    setupAnswer(data);

                    if (data.done) {
                        close();
                        setThinking(false);
                    }
                }
            });
        });

        // 重试问题
        const retryQuestion = useMemoizedFn((question: string) => {
            if (thinking) return;
            requestAnswer(question);
        });

        // 是否显示欢迎界面
        const showThinkingStep = useMemo(
            () => messageHistory?.length,
            [messageHistory]
        );

        return (
            <section className="w-[100vw] h-full">
                <section className="relative py-0 h-[calc(100%-60px)] flex flex-col">
                    <section
                        className={`flex items-center justify-center min-h-[65vh] px-[15%] ${showThinkingStep ? 'flex-1 overflow-y-auto' : ''}`}
                    >
                        {showThinkingStep ? (
                            <MessageHistory
                                retry={retryQuestion}
                                history={messageHistory}
                            />
                        ) : (
                            <Welcome />
                        )}
                    </section>
                    <Sender thinking={thinking} requestAnswer={requestAnswer} />
                </section>
            </section>
        );
    })
);

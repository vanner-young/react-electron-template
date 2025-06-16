import { memo, useEffect, useRef } from 'react';

import { Flex } from 'antd';
import { Bubble } from '@ant-design/x';
import UserIcon from '@/component/MessageHistory/UserIcon';
import RobotIcon from '@/component/MessageHistory/RobotIcon';
import Error, { RetryCb } from '@/component/MessageHistory/Error';

import RobotMessage from '@/component/MessageHistory/RobotMessage';
import { MessageHistoryList } from '@/component/MessageHistory/type';

export type MessageHistoryProps = {
    history: MessageHistoryList;
    retry: RetryCb;
};
export default memo(function (props: MessageHistoryProps) {
    const parentRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        Promise.resolve().then(() => {
            if (parentRef.current) {
                parentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }, [props.history.length]);

    return (
        <section className="w-full h-full border-box">
            <Flex gap="middle" vertical className="py-[30px]! px-[15px]!">
                {props.history.map((item) => (
                    <section key={item.id} ref={parentRef}>
                        {item.status === 'error' ? (
                            <Bubble
                                placement="start"
                                content={
                                    <Error
                                        question={item.question as string}
                                        retry={props.retry}
                                    />
                                }
                                avatar={<RobotIcon />}
                            />
                        ) : item.type === 'robot' && item.status ? (
                            <RobotMessage
                                result={item.value}
                                status={item.status}
                            />
                        ) : (
                            <Bubble
                                placement="end"
                                content={item.value}
                                avatar={<UserIcon />}
                            />
                        )}
                    </section>
                ))}
            </Flex>
        </section>
    );
});

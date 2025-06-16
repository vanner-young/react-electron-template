import { memo, useState } from 'react';
import { Sender } from '@ant-design/x';

export interface SenderProps {
    thinking: boolean;
    requestAnswer: (question: string) => Promise<void>;
}

export default memo(function (props: SenderProps) {
    const [value, setValue] = useState('');

    const submit = (value: string) => {
        setValue('');
        props.requestAnswer(value);
    };

    return (
        <section className="px-[15%]">
            <Sender
                value={value}
                onChange={setValue}
                loading={props.thinking}
                onSubmit={submit}
                placeholder="告诉我你的需求，让我来帮你完成吧！"
            />
        </section>
    );
});

import { memo } from 'react';
import Icon from '@/component/Icon';

export type RetryCb = (question: string) => void;

export default memo(function Error(props: {
    retry: RetryCb;
    question: string;
}) {
    return (
        <section>
            <span>服务异常, 请重试！</span>
            <Icon
                onClick={() => props.retry(props.question)}
                name="retry text-red-400 font-bold"
                active={true}
            />
        </section>
    );
});

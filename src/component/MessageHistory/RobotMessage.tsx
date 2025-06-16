import { memo } from 'react';

import { Space, Spin, Descriptions } from 'antd';
import { Bubble, ThoughtChain } from '@ant-design/x';
import { LoadingOutlined, TagsOutlined } from '@ant-design/icons';
import RobotIcon from '@/component/MessageHistory/RobotIcon';

import { StepStatus, RobotMessageProps, RobotMessageStepProps } from './type';

export const ContentOrStep = memo((props: RobotMessageStepProps) => {
    const textRenderText = new Map([
        ['pending', { text: '处理中', icon: <LoadingOutlined /> }],
        ['success', { text: '成功', icon: <TagsOutlined /> }],
        ['error', { text: '失败', icon: <TagsOutlined /> }],
        [undefined, { text: '待处理', icon: <TagsOutlined /> }]
    ]);

    const IconRender = (props: { status?: StepStatus }) => {
        return textRenderText.get(props.status)?.icon;
    };

    const stepText = (status?: StepStatus) => {
        return textRenderText.get(status)?.text;
    };

    return (
        <>
            {props.result.map((item) => (
                <ThoughtChain
                    key={item.key}
                    className="ml-[16px] mb-[16px] last-of-type:mb-0"
                    items={[
                        {
                            title: item?.title,
                            status: item?.status,
                            icon: <IconRender status={item.status} />,
                            description: `状态： ${item?.status}`,
                            content: (
                                <Descriptions column={1}>
                                    <Descriptions.Item label="Status">
                                        {stepText(item?.status)}
                                    </Descriptions.Item>
                                    {item.description && (
                                        <Descriptions.Item label="Question">
                                            {item?.description}
                                        </Descriptions.Item>
                                    )}
                                    {item.answer && (
                                        <Descriptions.Item label="Answer">
                                            {item.answer}
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            )
                        }
                    ]}
                />
            ))}
        </>
    );
});

export default memo(function (props: RobotMessageProps) {
    return (
        <>
            <Bubble
                className={`w-full ${props.status === 'step' ? 'w-full' : ''}`}
                loading={props.status === 'loading'}
                placement="start"
                loadingRender={() =>
                    props.status === 'loading' ? (
                        <Space>
                            <Spin size="small" />
                            <span>正在思考中...</span>
                        </Space>
                    ) : (
                        <></>
                    )
                }
                content={
                    Array.isArray(props.result) ? (
                        <ContentOrStep
                            result={props.result}
                            status={props.status}
                        />
                    ) : (
                        props.result
                    )
                }
                avatar={<RobotIcon />}
            />
        </>
    );
});

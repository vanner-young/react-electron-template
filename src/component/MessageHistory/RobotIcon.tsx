import { memo } from 'react';
import { Avatar } from 'antd';
import Icon from '@/component/Icon';

export default memo(function RobotIcon() {
    return (
        <Avatar
            size="large"
            style={{ backgroundColor: '#333333' }}
            icon={<Icon name="agent text-2xl!" />}
        />
    );
});

import { memo } from 'react';
import { Avatar } from 'antd';
import Icon from '@/component/Icon';

export default memo(function UserIcon() {
    return (
        <Avatar
            size="large"
            style={{ backgroundColor: '#1677ff' }}
            icon={<Icon name="user text-2xl!" />}
        />
    );
});

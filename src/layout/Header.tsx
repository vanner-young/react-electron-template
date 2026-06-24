import { memo } from 'react';
import { Modal } from 'antd';

import Icon from '@/component/Icon';
import { useIpcSend } from '@/hooks/useIpcSend';
import { useIpcListen } from '@/hooks/useIpcListen';
import { WindowHandler, WindowListener } from '@/type';
import { LOGO_URL } from '@/constance';

export default memo(() => {
    const [modal, contextHolder] = Modal.useModal();

    useIpcListen(WindowListener.quitWindow, async () => {
        modal.confirm({
            title: '提示',
            content: '确定要关闭程序吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => useIpcSend(WindowHandler.close)
        });
        useIpcSend(WindowHandler.windowTop);
    });

    return (
        <>
            {contextHolder}
            <section className="text-center border-box shadow-2xl shadow-[#aaaaaa] flex items-center justify-between app-region">
                <section className="pl-[15px] flex items-center leading-[50px]">
                    <img className="w-[25px] mr-[15px]" src={LOGO_URL} />
                    <h4 className="m-0 text-[.9rem] font-bold">
                        {import.meta.env.APP_NAME}
                    </h4>
                </section>
                <section>
                    <span
                        onClick={() => useIpcSend(WindowHandler.min)}
                        className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                    >
                        <Icon title="最小化" name="min" />
                    </span>
                    <span
                        onClick={() => useIpcSend(WindowHandler.toggle)}
                        className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                    >
                        <Icon title="全屏非全屏" name="houtai font-bold" />
                    </span>
                    <span
                        onClick={() => useIpcSend(WindowHandler.hidden)}
                        className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                    >
                        <Icon title="退出程序" name="close" />
                    </span>
                </section>
            </section>
        </>
    );
});

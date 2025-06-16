import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';

import Icon from '@/component/Icon';
import useIpcSend from '@/hooks/useIpcSend';
import { WindowAction, WindowListener } from '@/type';

import useIpcListen from '@/hooks/useIpcListen';
import { LOGO_URL } from '@/constance';

interface HeaderLayoutProps {}
export default React.memo<HeaderLayoutProps>(
    observer(() => {
        const ipcMessage = useIpcSend();
        const ipcListener = useIpcListen();
        const [modal, contextHolder] = Modal.useModal();

        const closeApplication = async () => {
            await ipcMessage(WindowAction.windowTop);

            modal.confirm({
                title: '提示',
                content: '确定要关闭程序吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => ipcMessage(WindowAction.close)
            });
        };
        ipcListener(WindowListener.quitWindow, closeApplication);

        return (
            <>
                {contextHolder}
                <section className="text-center border-box shadow-2xl shadow-[#aaaaaa] flex items-center justify-between app-region">
                    <section className="pl-[15px] flex items-center leading-[50px]">
                        <img className="w-[25px] mr-[15px]" src={LOGO_URL} />
                        <h4 className="m-0 text-[.9rem]">
                            {import.meta.env.APP_NAME}
                        </h4>
                    </section>
                    <section>
                        <span
                            onClick={() => ipcMessage(WindowAction.min)}
                            className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                        >
                            <Icon title="最小化" name="min" />
                        </span>
                        <span
                            onClick={() => ipcMessage(WindowAction.toggle)}
                            className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                        >
                            <Icon title="后台运行" name="houtai font-bold" />
                        </span>
                        <span
                            onClick={() => ipcMessage(WindowAction.hidden)}
                            className="p-[12px] cursor-pointer inline-block hover:bg-header-hover app-no-region"
                        >
                            <Icon title="退出程序" name="close" />
                        </span>
                    </section>
                </section>
            </>
        );
    })
);

import { memo } from 'react';
import { Welcome } from '@ant-design/x';

import Icon from '@/component/Icon';
import { LOGO_URL } from '@/constance';

const listData = [
    {
        name: 'frontend',
        title: '网站代码小助手',
        description:
            '开发网站代码，并且还可以帮你保存在本地，如果有需要也可以自动打开预览。'
    },
    {
        name: 'analyze',
        title: '文件分析小助手',
        description: '分析本地文件夹、文件、在线的网页链接，并汇总结果。'
    },
    {
        name: 'search',
        title: '资料查询小助手',
        description:
            '查询本地文件夹、文件、在线的网页链接，并根据内容结果查询问题。'
    },
    {
        name: 'translate',
        title: '语言翻译小助手',
        description:
            '查询本地文件、在线的网页链接，及聊天内容，并且可以自定义翻译资料库结合翻译。'
    }
];
export default memo(function () {
    return (
        <section className="w-full flex items-center justify-center flex-col">
            <Welcome
                className="flex items-center"
                variant="borderless"
                icon={<img src={LOGO_URL} alt="logo" width={60} />}
                title="你好，我是 react-electron-template， 有什么可以帮到你？"
                description="我可以帮你：编写网站代码、分析本地文件、分析抓取网页内容、操作本地系统、翻译文件~"
            />
            <section className="grid gap-[20px] grid-cols-2 mt-[50px]">
                {listData.map((item) => {
                    return (
                        <section
                            key={item.name}
                            className="py-[15px] px-[10px] radius-[10px] border-[#cccccc] border-1 flex flex-col cursor-pointer"
                        >
                            <section className="mb-[10px] flex items-center">
                                <Icon name={`${item.name} text-[1rem]`} />
                                <span className="ml-[5px]">{item.title}</span>
                            </section>
                            <section className="text-[0.8rem]">
                                {item.description}
                            </section>
                        </section>
                    );
                })}
            </section>
        </section>
    );
});

export default function Icon<C>({
    name,
    title,
    active = false,
    children,
    onClick
}: {
    name: string;
    title?: string;
    active?: boolean;
    children?: React.ReactNode;
    onClick?: () => C | void;
}) {
    return (
        <span
            onClick={() => onClick?.()}
            title={title}
            className={`icon iconfont icon-${name} ${active ? 'cursor-pointer' : ''}`}
        >
            {children}
        </span>
    );
}

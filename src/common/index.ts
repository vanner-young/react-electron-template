/**
 * 日期格式化
 * @param { Date } date 日期
 * @param { string } format 格式化字符串
 * **/
export const dataFormat = (date: Date, format: string) => {
    const padNumber = (num: number) => num.toString().padStart(2, '0');

    const year = String(date.getFullYear());
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    const seconds = padNumber(date.getSeconds());

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('hh', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

/**
 * 判断是否为客户端环境
 * **/
export const isClientEnv = (
    cb?: (isElectron: boolean) => void | Promise<(isElectron: boolean) => void>
) => {
    const env = !!import.meta.env.OPEN_ELECTRON;
    if (!env) {
        console.warn('electron env is not detected...');
    }
    if (cb) return cb(env);
    else return env;
};

export const delay = (time: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(true);
        }, time);
    });
};

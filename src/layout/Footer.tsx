import React from 'react';
import { version } from '../../package.json';

export default React.memo(() => {
    return (
        <section className="absolute bottom-0 w-full leading-[50px] text-center text-[.75rem] text-description">
            {import.meta.env.APP_NAME} version：{version}
        </section>
    );
});

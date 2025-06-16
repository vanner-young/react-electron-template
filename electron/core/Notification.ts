import { Notification } from 'electron';

class NotificationMessage {
    static instance: NotificationMessage | null;

    static getInstance() {
        if (!NotificationMessage.instance)
            NotificationMessage.instance = new NotificationMessage();
        return NotificationMessage.instance;
    }

    #notification!: Notification;

    constructor() {
        this.#notification = new Notification({
            timeoutType: 'default',
            silent: false
        });
    }

    close() {
        this.#notification.close();
    }

    show(
        { title = '', subtitle = '', body = '', closeBefore = false },
        cb: ((event: Electron.Event) => void) | null = null
    ) {
        if (closeBefore) this.close();
        this.#notification.title = title;
        this.#notification.subtitle = subtitle;
        this.#notification.body = body;
        this.#notification.show();
        if (cb) {
            this.#notification.on('click', cb);
            this.#notification.on('close', () =>
                this.#notification.off('click', cb)
            );
        }
    }
}

export default NotificationMessage;

import { create } from 'zustand';
import { UserInfo } from '@/type';

interface ModeState {
    info: () => UserInfo['info'] | null;
    userInfo: UserInfo | null;
    setUserInfo: (info: UserInfo | null) => void;
    cleanUserInfo: () => void;
}

export const useUserInfo = create<ModeState>()((set, get) => ({
    userInfo: {
        info: {
            nickname: '张三',
            sex: 0,
            avatar_url: '',
            phone: '',
            des: ''
        },
        id: '',
        username: '',
        status: '',
        role: {
            name: ''
        }
    },
    info() {
        const { userInfo } = get();
        if (!userInfo) return null;
        return userInfo['info'];
    },
    setUserInfo: (info: UserInfo | null) => {
        set({ userInfo: info });
    },
    cleanUserInfo: () => {
        set({ userInfo: null });
    }
}));

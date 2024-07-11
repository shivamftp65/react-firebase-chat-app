import { create } from 'zustand'
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverUserBlocked: false,

    chageChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser

        // check if the current user is blocked
        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId,
                user:null,
                isCurrentUserBlocked: true,
                isReceiverUserBlocked: false,
            });
        }
        // check if the reciever is blocked
        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user:user,
                isCurrentUserBlocked: false,
                isReceiverUserBlocked: true,
            });
        } else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverUserBlocked: false,
            });
        }
    },

    changeBlock: () => {
        set((state) => ({ ...state, isReceiverUserBlocked: !state.isReceiverUserBlocked }));
    },
    resetChat: () => {
        set({
          chatId: null,
          user: null,
          isCurrentUserBlocked: false,
          isReceiverUserBlocked: false,
        });
    },
}));
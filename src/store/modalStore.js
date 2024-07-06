// src/stores/modalStore.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isOpen: false,
        message: '',
    }),
    actions: {
        openModal(message) {
            this.isOpen = true;
            this.message = message;
        },
        closeModal() {
            this.isOpen = false;
            this.message = '';
        },
    },
});

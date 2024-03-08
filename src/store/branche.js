// branches.js
import { defineStore } from 'pinia';

export const useBranchesStore = defineStore('branches', {
  state: () => ({
    branches: [],
  }),

  actions: {
    addBranch(branch) {
      this.branches.push(branch);
    },
  },
});

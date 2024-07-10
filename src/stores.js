import { writable } from 'svelte/store';

const createCandidateIdStore = () => {
  let initialCandidateId = null;

  if (typeof window !== 'undefined' && localStorage.getItem('candidateId')) {
    initialCandidateId = localStorage.getItem('candidateId');
  }

  const { subscribe, set, update } = writable(initialCandidateId);

  return {
    subscribe,
    set: (value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('candidateId', value);
      }
      set(value);
    },
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('candidateId');
      }
      set(null);
    }
  };
};

export const candidateIdStore = createCandidateIdStore();

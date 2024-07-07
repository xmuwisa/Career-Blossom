import { writable } from 'svelte/store';

export const registrationData = writable({
    email: '',
    username: '',
    password: '',
});
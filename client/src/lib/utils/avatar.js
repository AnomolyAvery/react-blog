import md5 from 'md5';

export const getGravatarUrl = (email, size = 200) => {
    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
};

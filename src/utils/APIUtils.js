import { API_BASE_URL,DEFAULT_PAGE_SIZE } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function getAllPeople(page, size) {
    page = page || 0;
    size = size || DEFAULT_PAGE_SIZE;

    return request({
        url: API_BASE_URL + "/people?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPerson(personData) {
    return request({
        url: API_BASE_URL + "/people",
        method: 'POST',
        body: JSON.stringify(personData)
    });
}

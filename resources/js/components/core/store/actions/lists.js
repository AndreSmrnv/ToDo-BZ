import { RSAA, getJSON } from "redux-api-middleware";

export const loadLists = (route) => ({
    [RSAA]: {
        endpoint: route,
        method: 'GET',
        types: [
            'LOAD_LISTS_REQUEST',
            {
                type: (route === '/api/lists') ? 'LOAD_LISTS_SUCCESS' : 'LOAD_PREDEFINED_LISTS_SUCCESS',
                payload: async (action, state, response) => {
                    const result = await getJSON(response);
                    return { data: result };
                },
            },
            'LOAD_LISTS_FAILURE',
        ]
    }
});

export const addList = (name, pattern_id, predefined, user_id) => ({
    [RSAA]: {
        endpoint: '/api/lists',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'credentials': 'same-origin'
                },
        body: JSON.stringify({ name, pattern_id, predefined, user_id }),
        types: [
            'ADD_LIST_REQUEST',
            {
                type: 'ADD_LIST_SUCCESS',
                payload: async (action, state, response) => {
                    const result = await getJSON(response);
                    console.log({data: result})
                    return { data: result };
                },
            },
            'ADD_LIST_FAILURE',
        ]
    }
});


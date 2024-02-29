import Vue from 'vue';

export const tags = {
    loadTags(state, tags) {
        state.tags = {
            loaded: tags.loaded,
            data: tags.data
        };
    },
    addTag(state, tag) {
        state.tags.data.push(tag);
    },
    updateTag(state, tag) {
        const key = state.tags.data.findIndex(element => element.id === tag.id);
        Vue.set(state.tags.data, key, tag);
    },
    deleteTag(state, id) {
        state.tags.data = state.tags.data.filter(tag => tag.id !== id);
    }
};
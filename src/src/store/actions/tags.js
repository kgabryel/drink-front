import {tagsService} from '../../services/tags.service';
import {errorHandler} from '../../services/errorHandler';
import {ingredientsService} from '../../services/ingredients.service';

export const tags = {
    loadTags(context) {
        return tagsService.load().then(data => context.commit('loadTags', {loaded: true, data: data}));
    },
    addTag(context, name, publicTag) {
        return tagsService.add(name, publicTag)
            .then(tag => context.commit('addTag', tag))
            .catch(error => errorHandler.handle(error));
    },
    updateTag(context, data) {
        return tagsService.update(data.id, data.name)
            .then(updated => context.commit('updateTag', updated))
            .catch(error => errorHandler.handle(error));
    },
    deleteTag(context, id) {
        return tagsService.delete(id)
            .then(() => context.commit('deleteTag', id))
            .catch(error => errorHandler.handle(error));
    },
    updateTagPublic(context, data) {
        return tagsService.updatePublic(data.id, data.public)
            .then(updated => context.commit('updateTag', updated))
            .catch(error => errorHandler.handle(error));
    },
};
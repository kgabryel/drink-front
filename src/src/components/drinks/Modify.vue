<script>
import DrinkForm from './DrinkForm';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';

export default {
    name: 'Modify',
    extends: DrinkForm,
    props: {
        drink: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.btnText = 'Aktualizuj';
        this.id = this.drink.id;
        this.name = this.drink.name;
        this.description = this.drink.description;
        this.favourite = this.drink.favourite;
        this.publicDrink = this.drink.public;
        this.drinkTags = this.drink.tags.map(tag => this.$store.getters.tagById(tag).name.toLowerCase());
        this.drinkPositions = this.drink.positions.map(position => {
            return {
                amount: position.amount ?? '',
                ingredient: this.$store.getters.ingredientById(position.ingredientId).name
            };
        });
    },
    methods: {
        submit: function () {
            const data = {
                id: this.id,
                data: this.getData()
            };
            this.$store.dispatch(actionsNames.updateDrink, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinkUpdated);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>
<script>
import DrinkForm from './DrinkForm';
import {bus} from '../../main';
import {names} from '../../router/names';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';

export default {
    name: 'Create',
    extends: DrinkForm,
    mounted() {
        this.btnText = 'Dodaj';
    },
    methods: {
        submit: function () {
            this.$store.dispatch(actionsNames.addDrink, this.getData())
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinkAdded);
                    this.$router.push({name: names.allDrinks});
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>
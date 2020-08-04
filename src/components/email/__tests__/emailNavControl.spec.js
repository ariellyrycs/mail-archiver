import { shallowMount } from '@vue/test-utils';
import EmailNavControl from '../emailNavControl.vue';

describe('Mounted EmailNavControl', () => {
    test('loaded', () => {
        let wrapper = shallowMount(EmailNavControl);
        expect(wrapper.exists()).toBe(true);
    });
});

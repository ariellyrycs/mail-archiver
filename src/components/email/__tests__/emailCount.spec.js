import { mount } from '@vue/test-utils';
import EmailCount from '../emailCount.vue';

describe('Mounted EmailCount', () => {
    test('display length with the right pluralize info when length is 0', () => {
        let wrapper = mount(EmailCount, {
            propsData: {
                emailLength: 0
            }
        });
        expect(wrapper.find('.count').text()).toBe('Results: 0 emails');
        wrapper.destroy();
    });
    test('display length with the right pluralize info when length is 1', () => {
        let wrapper = mount(EmailCount, {
            propsData: {
                emailLength: 1
            }
        });
        expect(wrapper.find('.count').text()).toBe('Results: 1 email');
        wrapper.destroy();
    });
    test('display length with the right pluralize info when length is 2', () => {
        let wrapper = mount(EmailCount, {
            propsData: {
                emailLength: 2
            }
        });
        expect(wrapper.find('.count').text()).toBe('Results: 2 emails');
        wrapper.destroy();
    });
});

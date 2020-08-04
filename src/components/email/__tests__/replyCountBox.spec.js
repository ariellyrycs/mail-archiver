import { mount } from '@vue/test-utils';
import ReplyCountBox from '../replyCountBox.vue';

describe('Mounted ReplyCountBox', () => {
    test('loadbox with label', () => {
        let wrapper = mount(ReplyCountBox, {
            propsData: {
                replies: 1
            }
        });
        expect(wrapper.text()).toBe('+1');
    });
});

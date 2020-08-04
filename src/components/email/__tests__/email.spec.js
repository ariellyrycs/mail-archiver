import { shallowMount } from '@vue/test-utils';
import Email from '../email.vue';

describe('Mounted Email', () => {
    let props = {
        propsData: {
            email: {
                headers: {
                    sentDate: new Date('2020/01/01'),
                    from: 'aaa@example.com',
                    to: ['zzz.zz12z@example.com', 'zzz.zzz@example.com'],
                    subject: '[ HR-888 ] Notice of official announcement',
                    cc: ['paul1@hotmail.com']
                }
            }
        }
    };
    test('load header content', () => {
        const wrapper = shallowMount(Email, props);
        let wrapperAll = wrapper.find('.details').findAll('span');
        expect(wrapperAll.at(1).text()).toBe('aaa@example.com');
        expect(wrapperAll.at(2).text()).toBe('2020/0/1');
        expect(wrapperAll.at(4).text()).toBe(
            'zzz.zz12z@example.com and zzz.zzz@example.com'
        );
        expect(wrapperAll.at(6).text()).toBe('paul1@hotmail.com');
        expect(wrapperAll.at(8).text()).toBe(
            '[ HR-888 ] Notice of official announcement'
        );
        wrapper.destroy();
    });
});

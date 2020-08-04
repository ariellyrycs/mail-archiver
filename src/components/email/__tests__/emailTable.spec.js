import { shallowMount } from '@vue/test-utils';
import EmailTable from '../emailTable.vue';

describe('Mounted EmailTable', () => {
    test('loaded', () => {
        let wrapper = shallowMount(EmailTable, {
            propsData: {
                emails: [
                    {
                        headers: {
                            sentDate: new Date('2020/01/01'),
                            from: 'aaa@example.com',
                            to: [
                                'zzz.zz12z@example.com',
                                'zzz.zzz@example.com'
                            ],
                            subject:
                                '[ HR-888 ] Notice of official announcement',
                            cc: ['paul1@hotmail.com']
                        }
                    }
                ]
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});

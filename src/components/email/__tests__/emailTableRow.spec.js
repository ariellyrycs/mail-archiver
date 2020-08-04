import { shallowMount } from '@vue/test-utils';
import EmailTableRow from '../emailTableRow.vue';

describe('Mounted EmailTableRow', () => {
    let headers = {
        sentDate: new Date('2020/01/01'),
        from: 'aaa@example.com',
        to: ['zzz.zz12z@example.com', 'zzz.zzz@example.com'],
        subject: '[ HR-888 ] Notice of official announcement',
        cc: ['paul1@hotmail.com']
    };
    let attachments = [
        {
            url: 'src/assets/files/result.pdf',
            ext: 'pdf',
            name: 'result'
        }
    ];
    let replies = [];
    test('load images when attachments', () => {
        let wrapper = shallowMount(EmailTableRow, {
            propsData: {
                email: {
                    headers,
                    attachments,
                    replies
                }
            }
        });
        let imgs = wrapper.findAll('img');
        expect(imgs.length).toBe(1);
        expect(imgs.at(0).attributes('src')).toBe(
            '../../assets/imgs/icon_clip.svg'
        );
    });
    test('load images when attachments', () => {
        let wrapper = shallowMount(EmailTableRow, {
            propsData: {
                email: {
                    headers,
                    attachments: [],
                    replies
                }
            }
        });
        let imgs = wrapper.findAll('img');
        expect(imgs.length).toBe(0);
    });
    test('load images when attachments', () => {
        let wrapper = shallowMount(EmailTableRow, {
            propsData: {
                email: {
                    headers,
                    attachments: [],
                    replies
                }
            }
        });
        let imgs = wrapper.findAll('td');
        expect(imgs.at(0).text()).toBe('aaa@example.com');
        expect(imgs.at(1).text()).toBe(
            'zzz.zz12z@example.com and zzz.zzz@example.com'
        );
        expect(imgs.at(2).text()).toBe(
            '[ HR-888 ] Notice of official announcement'
        );
    });
});

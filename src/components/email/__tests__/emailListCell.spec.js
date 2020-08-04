import { shallowMount } from '@vue/test-utils';
import emailListCell from '../emailListCell.vue';

describe('Mounted emailListCell', () => {
    let headers = {
        sentDate: 1595715799505,
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
    test('display images when there are attachments', () => {
        let wrapper = shallowMount(emailListCell, {
            propsData: {
                email: {
                    headers,
                    attachments,
                    replies: []
                }
            }
        });
        let imgs = wrapper.findAll('img');
        expect(imgs.at(0).attributes('src')).toBe(
            '../../assets/imgs/icon_mail_sp.svg'
        );
        expect(imgs.at(1).attributes('src')).toBe(
            '../../assets/imgs/icon_arrow02.svg'
        );
        expect(imgs.at(2).attributes('src')).toBe(
            '../../assets/imgs/icon_clip.svg'
        );
        wrapper.destroy();
    });
    test('display images when there are no attachments', () => {
        let wrapper = shallowMount(emailListCell, {
            propsData: {
                email: {
                    headers,
                    attachments: [],
                    replies: []
                }
            }
        });
        expect(wrapper.findAll('img').length).toBe(2);
        wrapper.destroy();
    });
    test('display lebels', () => {
        let wrapper = shallowMount(emailListCell, {
            propsData: {
                email: {
                    headers,
                    attachments: [],
                    replies: []
                }
            }
        });
        let spans = wrapper.findAll('span');
        expect(spans.at(0).text()).toBe('aaa@example.com');
        expect(spans.at(1).text()).toBe(
            'zzz.zz12z@example.com and zzz.zzz@example.com'
        );
        expect(wrapper.find('.subject').text()).toBe(
            '[ HR-888 ] Notice of official announcement'
        );
        wrapper.destroy();
    });
});
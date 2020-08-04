import { shallowMount } from '@vue/test-utils';
import EmailList from '../emailList.vue';

describe('Mounted EmailList', () => {
    let emails = [
        {
            id: 1596337038535,
            headers: {
                sentDate: 1595715799505,
                from: 'aaa@example.com',
                to: ['zzz.zz12z@example.com', 'zzz.zzz@example.com'],
                subject: '[ HR-888 ] Notice of official announcement',
                cc: ['paul1@hotmail.com']
            },
            footer: {
                content: '<p>sent by aaaa</p>'
            },
            content:
                '<p> Example #0 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa rem neque distinctio ut numquam, omnis quisquam atque sed reprehenderit velit inventore molestiae maiores iste rerum unde maxime minima nobis voluptatum!<p>',
            attachments: [],
            replies: [
                {
                    headers: {
                        sentDate: 1595715799505,
                        from: 'aaa@example.com',
                        to: ['2szz.zzz@example.com'],
                        subject: '[ HR-888 ] Notice of official announcement',
                        cc: ['george.ul@hotmail.com', 'george.ul@hotmail.com']
                    },
                    content:
                        '<p>Examples # 0 + 1 <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione molestiae officiis est odio dolores cumque officia, explicabo. Aspernatur adipisci pariatur iusto ut quidem voluptatum enim voluptate deleniti unde, cupiditate recusandae.</span>\n        <span>Ut maiores fugiat eaque, velit sunt asperiores sint temporibus doloremque eum possimus nulla distinctio adipisci commodi, nisi quidem ipsa consequuntur est ratione beatae rerum perspiciatis labore eos quia. Animi, voluptatem.</span>\n        <span>Quod cupiditate molestiae reprehenderit ut veritatis voluptatem earum magni quidem dicta quos ex pariatur, nesciunt vitae, eius atque laborum, ipsum quam rerum facilis enim necessitatibus eaque accusantium. Esse, aperiam vitae?</span></p>',
                    footer: {
                        content: '<p>sent by aaa</p>'
                    }
                }
            ]
        }
    ];
    test('mounted', () => {
        let wrapper = shallowMount(EmailList, {
            propsData: {
                emails: emails
            }
        });
        expect(wrapper.exists()).toBeTruthy();
    });
});

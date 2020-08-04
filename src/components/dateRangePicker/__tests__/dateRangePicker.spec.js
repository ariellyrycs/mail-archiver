import { mount } from '@vue/test-utils';
import DateRangePicker from '../dateRangePicker.vue';

describe('Mounted DateRangePicker', () => {
    test('load images', () => {
        let wrapper = mount(DateRangePicker, {
            propsData: {
                defaultFrom: new Date('Sun Aug 02 1980'),
                defaultTo: new Date('Sun Aug 02 2020'),
                avaiableLastDate: new Date('Sun Aug 03 2020'),
                avaiableFirstDate: new Date('Sun Aug 02 2019'),
                startingPoint: new Date('Sun Jul 20 2019')
            }
        });
        let imgs = wrapper.findAll('img');
        expect(imgs.at(0).attributes('src')).toBe(
            '../../assets/imgs/icon_calender.svg'
        );
        expect(imgs.at(1).attributes('src')).toBe(
            '../../assets/imgs/icon_search.svg'
        );
        wrapper.destroy();
    });

    test('should open the calendar', async () => {
        let wrapper = mount(DateRangePicker, {
            propsData: {
                defaultFrom: new Date('Sun Aug 02 1980'),
                defaultTo: new Date('Sun Aug 02 2020'),
                avaiableLastDate: new Date('Sun Aug 03 2020'),
                avaiableFirstDate: new Date('Sun Aug 02 2019'),
                startingPoint: new Date('Sun Jul 20 2019')
            }
        });
        let container = wrapper.find('.search-box-container');
        await container.trigger('click');
        expect(wrapper.find('.calendar-container').exists()).toBe(true);
        wrapper.destroy();
    });
    test('make a selection', async () => {
        let wrapper = mount(DateRangePicker, {
            propsData: {
                defaultFrom: new Date('Sun Aug 02 1980'),
                defaultTo: new Date('Sun Aug 02 2020'),
                avaiableLastDate: new Date('Sun Aug 03 2020'),
                avaiableFirstDate: new Date('Sun Aug 02 2019'),
                startingPoint: new Date('Sun Aug 02 2020')
            }
        });
        let container = wrapper.find('.search-box-container');
        await container.trigger('click');
        expect(wrapper.find('.calendar-container').exists()).toBe(true);
        let currentRow = wrapper
            .find('.days')
            .findAll('ul')
            .at(0);
        let currentCell = currentRow.findAll('li').at(6);
        await currentCell.find('a').trigger('click');
        expect(currentCell.attributes('class')).toBe('start');
        wrapper.destroy();
    });
});

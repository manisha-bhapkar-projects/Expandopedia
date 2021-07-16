import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import Pulse from './Pulse';

const setup = () => {
    return shallow(<Pulse />);
}

describe("Pulse Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render pulse without error',()=>{
        const pulse=findByTestAttr(wrapper,'Pulse')
        expect(pulse.length).toBe(1)
    })
    test('render pulse img without error',()=>{
        const pulseImg=findByTestAttr(wrapper,'pulse-img')
        expect(pulseImg.length).toBe(1)
    })

})
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import HeaderText from './HeaderText';

const setup = () => {
    return shallow(<HeaderText />);
}

describe("TimeLine Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render pulse without error',()=>{
        const headerDiv=findByTestAttr(wrapper,'headerText')
        expect(headerDiv.length).toBe(1)
    })


})
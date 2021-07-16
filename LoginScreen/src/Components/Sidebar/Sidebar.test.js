import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import Sidebar from './Sidebar';


const setup = () => {
    return shallow(<Sidebar />);
}

describe("SideBar Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test('Render SideBar Component  Without Error',()=>{
        const sideBar=findByTestAttr(wrapper,'sidebar')
        expect(sideBar.length).toBe(1)
    })

    test('Render Image Div',()=>{
        const Image=findByTestAttr(wrapper,'image')
        expect(Image.length).toBe(1)
    })

})
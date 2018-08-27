import { shallowMount } from '@vue/test-utils';
import AppNavigationItem from '@/components/AppNavigationItem';

describe('AppNavigationItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppNavigationItem, {
      propsData: {
        path:  '/#about-me',
        text:  'About Me',
        color: 'purple',
      },
      attachToDocument: true,
    });
  });

  it('renders correctly', () => {
    expect(wrapper.contains('li')).toBe(true);
  });

  it('should set properties', () => {
    const link = wrapper.find('.purple');
    expect(link.is('a')).toBeTruthy();
    expect(link.classes()).toContain('purple');
    expect(link.attributes().href).toBe('/#about-me');
    expect(link.text()).toBe('About Me');
  });

  it('should emit `navclose` event when no href sent', (done) => {
    wrapper.setProps({ path: '/' });
    wrapper.find('a').trigger('click');
    setTimeout(() => {
      expect(wrapper.emitted('navclose')).toBeTruthy();
      done();
    }, 1000);
  });

  it('should not emit `navclose` event when target not found', (done) => {
    wrapper.find('a').trigger('click');
    setTimeout(() => {
      expect(wrapper.emitted('navclose')).toBeFalsy();
      done();
    }, 1000);
  });
});

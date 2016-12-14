
import { h, Component } from 'preact';
import BackgroundImage from '../background-image';
import style from './style.scss';

export default class About extends Component {
	render() {
		return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg3.jpg" />
        <div className={style['page-content']}>
          <div className={style.container}>
            <h1>Who I am</h1>
            <h2>and <mark>what I do</mark></h2>
          </div>
        </div>
        <div className={style.content} data-midnight>
          <div className={style['container-narrow']}>
            <p className={style.intro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae dui felis. Ut consectetur dictum vulputate. Etiam mollis arcu vel odio sagittis mollis.</p>
            <p>Nunc feugiat mauris eleifend augue bibendum tempus. Duis at quam et nulla elementum vestibulum eget vitae sapien. Ut imperdiet ultrices erat sed egestas. Nunc scelerisque, tellus sagittis efficitur aliquet, massa libero malesuada neque, facilisis luctus est eros et metus. Maecenas porta nec diam ac dignissim. Vivamus sollicitudin, diam euismod rhoncus varius, arcu lorem vestibulum diam, eget volutpat nisl purus sed dolor. Praesent sagittis enim vel metus mollis, sed euismod neque sollicitudin. Phasellus posuere ipsum lorem, auctor tempor nibh vehicula et. Morbi et arcu varius, finibus elit quis, mollis eros. Cras tellus tellus, dignissim nec nisi in, maximus lobortis sem. Donec aliquam tellus sem, ut dictum justo fermentum non. Ut elementum lectus ut eleifend lacinia. Proin egestas sollicitudin convallis. Quisque gravida aliquet turpis vel malesuada.</p>
          </div>
        </div>
      </div>
		);
	}
}

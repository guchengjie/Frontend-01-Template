import { Text, create, Wrapper } from './createElement';
import { Carousel } from './carousel';
import { Panel } from './Panel';
import { TabPanel } from './TabPanel';
import { ListView } from './ListView';

// const data = [
//   'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
//   'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
//   'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
//   'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
// ];

// const cpt = (
//   <Carousel data={data} />
// );

// cpt.mountTo(document.body);

// let a = <TabPanel title="this is a Panel">
//   <span title="title1">this is content1</span>
//   <span title="title2">this is content2</span>
//   <span title="title3">this is content3</span>
//   <span title="title4">this is content4</span>
// </TabPanel>;

// a.mountTo(document.body);

const data = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
  ];

let b = <ListView data={data}>
  {(record) => <figure>
    <img src={record}
         alt="Elephant at sunset" />
    <figcaption>An elephant at sunset</figcaption>
  </figure>}
</ListView>;

b.mountTo(document.body);
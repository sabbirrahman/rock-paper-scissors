import {Storage} from './Services/Storage';
import {Routes}  from './Routes';

Storage.save('name', 'Sabbir Rahman');
console.log(Storage.get('name'));
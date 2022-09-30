import React from 'react';
//import { useLocation } from 'react-router-dom';

import Layout from '../../components/Layout';

import * as S from './styles';

export default function Test () {

  /*
  const location = useLocation();
  
  const paths = location.pathname.split('/').map((p, i, arr) => {

    if(i === 0) {
      console.log('Init: Home');
    }

    console.log('Link to: ' + p);
    
    if(i === arr.length - 1) {
      console.log('Active: ' + p);
    }

    return p;
  });

  console.log(paths);
  */

  document.title = 'Teste | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <S.Delimiters>COMEÇO</S.Delimiters>
        <S.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor lacus vel elit cursus efficitur. Duis bibendum est a egestas iaculis. Curabitur magna velit, suscipit in malesuada sit amet, ornare vel turpis. Aliquam eleifend ante at ipsum convallis euismod. Etiam id massa et metus hendrerit aliquet. Nulla et est nec magna egestas eleifend non ac ex. Integer sollicitudin tellus a mollis porttitor. Mauris bibendum mi eget mi molestie ornare. Sed sagittis rutrum ex sit amet sodales.
        </S.Text>
        <S.Text>
          Nullam lacus diam, ornare sed sem et, fermentum aliquet enim. In hac habitasse platea dictumst. Maecenas arcu elit, aliquam sit amet vulputate sed, ultrices id mi. Donec quam metus, congue sed lectus sed, sagittis iaculis lorem. Proin augue urna, posuere sit amet pellentesque blandit, viverra quis felis. Sed vel tellus euismod, auctor diam a, pulvinar nisl. Suspendisse id neque at ipsum feugiat facilisis eget non lectus. Morbi gravida diam vel arcu condimentum, sed faucibus sapien hendrerit. Etiam ut nibh id est imperdiet blandit eu eu leo. Phasellus non nibh maximus, feugiat sapien in, tincidunt dui. Aliquam accumsan dolor a imperdiet mollis. Suspendisse tempus, augue quis tristique convallis, nisi lectus blandit sapien, at faucibus nibh ligula vel nunc.
        </S.Text>
        <S.Text>
          Duis a interdum dolor, eget dignissim purus. Nunc pulvinar scelerisque lorem rhoncus pulvinar. Cras faucibus leo quis leo sagittis, ut elementum nisl tempus. Aliquam id orci sed libero gravida tincidunt eu quis orci. Aenean lobortis, nisl ac varius dignissim, lacus nunc tempus nisi, id dictum ligula augue nec nisl. Ut eu accumsan magna. Mauris tempor quam et dapibus semper. Proin enim ligula, vulputate at urna quis, sagittis consectetur dolor. Vivamus vel lorem nec risus pretium ultrices. Nulla ipsum metus, ornare eget semper at, viverra sit amet nulla. Integer scelerisque luctus dolor, nec molestie arcu. Donec eu luctus erat. Nam porta turpis sed ante imperdiet mollis.
        </S.Text>
        <S.Text>
          Quisque ultricies efficitur mattis. Nulla varius sapien sem, nec auctor ligula bibendum in. Pellentesque lobortis libero eu velit maximus, et venenatis lacus lacinia. Suspendisse maximus purus vulputate tortor condimentum placerat. Duis erat nibh, accumsan porttitor dapibus a, imperdiet nec leo. In iaculis blandit nisl in lobortis. Pellentesque sed placerat lectus. Cras luctus justo dolor, et rhoncus ipsum malesuada eleifend. Donec sed eleifend ante, in maximus erat. Fusce sed imperdiet enim. Etiam eu nisl ac nisi eleifend viverra vestibulum vitae nisi. Aenean dui magna, maximus ac massa eget, cursus ultrices nulla. Cras ullamcorper nec ante ac consequat. Proin sed consequat ipsum, vitae fermentum diam.
        </S.Text>
        <S.Text>
          Fusce accumsan, tellus sed dapibus dapibus, nunc mauris venenatis nulla, non tincidunt diam felis eu ipsum. Aliquam vel hendrerit mauris. Proin vitae fermentum mauris. Vestibulum pulvinar sem sit amet lectus pulvinar, sed pellentesque purus egestas. Suspendisse fermentum dapibus tincidunt. Donec vulputate aliquam mattis. Donec scelerisque mi rhoncus ante pharetra condimentum. Cras eu odio pharetra, pretium quam non, dapibus sem. Etiam scelerisque turpis ut molestie tincidunt. In bibendum vehicula erat a ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed posuere sapien ipsum, vel molestie justo pulvinar vel. Vestibulum ut sem sit amet velit viverra pharetra eget vel orci. Sed at ligula quis neque malesuada sagittis in sed risus. Nulla elementum ligula sit amet convallis vulputate.
        </S.Text>
        <S.Text>
          In nec mauris id magna vehicula suscipit. Praesent volutpat elementum felis, ac commodo velit iaculis vel. Proin urna nibh, volutpat eu finibus ut, viverra quis ex. Nullam tincidunt porta augue, nec lacinia lectus iaculis rhoncus. Pellentesque placerat et est sit amet dignissim. Sed iaculis dolor libero, vel venenatis felis interdum ultrices. Donec sit amet nunc sed lectus volutpat venenatis. Morbi sollicitudin ipsum purus, sit amet varius nibh condimentum viverra. Nulla mattis at tortor quis congue.
        </S.Text>
        <S.Text>
          Aliquam varius vulputate enim sit amet luctus. Proin non pharetra purus. Nunc eleifend facilisis nulla, sit amet eleifend lorem placerat vitae. Cras sem ante, elementum non orci eget, hendrerit bibendum mi. Cras hendrerit iaculis efficitur. Proin et eleifend eros. Ut vel turpis dolor. Sed condimentum tellus at mauris feugiat ullamcorper. Donec placerat venenatis aliquet. Donec tristique lobortis nibh eu viverra. Nullam vestibulum consequat pharetra. Donec tempor elit vel magna porttitor vulputate. Aliquam lobortis, nisi in commodo vehicula, turpis nisi semper nisi, ut lacinia velit elit vel diam. Nullam eu lorem sapien.
        </S.Text>
        <S.Text>
          Cras varius arcu ut mattis molestie. Vestibulum a egestas eros. Sed eget mauris lobortis, placerat magna et, rhoncus leo. Vivamus vehicula sapien ultricies dui pellentesque, at posuere felis molestie. Phasellus malesuada hendrerit mauris, sit amet lacinia metus fermentum vel. Vivamus quis nulla convallis, consequat mi eget, consequat ligula. Ut molestie, velit et interdum dapibus, ante magna efficitur tortor, eget porta tellus lorem at est. Mauris nec leo ac metus sodales efficitur non vel velit. Duis non est leo. Phasellus ut pulvinar mi. Sed congue efficitur pellentesque. Duis consectetur erat nec lectus mollis imperdiet. Donec ut turpis in nibh blandit convallis eget ac est. Quisque nibh ex, fringilla non molestie eu, aliquam in sapien.
        </S.Text>
        <S.Text>
          Proin massa velit, vulputate a ornare ac, condimentum a nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent lorem felis, mattis sit amet lorem faucibus, elementum aliquet ex. Phasellus a nulla ligula. Vivamus libero tellus, vestibulum eget dictum nec, mattis ac metus. Vivamus nec est a mauris interdum finibus. Pellentesque eu ex eget felis fermentum ornare. Quisque non justo in augue viverra varius eget quis neque. Integer eu velit vel lorem faucibus eleifend vitae vel mi. Proin efficitur, libero eu varius auctor, elit lectus ultricies dui, in ornare orci sem non est. Duis faucibus magna in est rutrum, ac feugiat magna dapibus.
        </S.Text>
        <S.Text>
          Morbi ac viverra libero. Donec quis semper libero, sed tempus arcu. Quisque quis libero vulputate, sagittis augue quis, rutrum ipsum. Maecenas eget sagittis libero. Aliquam nec posuere tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus maximus neque sed nisl vehicula sodales in dapibus metus. Nunc at faucibus nisl, ac bibendum urna. Ut eu dapibus mi.
        </S.Text>
        <S.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor lacus vel elit cursus efficitur. Duis bibendum est a egestas iaculis. Curabitur magna velit, suscipit in malesuada sit amet, ornare vel turpis. Aliquam eleifend ante at ipsum convallis euismod. Etiam id massa et metus hendrerit aliquet. Nulla et est nec magna egestas eleifend non ac ex. Integer sollicitudin tellus a mollis porttitor. Mauris bibendum mi eget mi molestie ornare. Sed sagittis rutrum ex sit amet sodales.
        </S.Text>
        <S.Text>
          Nullam lacus diam, ornare sed sem et, fermentum aliquet enim. In hac habitasse platea dictumst. Maecenas arcu elit, aliquam sit amet vulputate sed, ultrices id mi. Donec quam metus, congue sed lectus sed, sagittis iaculis lorem. Proin augue urna, posuere sit amet pellentesque blandit, viverra quis felis. Sed vel tellus euismod, auctor diam a, pulvinar nisl. Suspendisse id neque at ipsum feugiat facilisis eget non lectus. Morbi gravida diam vel arcu condimentum, sed faucibus sapien hendrerit. Etiam ut nibh id est imperdiet blandit eu eu leo. Phasellus non nibh maximus, feugiat sapien in, tincidunt dui. Aliquam accumsan dolor a imperdiet mollis. Suspendisse tempus, augue quis tristique convallis, nisi lectus blandit sapien, at faucibus nibh ligula vel nunc.
        </S.Text>
        <S.Text>
          Duis a interdum dolor, eget dignissim purus. Nunc pulvinar scelerisque lorem rhoncus pulvinar. Cras faucibus leo quis leo sagittis, ut elementum nisl tempus. Aliquam id orci sed libero gravida tincidunt eu quis orci. Aenean lobortis, nisl ac varius dignissim, lacus nunc tempus nisi, id dictum ligula augue nec nisl. Ut eu accumsan magna. Mauris tempor quam et dapibus semper. Proin enim ligula, vulputate at urna quis, sagittis consectetur dolor. Vivamus vel lorem nec risus pretium ultrices. Nulla ipsum metus, ornare eget semper at, viverra sit amet nulla. Integer scelerisque luctus dolor, nec molestie arcu. Donec eu luctus erat. Nam porta turpis sed ante imperdiet mollis.
        </S.Text>
        <S.Text>
          Quisque ultricies efficitur mattis. Nulla varius sapien sem, nec auctor ligula bibendum in. Pellentesque lobortis libero eu velit maximus, et venenatis lacus lacinia. Suspendisse maximus purus vulputate tortor condimentum placerat. Duis erat nibh, accumsan porttitor dapibus a, imperdiet nec leo. In iaculis blandit nisl in lobortis. Pellentesque sed placerat lectus. Cras luctus justo dolor, et rhoncus ipsum malesuada eleifend. Donec sed eleifend ante, in maximus erat. Fusce sed imperdiet enim. Etiam eu nisl ac nisi eleifend viverra vestibulum vitae nisi. Aenean dui magna, maximus ac massa eget, cursus ultrices nulla. Cras ullamcorper nec ante ac consequat. Proin sed consequat ipsum, vitae fermentum diam.
        </S.Text>
        <S.Text>
          Fusce accumsan, tellus sed dapibus dapibus, nunc mauris venenatis nulla, non tincidunt diam felis eu ipsum. Aliquam vel hendrerit mauris. Proin vitae fermentum mauris. Vestibulum pulvinar sem sit amet lectus pulvinar, sed pellentesque purus egestas. Suspendisse fermentum dapibus tincidunt. Donec vulputate aliquam mattis. Donec scelerisque mi rhoncus ante pharetra condimentum. Cras eu odio pharetra, pretium quam non, dapibus sem. Etiam scelerisque turpis ut molestie tincidunt. In bibendum vehicula erat a ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed posuere sapien ipsum, vel molestie justo pulvinar vel. Vestibulum ut sem sit amet velit viverra pharetra eget vel orci. Sed at ligula quis neque malesuada sagittis in sed risus. Nulla elementum ligula sit amet convallis vulputate.
        </S.Text>
        <S.Text>
          In nec mauris id magna vehicula suscipit. Praesent volutpat elementum felis, ac commodo velit iaculis vel. Proin urna nibh, volutpat eu finibus ut, viverra quis ex. Nullam tincidunt porta augue, nec lacinia lectus iaculis rhoncus. Pellentesque placerat et est sit amet dignissim. Sed iaculis dolor libero, vel venenatis felis interdum ultrices. Donec sit amet nunc sed lectus volutpat venenatis. Morbi sollicitudin ipsum purus, sit amet varius nibh condimentum viverra. Nulla mattis at tortor quis congue.
        </S.Text>
        <S.Text>
          Aliquam varius vulputate enim sit amet luctus. Proin non pharetra purus. Nunc eleifend facilisis nulla, sit amet eleifend lorem placerat vitae. Cras sem ante, elementum non orci eget, hendrerit bibendum mi. Cras hendrerit iaculis efficitur. Proin et eleifend eros. Ut vel turpis dolor. Sed condimentum tellus at mauris feugiat ullamcorper. Donec placerat venenatis aliquet. Donec tristique lobortis nibh eu viverra. Nullam vestibulum consequat pharetra. Donec tempor elit vel magna porttitor vulputate. Aliquam lobortis, nisi in commodo vehicula, turpis nisi semper nisi, ut lacinia velit elit vel diam. Nullam eu lorem sapien.
        </S.Text>
        <S.Text>
          Cras varius arcu ut mattis molestie. Vestibulum a egestas eros. Sed eget mauris lobortis, placerat magna et, rhoncus leo. Vivamus vehicula sapien ultricies dui pellentesque, at posuere felis molestie. Phasellus malesuada hendrerit mauris, sit amet lacinia metus fermentum vel. Vivamus quis nulla convallis, consequat mi eget, consequat ligula. Ut molestie, velit et interdum dapibus, ante magna efficitur tortor, eget porta tellus lorem at est. Mauris nec leo ac metus sodales efficitur non vel velit. Duis non est leo. Phasellus ut pulvinar mi. Sed congue efficitur pellentesque. Duis consectetur erat nec lectus mollis imperdiet. Donec ut turpis in nibh blandit convallis eget ac est. Quisque nibh ex, fringilla non molestie eu, aliquam in sapien.
        </S.Text>
        <S.Text>
          Proin massa velit, vulputate a ornare ac, condimentum a nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent lorem felis, mattis sit amet lorem faucibus, elementum aliquet ex. Phasellus a nulla ligula. Vivamus libero tellus, vestibulum eget dictum nec, mattis ac metus. Vivamus nec est a mauris interdum finibus. Pellentesque eu ex eget felis fermentum ornare. Quisque non justo in augue viverra varius eget quis neque. Integer eu velit vel lorem faucibus eleifend vitae vel mi. Proin efficitur, libero eu varius auctor, elit lectus ultricies dui, in ornare orci sem non est. Duis faucibus magna in est rutrum, ac feugiat magna dapibus.
        </S.Text>
        <S.Text>
          Morbi ac viverra libero. Donec quis semper libero, sed tempus arcu. Quisque quis libero vulputate, sagittis augue quis, rutrum ipsum. Maecenas eget sagittis libero. Aliquam nec posuere tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus maximus neque sed nisl vehicula sodales in dapibus metus. Nunc at faucibus nisl, ac bibendum urna. Ut eu dapibus mi.
        </S.Text>
        <S.Delimiters>FIM</S.Delimiters>
      </S.Container>
    </Layout>
  );
}
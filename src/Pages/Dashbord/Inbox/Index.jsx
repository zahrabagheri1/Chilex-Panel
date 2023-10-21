import React from 'react';
import './Inbox.scss';
import Box from '../../../Components/Box/Box';

function Index() {
  const data = [
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos nostrum at sequi reiciendis fugiat harum minus, id distinctio possimus inventore vitae ipsa reprehenderit asperiores porro qui aliquam tempora. Beatae, eos! Doloribus ad, saepe iusto autem aliquid non. Quae, molestias?', date: 'Oct 14, 2023 5:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officia fuga quidem at nulla architecto qui dolorum tempora cumque amet!', date: 'Oct 14, 2023 5:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officia fuga quidem at nulla architecto qui dolorum tempora cumque amet!', date: 'Oct 20, 2023 5:40 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officia fuga quidem at nulla architecto qui dolorum tempora cumque amet!', date: 'Oct 21, 2023 5:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos nostrum at sequi reiciendis fugiat harum minus, id distinctio possimus inventore vitae ipsa reprehenderit asperiores porro qui aliquam tempora. Beatae, eos! Doloribus ad, saepe iusto autem aliquid non. Quae, molestias?', date: 'Oct 27, 2023 6:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', date: 'Oct 8, 2023 5:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, impedit!', date: 'Oct 5, 2023 3:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos nostrum at sequi reiciendis fugiat harum minus, id distinctio possimus inventore vitae ipsa reprehenderit asperiores porro qui aliquam tempora. Beatae, eos! Doloribus ad, saepe iusto autem aliquid non. Quae, molestias?', date: 'Oct 12, 2023 4:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos nostrum at sequi reiciendis fugiat harum minus, id distinctio possimus inventore vitae ipsa reprehenderit asperiores porro qui aliquam tempora. Beatae, eos!', date: 'Oct 13, 2023 5:59 PM'},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit corrupti delectus molestias molestiae explicabo alias cupiditate magnam, hic animi facilis rem, ut non officia nisi exercitationem assumenda veritatis pariatur sapiente. Accusamus, fuga. Nihil accusamus, voluptatibus, corrupti incidunt autem obcaecati, dolorem facere consectetur quia explicabo in nostrum consequuntur illo aut atque.', date: 'Oct 17, 2023 5:59 PM'},
    

  ]
  return (
    <div className='inbox'>
      {data.map((item, index)=>(
        <Box text={item.text} date={item.date} />
      ))}
    </div>
  );
}

export default Index;

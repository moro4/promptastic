'use client';

import {useState, useEffect} from 'react';
import PromptCard from './promptcard';

function PromptCardList({data, handleTagClick}) {
   return (
      <div className='mt-16 prompt_layout'>
         {data.map(post => (
            <PromptCard
               key={post._id}
               post={post}
               handleTagClick={handleTagClick}
            />
         ))}
      </div>
   )
}

export default function Feed() {
   const [searchText, setSearchText] = useState('');
   const [posts, setPosts] = useState([]);

   function handleSearchChange(e) {
      console.log('handleInput');
   }

   useEffect(() => {
      async function fetchPosts() {
         const response = await fetch('/api/prompt');
         const data = await response.json();
         setPosts(data);
      }
      fetchPosts();
   }, []);

   return (
      <section className='feed'>
         <form className='relative w-full flex-center'>
            <input
               type="text"
               placeholder='Search for a tag or a username'
               value={searchText}
               onChange={handleSearchChange}
               required
               className='search_input'
            />
         </form>

         <PromptCardList
            data={posts}
            handleTagClick={() => {}}
         />
      </section>
   )
}
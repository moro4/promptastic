'use client';

import {useState, useEffect, useRef} from 'react';
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
   const allPosts = useRef('');

   function handleSearchQuery(e) {
      const q = e.target.value.toLowerCase();
      const filteredPosts = allPosts.current.filter(post => {
         const searchstr = post.creator.username + post.prompt + post.tag
         return searchstr.toLowerCase().includes(q);
      });
      setSearchText(q);
      // some debouncing
      setTimeout(() => setPosts(filteredPosts), 300);
   }

   function handleTagClick(tag) {
      const filteredTags = posts.filter(post => post.tag.includes(tag.trim()))
      setPosts(filteredTags);
   }

   useEffect(() => {
      async function fetchPosts() {
         // retrive all prompts from all users
         const response = await fetch('/api/prompt/all', {
            method: 'POST'
         });
         const data = await response.json();
         allPosts.current = data
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
               onChange={handleSearchQuery}
               required
               className='search_input'
            />
         </form>

         <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
         />
      </section>
   )
}
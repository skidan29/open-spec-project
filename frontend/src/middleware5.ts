const createPost = async  () =>{
  'use server';
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
  if (!res.ok) throw new Error('Ошибка загрузки поста');
  return res.json();
  // ... логика сохранения в БД
}
 export default createPost()
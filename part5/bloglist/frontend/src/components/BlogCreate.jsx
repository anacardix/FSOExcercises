import { useState } from "react";

const BlogCreate = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmitCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    handleCreate(newBlog);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmitCreate}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </>
  );
};

export default BlogCreate;

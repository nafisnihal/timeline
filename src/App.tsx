import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Forum Timeline</h1>
      <PostList />
    </div>
  );
};

export default App;

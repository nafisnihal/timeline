import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="pt-8 bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-500">
        Forum Timeline
      </h1>
      <PostList />
    </div>
  );
};

export default App;

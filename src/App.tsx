import Meter from "./pages/Meter";

const App = () => {
  return (
    <main
      className="bg-gray-900 w-full min-h-screen overflow-x-hidden 
        flex flex-col items-center py-5 px-16"
    >
      <Meter todoCount={4} inProgressCount={12} doneCount={6} />
    </main>
  );
};

export default App;

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 rounded-lg border border-dashed border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-gray-900/30 shadow-inner">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
        Nothing to show yet
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-base max-w-md">
        Looks a little quiet here... Maybe make the first move? 🤝
      </p>
    </div>
  );
};

export default Empty;

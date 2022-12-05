const LoadingSpnner = () => {
    return (
      <>
        <div className="flex justify-center items-center h-screen fixed left-0 top-0 right-0 bottom-0 z-50 bg-transparent">
          <span className="h-6 w-6 animate-spin rounded-[50%] border-2 border-b-0 b border-primaryIndigo"></span>
          <p className="pl-4 text-white">
            Loading...
          </p>
        </div>
      </>
    );
}

export default LoadingSpnner
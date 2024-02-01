const Layout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      {children}
    </div>
  );
};

export default Layout;

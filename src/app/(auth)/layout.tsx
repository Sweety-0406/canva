interface AuthLayoutProps {
    children: React.ReactNode;
  };
  
const AuthLayout = ({ children }: AuthLayoutProps) => {
return ( 
    <div className="  h-full flex flex-col">
    {/* <div className=" bg-gradient-to-tl to-[#6ba9ff] from-[#a570ff] h-full flex flex-col"> */}
    <div className="z-[4] h-full w-full flex flex-col items-center justify-center">
        <div className="h-full px-10   py-28 sm:px-0 w-full sm:h-auto sm:w-[420px] lg:w-full">
        {children}
        </div>
    </div>
    <div
        className="fixed inset-0 z-[1] bg-cover bg-center before:absolute w-full h-full p-8 backdrop-blur-lg"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg')",
      }}
    />
    </div>
);
};

export default AuthLayout;

  
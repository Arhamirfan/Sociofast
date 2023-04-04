import routePaths from "@/src/routes/path";
import Link from 'next/link';
import Logo from "../public/assets/images/sociofast.ico"
let ErrorPage = () => {

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 font">
        <img src={Logo.src} alt="Logo" width={150} height={150} className="mb-5" />
        <h1 className="text-center mb-3">Oops! Page not found</h1>
        <p className="text-center mb-5">
          We couldn't find the page you were looking for. Please check the URL or go back to the{' '} <Link href={routePaths.login}> Login</Link>.
        </p>
      </div>
    </>
  );
};

export default ErrorPage;

import "./error_page.css";
import "../MyStyleComponents/my-styles.css";
export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg">
      <div className="error_container flex-container-column prevent-select">

          <h1 className=" font-bold error_num prevent-select">404</h1>
          <h2 className="subtext prevent-select">OPPS! Page Not Found</h2>
          <div style={{textAlign:"center"}} className="title">Sorry! the page you are looking for does not exist. 
          Please return to the home page.</div>
          <a href="/" className="button-error">
            Go Home
          </a>
  
      </div>
    </div>
  );
};

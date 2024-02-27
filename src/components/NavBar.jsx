function NavBar() {

    return (
      <>
        <div className="navbar bg-base-100 border-b mb-5">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl" href="/">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/apiwithservice">ApiWithService</a>
                <a href="/apicatalogue">Api Catalogue</a>
                <a href="/api-instrumentale">Api Instrumentale</a>
                <a href="/api-test">Api Test</a>
                <a href="/login">Se Connecter</a>
                <a href="/instrumentales">Mes Intrumentales</a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  
  export default NavBar

import React   from "react";

// ----------------------------------------------------------------------------

// export         function search( ) {

   export default function NavBar_Search() {   // Name doesn't matter 

    return ( 

      <form         className="form-inline ml-3">           {/* SEARCH FORM */}
        <div        className="input-group input-group-sm">
          <input    className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
          <div      className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i    className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>        //* NavBar_Search *//

      ) }

// ----------------------------------------------------------------------------



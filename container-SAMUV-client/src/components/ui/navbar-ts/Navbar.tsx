import React from "react";
import FrontendRoutes from "@/routing/FrontendRoutes";
import { Link } from "react-router-dom";
import { Profile } from "@/features/auth/domain/Profile";
import Account from "@/features/auth/components/Account";
import { profile } from "console";

interface INavbarProps {
  profile: Profile;
  accessRequestCount: number;
}
export default function Navbar({ profile, accessRequestCount }: INavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg bg-gradient-2">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to={FrontendRoutes.LANDING}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                to={FrontendRoutes.COLLECTION}
              >
                Colección
              </Link>
            </li>
            {true && (
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to={FrontendRoutes.PHOTOSHEETS}
                >
                  Fichas
                </Link>
              </li>
            )}
            {true && (
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to={FrontendRoutes.PERSONAL}
                >
                  Personal
                </Link>
              </li>
            )}
            <li className="nav-item dropdown w-fit-content">
              <a
                className="nav-link text-light dropdown-toggle w-fit-content"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sobre nosotros
              </a>
              <ul
                className="dropdown-menu w-fit-content"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex w-fit-content pe-5">
            <input
              className="form-control search-bar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav pe-5">
            <li className="nav-item">
              <Link
                className="nav-link text-light p-0 position-relative w-fit-content"
                to={FrontendRoutes.REQUESTS}
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {accessRequestCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
                <span className={`material-symbols-outlined`}>
                  notifications
                </span>
              </Link>
            </li>
          </ul>
          <Account></Account>
          <span>
            <div className="d-flex flex-col g-0">
              <p className="m-0">Bienvenido,</p>
              <p className="m-0 lead">{profile.fullname}</p>
            </div>
          </span>
        </div>
      </div>
    </nav>
  ); //
}

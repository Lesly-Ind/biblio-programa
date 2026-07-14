import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

interface Props{
children:ReactNode;
}

export default function MainLayout({children}:Props){

return(

<div className="layout">

<Sidebar/>

<div className="main">

<Navbar/>

<div className="content">

{children}

</div>

</div>

</div>

)

}
import Link from "next/link";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex  justify-around bg-zinc-120 py-2 border-b border-s-zinc-200  w-full px-20">
      <Link href="/" className="container flex ">
        <img
          style={{ height: "50px", width: "50px", borderRadius: "100%" }}
          src="https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/376501576_737355451738955_923667872147166504_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=x6Aq8uv0yrsAX8ZdATx&_nc_ht=scontent.fuln1-1.fna&oh=00_AfAm0zJ-FsQqjP2DhUNVC-Ivmp8hHMTq6ydaE7Ux7cPOHA&oe=6505D63E"
        />
      </Link>
      <Link href="/" className="container flex  justify-center"></Link>
      <div className="container flex justify-between items-center w-1/6">
        <AiFillInstagram size={28} style={{ color: "#FCB82D" }} />
        <BsFacebook
          size={23}
          style={{ color: "#FCB82D", borderRadius: "100%" }}
        />
        <AiFillTwitterCircle size={28} style={{ color: "#FCB82D" }} />
      </div>
    </div>
  );
};

export default Navbar;

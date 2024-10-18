import React, { useEffect, useState } from "react";
import { axios } from "../import-export/ImportExport";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
// icons
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa";

function Footer() {
  const navLinks = [
    { path: "/", display: "Home" },
    { path: "/aboutus", display: "About Us" },
    { path: "/privacypolicy", display: "Privacy Policy" },
    { path: "/termsandconditions", display: "Terms and Conditions" },
  ];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/message/send",
        { email, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // Load Google Translate
    const addGoogleTranslate = () => {
      const googleTranslateScript = document.createElement("script");
      googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(googleTranslateScript);
    };

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,es,fr,de,it", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };

    addGoogleTranslate();
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="bg-light_theme w-full text-center">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-3 space-y-9 pt-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="cols-span-1 md:col-span-4 text-left">
            <h1 className="text-lg lg:text-xl font-bold text-black/80 mb-6">MediHub</h1>
            <p className="text-md lg:text-lg text-black/70 font-medium">
              MediHub is a web-based platform facilitating seamless management of healthcare services, including appointments, patient records, and doctor interactions.
            </p>
            <div className="flex items-center gap-4 mt-10">
              <a href="https://www.instagram.com" target="_blank" className="border border-white/70 rounded-full px-2 py-2 hover:bg-slate-700/30 cursor-pointer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/itsmohit097/" target="_blank" className="border border-white/70 rounded-full px-2 py-2 hover:bg-slate-700/30 cursor-pointer"><FaLinkedin /></a>
              <a href="https://www.twitter.com" target="_blank" className="border border-white/70 rounded-full px-2 py-2 hover:bg-slate-700/30 cursor-pointer"><FaXTwitter /></a>
            </div>
          </div>
          <div className="cols-span-1 md:col-span-3">
            <h1 className="text-lg text-left md:text-center lg:text-xl font-semibold mb-6">Quick Links</h1>
            <ul className="flex flex-col justify-between gap-3 md:items-center text-md font-semibold md:gap-y-4 text-left">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path} className="text-black/70 text-md relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-main_theme before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-black">
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Translate Element */}
        <div id="google_translate_element" className="my-4"></div>

        <div className="w-full py-4">
          <p className="text-sm lg:text-[1rem] font-medium text-center">
            © {new Date().getFullYear()} Mohit Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

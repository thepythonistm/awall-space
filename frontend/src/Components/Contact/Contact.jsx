import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRedditSquare } from "react-icons/fa";
import './Contact.css';
import Dashboard from "../Dachboard/Dashboard";
import { useNavigate } from "react-router-dom";
const Contact = () => {
    const navigate = useNavigate();
    const handelNavigate = () => {
        navigate("/tellstory");
    }
    return(
        <div>
            <Dashboard />
            <h1 className="contact-txt">Contact AWALL Support & Partnerships🎯</h1>
            <p className="contact-s">Need help using AWALL, found a bug, or have a story <br /> idea to pitch?
We’re here to help</p>
          
            <div className="contact-form">
                <form>
                    <div className="contact-form">
                    <div>
                        <input type="text" placeholder="your full name" className="contact-name"/><br />
                        <input type="email" placeholder="enter your email" className="contact-email" /><br />
                        <select name="name" className="contact-select" >
                            <option value="">Support</option>
                            <option value="">Feedback</option>
                            <option value="">Collaboration</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    <div>
                        <textarea name="text" className="contact-content" placeholder="tell us" ></textarea><br />
                        <button className="contact-btn">Send</button><br />
                    </div>

                    </div>

                </form>
            </div>
            <div className="contact-img"><img src="./images/vecteezy_contact-us-business-concept-idea_5021376.jpg" alt="" /></div>
            <div className="contact-mobile">
                <form>
                    <div>
                    <div>
                        <input type="text" placeholder="your full name" className="contact-n"/><br />
                        <input type="email" placeholder="enter your email" className="contact-e" /><br />
                        <select name="name" className="contact-slc" >
                            <option value="">Support</option>
                            <option value="">Feedback</option>
                            <option value="">Collaboration</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    <div>
                        <textarea name="text" className="contact-content" placeholder="tell us" ></textarea><br />
                        <button className="contact-btn">Send</button><br />
                    </div>

                    </div>

                </form>
            </div>

                   

            <div className="links-btns">
                <div className="socialmedia">
                    <strong className="sm-txt">Follow us for updates & inspiration📣:</strong><br />
                    <div className="sm-icons">
                        <a href=""><RiInstagramFill /></a>
                        <a href=""><FaSquareXTwitter /></a>
                        <a href=""><FaRedditSquare /></a>
                    </div>

                </div>
                <div className="navigateto">
                    <strong>💬 Before your message:</strong><br />
                    <div className="share-sec"><small>Want to share a story? ➤</small><button onClick={handelNavigate} className="tell-btn">Tell us</button></div><br />
                    <div className="collab-sec"><small>Have a business proposal or want to collaborate? ➤</small><button className="collab-btn">Collaborate</button></div>
                </div>
                <div className="nav-mobile">
                    <strong>💬 Before your message:</strong><br />
                    <div className="share-mob"><p className="share-t">Want to share a story? ➤</p><button className="tell-btn">Tell us</button></div><br />
                    <div className="collab-mob"><p className="coll-t">Want to collaborate? ➤</p><button className="collab-btn">Collaborate</button></div>
                </div>
            </div>
            <div className="socialmedia-mbl">
                    <strong className="sm-txt">Follow us for updates & inspiration📣:</strong><br />
                    <div className="sm-icons">
                        <a href=""><RiInstagramFill /></a>
                        <a href=""><FaSquareXTwitter /></a>
                        <a href=""><FaRedditSquare /></a>
                    </div>

             </div>
            <div className="contact-infos">
                <strong>📍 Location: Casablanca, Morocco</strong><br />
                <strong>📧 Email: support@awall.com</strong><br />
                <strong>📱 WhatsApp/Phone: +212-6xx-xxx-xxx</strong>
            </div>


        </div>
    )
}
export default Contact;
import React from "react";
import './About.css';
import Dashboard from "../Dachboard/Dashboard";
import Footer from "../Footer/Footer";
const About = () => {
    return(
        <div className="about-wrapper">
            <Dashboard />
            <h1 className="about-txt">AWALL — Where Stories📝 Meet Truth</h1>
            <div className="about-cont">
                <h2 className="who">Who We Are🤔</h2>
                <p className="who-txt">AWALL is a space where people, startups, and brands share real stories <br /> in a safe and welcoming environment.
                We’re a digital wall where voices <br /> matter—every post is an experience, every reply a real response. <br /> Our mission is to connect people through honesty <br /> empathy, and shared journeys</p>
                <div>
                    <p className="who-mobile">AWALL is a space where people, startups, and brands share real stories in a safe and welcoming environment.
                    We’re a digital wall where voices matter—every post is an experience, every reply a real response. Our mission is to connect people through honesty empathy, and shared journeys</p>
                </div>
                <h3 className="why">Why AWALL🔎</h3>
                <p className="why-txt">Because authentic experiences matter.
In a world of noise, filters, and fake reviews <br /> it’s hard to find what’s real. That’s why AWALL exists—to create a platform <br /> where users can speak freely, and others can listen, relate, and learn. <br />

Whether you’re a solo user a growing startup or a creative brand <br /> —your story belongs here.</p>

            </div>
            <video className="about-vid" src="./images/5077081-uhd_4096_2160_25fps.mp4" autoPlay loop ></video>

            <div>
            <p className="why-mobile">Because authentic experiences matter.
In a world of noise, filters, and fake reviews it’s hard to find what’s real. That’s why AWALL exists—to create a platform where users can speak freely, and others can listen, relate, and learn.

Whether you’re a solo user a growing startup or a creative brand —your story belongs here.</p>
            </div>
            <h4 className="values-txt">Awall add values🎁</h4>
            <div className="add-values">
                <div className="value1">
                    <strong> Real Experience Exchange🤝</strong><br />
                    <small>Users can ask questions like <br /> “What’s it really like working <br /> at X company?” or “How was <br /> your trip to Bali?” and get <br />honest replies from real people.</small>
                </div>
                <div className="value2">
                    <strong>A Wall of Trust🧱</strong><br />
                    <small>Everything on AWALL <br /> is built around comfort<br /> and respect—no spam <br /> no toxicity.</small>
                </div>
                <div className="value3">
                    <strong>Empowering Voices🚀</strong><br />
                    <small>Whether you're reflecting <br /> promoting, or inspiring <br /> we give you the tools <br /> to express yourself fully.</small>
                </div>
            </div>
            <Footer />

        </div>
    )
}
export default About;
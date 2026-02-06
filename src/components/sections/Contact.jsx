'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.add('show-animate');
                    } else {
                        section.classList.remove('show-animate');
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '-50px 0px'
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <h2 className="heading">Contact <span>Me</span></h2>

            <form action="https://formspree.io/f/mwpoprde" method="POST">
                <div className="input-box">
                    <div className="input-field">
                        <input type="text" name="name" placeholder="Full Name" required />
                        <span className="focus"></span>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="Email" required />
                        <span className="focus"></span>
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-field">
                        <input type="tel" name="mobile" placeholder="Mobile Number" required />
                        <span className="focus"></span>
                    </div>
                    <div className="input-field">
                        <input type="text" name="subject" placeholder="Email Subject" required />
                        <span className="focus"></span>
                    </div>
                </div>

                <div className="textarea-field">
                    <textarea name="message" cols="30" rows="10" placeholder="Your Message" required></textarea>
                    <span className="focus"></span>
                </div>

                <div className="btn-box btns">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        </section>
    );
}

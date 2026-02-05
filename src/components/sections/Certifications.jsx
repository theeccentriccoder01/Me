'use client';

import { useState, useEffect, useRef } from 'react';

export default function Certifications() {
    const sectionRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(6);

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

    const certifications = [
        { year: 'Aug 2025', title: 'MongoDB Python Developer Path', provider: 'MongoDB', logo: '/Logos/MongoDB.jpg', link: 'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/713ba667-f013-4587-bc5d-b79b5a699562-sagnik-chakraborty-a0558f96-bcd9-417d-ae67-5e182cbf64a0-certificate.pdf' },
        { year: 'Aug 2025', title: 'Postman API Fundamentals Student Expert', provider: 'Postman', logo: '/Logos/Postman.jpg', link: 'https://api.badgr.io/public/assertions/CFV9eM3OS7iTkVb9EiIXZg' },
        { year: 'Apr 2025', title: 'Learning Plan - Explore Emerging Tech', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://www.credly.com/badges/76e994f4-a66f-4209-9727-f0007de3c3a8/public_url' },
        { year: 'Apr 2025', title: 'Machine Learning Specialisation', provider: 'Stanford', logo: '/Logos/Stanford.jpeg', link: 'https://coursera.org/verify/specialization/LFKBNA9PX8ST' },
        { year: 'Apr 2025', title: 'Six Sigma Yellow Belt Certification Course', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://www.udemy.com/certificate/UC-0bb040ff-b528-4508-83b1-a484592d4d21/' },
        { year: 'Dec 2023', title: 'Cloud Computing Core', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/AGDRK6KBKLDQ' },
        { year: 'Dec 2023', title: 'Node and Express Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/XA3YKPWY4DR2' },
        { year: 'Dec 2023', title: 'Web Development with HTML, CSS, JavaScript Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/TQR8R2BNC7AU' },
        { year: 'Nov 2023', title: 'Front-End Development with React', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/Y6JYZ9TE9N7F' },
        { year: 'Nov 2023', title: 'Git and GitHub Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/BY2GNFFH82N6' },
        { year: 'Nov 2023', title: 'Python for Data Science, AI & Development', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/6KZ5T2BMWA6Z' },
        { year: 'Oct 2023', title: 'Mega Web Development Course - Full Stack Web Application', provider: 'POUYA ETI Education', logo: '/Logos/POUYA ETI Education.jpeg', link: 'https://ude.my/UC-647ba40f-58d4-45fc-ba69-be7fa46d1897' },
        { year: 'Oct 2023', title: 'Web Development Masterclass', provider: 'YouAccel', logo: '/Logos/YouAccel Training.jpg', link: 'https://ude.my/UC-Ob047a2b-0429-4fbd-b35c-cea3170e46e7' },
        { year: 'Aug 2023', title: 'Intra-College Innovation Challenge', provider: 'The JGEC Alumni Association', logo: '/Logos/Alumni Association.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sjFeg53nGG2ZIhams?e=emzqQ1' },
        { year: 'Jul 2023', title: 'Certified Lean Six Sigma White Belt', provider: 'MF Treinamentos', logo: '/Logos/MF Treinamentos.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9six9JTE1qBJ3aGt2G?e=gLBzzG' },
        { year: 'Jul 2023', title: 'Edunet Learning Plan - Emerging Technologies', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sjx0iFVPeb8yrD9C9?e=eICbHy' },
        { year: 'Jul 2023', title: 'JavaScript Essentials', provider: 'Cisco Networking Academy', logo: '/Logos/Cisco.jpeg', link: 'https://www.credly.com/badges/83bed5fd-8ba1-4c44-8358-73fb2da1623e/public_url' },
        { year: 'Jul 2023', title: 'Overview of Remote Sensing Technology', provider: 'ISRO', logo: '/Logos/ISRO.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siwHlVGVNuRrKniPI?e=AauY5j' },
        { year: 'Dec 2023', title: 'Python Programming', provider: 'University of Pennsylvania', logo: '/Logos/University of Pennsylvania.jpeg', link: 'https://www.coursera.org/account/accomplishments/certificate/8PYHWBFPDT7B' },
        { year: 'Jul 2023', title: 'Python3 Ultimate Guide', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://ude.my/UC-ab042b10-f80a-4a4a-bfc6-bba6b43b8e49' },
        { year: 'Jun 2023', title: 'Excellence in Leadership', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://ude.my/UC-f181dc4a-bf21-4ebf-b9e6-66881516880d' },
        { year: 'Jun 2023', title: 'Philosophy', provider: 'The University of Edinburgh', logo: '/Logos/The University of Edinburgh.jpg', link: 'https://www.coursera.org/account/accomplishments/certificate/8ULGP2AJ8ALE' },
        { year: 'Jun 2023', title: 'Professional Ethics', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://ude.my/UC-70b2b713-fa62-4fcb-af54-c97461a1d3d5' },
        { year: 'Jun 2023', title: 'Write Professional Emails in English', provider: 'Georgia Institute of Technology', logo: '/Logos/Georgia Institute of Technology.jpg', link: 'https://www.coursera.org/account/accomplishments/certificate/7BNEJU84GYJ7' },
        { year: 'May 2023', title: 'Ricerca 2023 - Annual Case Study Competition', provider: 'IIEEE Student Branch JGEC', logo: '/Logos/IEEE JGEC.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9silSlT5jUnsWfyucN?e=VxcmGy' },
        { year: 'May 2023', title: 'Winner - TECHNOVISION 2k23', provider: 'Siliguri Institute of Technology', logo: '/Logos/Siliguri Institute of Technology.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sjnjDtf9AQRyyxLOz?e=cLfyFu' },
        { year: 'Apr 2023', title: 'Data Science: R Programming Complete Diploma', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://www.udemy.com/certificate/UC-739d4fd5-60f7-48ef-b4af-ed6d5164e96c/' },
        { year: 'Feb 2023', title: 'Fundamentals of Quantum Computing (LFQ101)', provider: 'The Linux Foundation', logo: '/Logos/The Linux Foundation.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sikTcL051ABmJaJs2?e=C8FiBr' },
        { year: 'Jan 2023', title: 'Digital Photography Quiz', provider: 'Taj Learning Academy', logo: '/Logos/Taj Learning Academy.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siVgsdzgAyEoj3BTV' },
        { year: 'Jan 2023', title: 'Front-End Web Development ESSENTIALS - GDSC - JavaScript, ReactJS', provider: 'Google', logo: '/Logos/Google.jpeg', link: 'https://cert.devtown.in/verify/177Hmz' },
        { year: 'Jan 2023', title: 'Front-End Web Development ESSENTIALS - JavaScript, ReactJS', provider: 'DevTown', logo: '/Logos/DevTown.jpg', link: 'https://cert.devtown.in/verify/ZwsrIn' },
        { year: 'Jan 2023', title: 'Front-End Web Development ESSENTIALS - MLSA - JavaScript, ReactJS', provider: 'Microsoft', logo: '/Logos/Microsoft.jpeg', link: 'https://cert.devtown.in/verify/Z3oS2X' },
        { year: 'Oct 2022', title: 'Ayurveda se Sarvodaya Quiz', provider: 'Namaste India Foundation', logo: '/Logos/Namaste India Foundation.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siV-pjjnfzc3-cAll' },
        { year: 'Jun 2022', title: 'National Statistics Day Quiz', provider: 'Dr. Shivanand Nautiyal Govt. P.G. College', logo: '/Logos/Dr. Shivanand Nautiyal Govt. P.G. College.png', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siV4Gbn5DndDJV016' },
        { year: 'Mar 2022', title: 'World Consumer Rights Day Quiz', provider: 'J.J. College of Arts and Science', logo: '/Logos/J.J. College of Arts and Science.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siVxHhfzkWJ9d0WCT' },
        { year: 'May 2021', title: 'Stay Home Stay Safe Campaign', provider: 'DPS Siliguri', logo: '/Logos/DPS Siliguri.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siUzUZ9dig42i46Mg' },
        { year: 'Dec 2017', title: 'ICAS Credit - Digital Technologies, English, Mathematics, Science', provider: 'UNSW College', logo: '/Logos/UNSW.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siT2IrsXXpD_PgPbv' },
        { year: 'Dec 2016', title: 'IAIS Credit - Digital Technologies, English, Mathematics, Science', provider: 'UNSW College', logo: '/Logos/UNSW.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siTlSkOXNKNU1uDY9' },
        { year: 'Sep 2016', title: 'Wiz National Spell Bee - School Level, Interschool and State Level - Phonetics', provider: 'English Wizard Foundation', logo: '/Logos/WIZ National Spell Bee.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siUUrynq2zc-4WtBj' },
        { year: 'Jan 2016', title: 'Quiz - 2nd Position', provider: 'DPS Siliguri', logo: '/Logos/DPS Siliguri.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siUnTQ3lJseeMwBxc' },
        { year: 'Jun 2015', title: 'Art - Siliguri Academy of Art - Prathamic Final, First Year, Third Year', provider: 'Sastriya Sangeet Kala Parishad', logo: '/Logos/Sastriya Sangeet Kala Parishad.png', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siTtBn5aeLhRsr90O' },
    ];

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, certifications.length));
    };

    const loadAll = () => {
        setVisibleCount(certifications.length);
    };

    const showLess = () => {
        setVisibleCount(6);
    };

    return (
        <section className="certifications-section" id="certifications" ref={sectionRef}>
            <h2 className="heading">My <span>Certifications</span></h2>

            <div className="certifications-container">
                {certifications.slice(0, visibleCount).map((cert, idx) => (
                    <div key={idx} className="certification-card">
                        <div className="cert-header">
                            <div className="year"><i className="bx bxs-calendar"></i> {cert.year}</div>
                            <h3>{cert.title}</h3>
                        </div>
                        <div className="cert-provider">
                            <img src={cert.logo} alt={cert.provider} className="cert-logo" />
                            <span>{cert.provider}</span>
                        </div>
                        <p className="cert-link">
                            <a href={cert.link} target="_blank" rel="noopener noreferrer">View Credential</a>
                        </p>
                    </div>
                ))}

                <div className="load-more-container">
                    {visibleCount < certifications.length && (
                        <>
                            <button className="btn" onClick={loadMore}>Load More</button>
                            <button className="inverse-btn" onClick={loadAll}>Load All</button>
                        </>
                    )}
                    {visibleCount > 6 && (
                        <button className="btn" onClick={showLess}>Show Less</button>
                    )}
                </div>
            </div>
        </section>
    );
}

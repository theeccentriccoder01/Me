'use client';

import { useState } from 'react';

export default function Certifications() {
    const [visibleCount, setVisibleCount] = useState(6);

    const certifications = [
        { year: 'Apr 2025', title: 'Learning Plan - Explore Emerging Tech', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://www.credly.com/badges/76e994f4-a66f-4209-9727-f0007de3c3a8/public_url' },
        { year: 'Apr 2025', title: 'Machine Learning Specialisation', provider: 'Stanford', logo: '/Logos/Stanford.jpeg', link: 'https://coursera.org/verify/specialization/LFKBNA9PX8ST' },
        { year: 'Apr 2025', title: 'Six Sigma Yellow Belt Certification Course', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://www.udemy.com/certificate/UC-0bb040ff-b528-4508-83b1-a484592d4d21/' },
        { year: 'Dec 2023', title: 'Cloud Computing Core', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/AGDRK6KBKLDQ' },
        { year: 'Dec 2023', title: 'Node and Express Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/XA3YKPWY4DR2' },
        { year: 'Dec 2023', title: 'Web Development with HTML, CSS, JavaScript Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/TQR8R2BNC7AU' },
        { year: 'Nov 2023', title: 'Front-End Development with React', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/Y6JYZ9TE9N7F' },
        { year: 'Nov 2023', title: 'Git and GitHub Essentials', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/BY2GNFFH82N6' },
        { year: 'Nov 2023', title: 'Python for Data Science, AI & Development', provider: 'IBM', logo: '/Logos/IBM.jpeg', link: 'https://coursera.org/verify/6KZ5T2BMWA6Z' },
        { year: 'Oct 2023', title: 'Mega Web Development Course', provider: 'POUYA ETI Education', logo: '/Logos/POUYA ETI Education.jpeg', link: 'https://ude.my/UC-647ba40f-58d4-45fc-ba69-be7fa46d1897' },
        { year: 'Oct 2023', title: 'Web Development Masterclass', provider: 'YouAccel', logo: '/Logos/YouAccel Training.jpg', link: 'https://ude.my/UC-Ob047a2b-0429-4fbd-b35c-cea3170e46e7' },
        { year: 'Aug 2023', title: 'Intra-College Innovation Challenge', provider: 'The JGEC Alumni Association', logo: '/Logos/Alumni Association.jpeg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sjFeg53nGG2ZIhams?e=emzqQ1' },
        { year: 'Jul 2023', title: 'Certified Lean Six Sigma White Belt', provider: 'MF Treinamentos', logo: '/Logos/MF Treinamentos.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9six9JTE1qBJ3aGt2G?e=gLBzzG' },
        { year: 'Jul 2023', title: 'JavaScript Essentials', provider: 'Cisco Networking Academy', logo: '/Logos/Cisco.jpeg', link: 'https://www.credly.com/badges/83bed5fd-8ba1-4c44-8358-73fb2da1623e/public_url' },
        { year: 'Jul 2023', title: 'Overview of Remote Sensing Technology', provider: 'ISRO', logo: '/Logos/ISRO.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9siwHlVGVNuRrKniPI?e=AauY5j' },
        { year: 'Dec 2023', title: 'Python Programming', provider: 'University of Pennsylvania', logo: '/Logos/University of Pennsylvania.jpeg', link: 'https://www.coursera.org/account/accomplishments/certificate/8PYHWBFPDT7B' },
        { year: 'Jul 2023', title: 'Python3 Ultimate Guide', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://ude.my/UC-ab042b10-f80a-4a4a-bfc6-bba6b43b8e49' },
        { year: 'Jun 2023', title: 'Excellence in Leadership', provider: 'Udemy', logo: '/Logos/Udemy.jpg', link: 'https://ude.my/UC-f181dc4a-bf21-4ebf-b9e6-66881516880d' },
        { year: 'Feb 2023', title: 'Fundamentals of Quantum Computing (LFQ101)', provider: 'The Linux Foundation', logo: '/Logos/The Linux Foundation.jpg', link: 'https://1drv.ms/b/s!Apzf3AWnJd9sikTcL051ABmJaJs2?e=C8FiBr' },
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
        <section className="certifications-section" id="certifications">
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

'use client';

import { useState, useEffect, useRef } from 'react';

export default function Education() {
    const sectionRef = useRef(null);
    const [showGoogleMedia, setShowGoogleMedia] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalAlt, setModalAlt] = useState('');

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

    const openModal = (src, alt) => {
        setModalImage(src);
        setModalAlt(alt);
    };

    const closeModal = () => {
        setModalImage(null);
        setModalAlt('');
    };

    const toggleMedia = () => {
        setShowGoogleMedia(!showGoogleMedia);
    };

    const experiences = [
        {
            logo: '/Logos/EduLinkUpLogo.jpg',
            alt: 'EduLinkUp',
            year: 'Jun 2024 - Present',
            title: 'Founder and Content Head',
            company: 'EduLinkUp',
            description: `· Building EduLinkUp as a student-first learning ecosystem focused on skill development, internships, and community-driven growth
· Leading content strategy while actively contributing across product development, platform design, partnerships, and program execution to create scalable learning opportunities for students.`
        },
        {
            logo: '/Logos/Google.jpeg',
            alt: 'Google',
            year: 'Sep 2025 - Present',
            title: 'Google Student Ambassador',
            company: 'Google',
            description: `· Leading AI-driven initiatives on campus to promote awareness and innovation around Google Gemini
· Organising hands-on AI and Gemini workshops, demos, and events
· Collaborating with college fests and student communities to drive AI adoption, sharing insights, ideas, and feedback from students to enhance Gemini’s campus impact and inspiring peers to explore real-world AI applications and creative problem-solving.`,
            hasMedia: true,
            mediaLabel: 'View Onboarding Kit',
            mediaImage: '/images/Onboarding Kit.jpg'
        },
        {
            logo: '/Logos/Elevate Labs.jpg',
            alt: 'Elevate Labs',
            year: 'Aug 2025 - Sep 2025',
            title: 'Python Developer Intern',
            company: 'Elevate Labs',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/EW-T9AwmMyRJgTyoz5ZeaqkBIzAUE4ql4O7UtnzqpNtYiA?e=xvQNua',
            description: 'Worked on the development of a diverse range of beginner, intermediate and advanced level Python projects'
        },
        {
            logo: '/Logos/Unified Mentor.jpg',
            alt: 'Unified Mentor',
            year: 'Jul 2025 - Oct 2025',
            title: 'Front-End Web Developer Intern',
            company: 'Unified Mentor',
            certLink: 'https://unifiedmentor.com/verify-certificate/UMID13072550112',
            description: 'Worked on the development of a diverse range of beginner, intermediate and advanced level Web Development projects',
            hasMedia: true,
            mediaLabel: 'View The LOR',
            mediaImage: '/images/LOR - Unified Mentor.png'
        },
        {
            logo: '/Logos/JGEC.png',
            alt: 'JGEC',
            year: 'Jun 2024 - Aug 2024',
            title: 'Educational Content and SDE Intern',
            company: 'JGEC',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/EWlF6IYLj99PuC3Bkj0s_y0Bnla_zdbyO6pdREk4V4zxKA?e=fnYGYk',
            description: `· Contributed to researching, collecting, and processing content for the Computer Science syllabus chapters.
· Designed and integrated illustrations, fact boxes, and QR codes to enhance interactivity.
· Developed the corresponding fullstack using Wix and animated learning materials using generative AI, and creating engaging quizzes.`
        },
        {
            logo: '/Logos/CodSoft.jpg',
            alt: 'CodSoft',
            year: 'Jul 2023 - Aug 2023',
            title: 'Web Developer Intern',
            company: 'CodSoft',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/IQAZLE2crSbkSr50RFtveUzZAZuz2ZbcWmiFFxnpC3pSNfU?e=vOPys1',
            description: 'Worked on the development of a diverse range of beginner and intermediate-level web development projects, including a personal portfolio'
        }
    ];

    const volunteering = [
        {
            logo: '/Logos/Micro.png',
            alt: 'Micro2025',
            year: 'May 2025',
            title: 'Organising Coordinator',
            company: 'Micro2025',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/Ed2ObyqPsRRMlgAqKZvKehEBPLQ2sjKYJw258WOuJ4X2mQ?e=OyTB3E',
            description: `· Served as an Organising Coordinator for the 12th International Conference on Microelectronics, Circuits and Systems (Micro2025), held on the 10th and 11th of May, 2025.
· Coordinated the event logistics, speaker management, technical session scheduling, promotional activities and delegate engagement...
· Collaborated with national and international participants and stakeholders and ensured the seamless execution of a multi-day academic conference...`
        },
        {
            logo: '/Logos/NCRTST25.avif',
            alt: 'NCRTST25',
            year: 'Mar 2024',
            title: 'Organising Coordinator',
            company: 'NCRTST25',
            description: `· Served as an Organising Coordinator for the National Conference on Recent Trends in Science and Technologies 2025 (NCRTST25), held on the 29th and 30th of March, 2025.
· Coordinated the event logistics, speaker management and technical session scheduling
· Collaborated with participants and stakeholders at the national level and ensured the seamless execution of a multi-day academic conference...`
        },
        {
            logo: '/Logos/DevTown.jpg',
            alt: 'DevTown',
            year: 'Jan 2023 - Jul 2023',
            title: 'Campus Ambassador',
            company: 'DevTown',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/Edlwf6meLS9NkTKoh31GyxQBJwSsfVNPR201QMSuYiR1mg?e=2vvnyt',
            certLabel: 'View Offer Letter',
            description: `· Actively promoted DevTown\'s free certified bootcamps and paid training programs focused on in-demand software development technologies.
· My responsibilities included sharing updates through social media groups, channels, and direct outreach within my college, encouraging participation among peers and expanding DevTown\'s reach within my network.`
        },
        {
            logo: '/Logos/Tare Zameen Foundation.jpg',
            alt: 'Tare Zameen Foundation',
            year: 'Jan 2023 - Mar 2023',
            title: 'Fundraiser Intern',
            company: 'Tare Zameen Foundation',
            certLink: 'https://1drv.ms/b/c/6cdf25a705dcdf9c/ETvkPp6Z8SNAmUMMbb4PW6ABkbz4pFcIwEp7IsoA5y3M1A?e=FBRZzJ',
            description: `· Contributed or the project "Meri Pehchan" to initiatives aimed at providing basic education and learning resources to underprivileged children.
· My role involved spreading awareness, engaging potential donors, and helping organise fundraising campaigns to support the distribution of books and educational materials to those in need.`
        }
    ];

    const education = [
        {
            logo: '/Logos/JGEC.png',
            alt: 'JGEC',
            year: 'Sep 2022 - Jul 2026',
            title: 'BTech, IT',
            company: 'JGEC',
            description: 'YGPA1: 8.32 | YGPA2: 8.07 | SGPA5: 9.0\nMathematics · Digital Electronics · DSA · TOC · OS · DBMS · AI, ML, ANN and Deep Learning · Software Dev · Physical Sciences · Language and Soft-Skills'
        },
        {
            logo: '/Logos/DPS Siliguri.jpg',
            alt: 'DPS Siliguri',
            year: 'Apr 2020 - Jun 2022',
            title: 'Senior Secondary',
            company: 'DPS, Siliguri',
            description: 'Grade: 95%\nPhysical Sciences · Mathematics · Computer Science · Economics · English'
        },
        {
            logo: '/Logos/DPS Siliguri.jpg',
            alt: 'DPS Siliguri',
            year: 'Apr 2010 - Mar 2020',
            title: 'Secondary',
            company: 'DPS, Siliguri',
            description: 'Grade: 95.6%\nPhysical and Life Sciences · Mathematics · History and Politics · Geography · Economics · English · Bengali · Hindi'
        }
    ];

    const renderTimelineItem = (item, index, isFirst = false) => (
        <div className="education-content" key={index}>
            <div className="timeline-logo">
                <img src={item.logo} alt={item.alt} />
            </div>
            <div className="content">
                <div className="year"><i className="bx bxs-calendar"></i> {item.year}</div>
                <h3>{item.title}</h3>
                <h6>
                    {item.company}
                    {item.certLink && (
                        <a href={item.certLink} target="_blank" rel="noopener noreferrer" className="cert-link" style={{ color: 'rgb(145, 0, 0)', marginLeft: '10px' }}>
                            <i className="bx bx-link" style={{ color: 'rgb(145, 0, 0)' }}></i> {item.certLabel || 'View Certificate'}
                        </a>
                    )}
                </h6>
                <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>

                {item.hasMedia && (
                    <>
                        <div className="media-toggle">
                            <button className="media-btn" onClick={toggleMedia}>
                                <i className={`bx ${showGoogleMedia ? 'bx-hide' : 'bx-image'}`}></i>
                                {showGoogleMedia ? 'Hide Media' : item.mediaLabel}
                            </button>
                        </div>
                        <div className={`media-gallery ${showGoogleMedia ? '' : 'hidden'}`}>
                            <div className="media-grid">
                                <div className="media-item-wrapper" onClick={() => openModal(item.mediaImage, item.mediaLabel)}>
                                    <img src={item.mediaImage} alt="Onboarding Kit" className="media-item" />
                                    <div className="media-hover-overlay">
                                        <span>Click to View</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <section className="education" id="education" ref={sectionRef}>
            <h2 className="heading">My <span>Journey</span></h2>

            <div className="education-row">
                <div className="education-column exp-col">
                    <h3 className="title">Experience</h3>
                    <div className="education-box">
                        {experiences.map((exp, idx) => renderTimelineItem(exp, idx, idx === 0))}
                    </div>
                </div>

                <div className="education-column exp-col">
                    <h3 className="title">Volunteering</h3>
                    <div className="education-box">
                        {volunteering.map((vol, idx) => renderTimelineItem(vol, idx))}
                    </div>
                </div>

                <div className="education-column edu-col">
                    <h3 className="title">Education</h3>
                    <div className="education-box">
                        {education.map((edu, idx) => renderTimelineItem(edu, idx))}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {modalImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <i className="bx bx-x"></i>
                        </button>
                        <img src={modalImage} alt={modalAlt} className="modal-image" />
                        <p className="modal-caption">{modalAlt}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

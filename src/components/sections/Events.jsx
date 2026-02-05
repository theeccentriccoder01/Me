'use client';

import { useState } from 'react';

export default function Events() {
    const [showGCArcadeBadges, setShowGCArcadeBadges] = useState(false);

    const gcArcadeBadges = [
        // Arcade Badges
        { src: '/Badges/Google Cloud/Arcade Badges/Future Ready Skills.png', name: 'Future Ready Skills' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 1 - Application Design and Delivery.png', name: 'Level 1 - Application Design and Delivery' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 1 - Cloud Infrastructure and Data Foundation.png', name: 'Level 1 - Cloud Infrastructure and Data Foundation' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 2 - AI and Data Innovation on Google Cloud.png', name: 'Level 2 - AI and Data Innovation on Google Cloud' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 2 - Building with Cloud Tools.png', name: 'Level 2 - Building with Cloud Tools' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 3 - Developer Essentials.png', name: 'Level 3 - Developer Essentials' },
        { src: '/Badges/Google Cloud/Arcade Badges/Level 3 - Terraform Essentials.png', name: 'Level 3 - Terraform Essentials' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Base Camp August 2025.png', name: 'Skills Boost Arcade Base Camp August 2025' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Base Camp September 2025.png', name: 'Skills Boost Arcade Base Camp September 2025' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Certification Zone August 2025.png', name: 'Skills Boost Arcade Certification Zone August 2025' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Certification Zone September 2025.png', name: 'Skills Boost Arcade Certification Zone September 2025' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia August 2025 Week 1.png', name: 'Skills Boost Arcade Trivia August 2025 Week 1' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia August 2025 Week 2.png', name: 'Skills Boost Arcade Trivia August 2025 Week 2' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia August 2025 Week 3.png', name: 'Skills Boost Arcade Trivia August 2025 Week 3' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia August 2025 Week 4.png', name: 'Skills Boost Arcade Trivia August 2025 Week 4' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia September 2025 Week 1.png', name: 'Skills Boost Arcade Trivia September 2025 Week 1' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia September 2025 Week 2.png', name: 'Skills Boost Arcade Trivia September 2025 Week 2' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia September 2025 Week 3.png', name: 'Skills Boost Arcade Trivia September 2025 Week 3' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia September 2025 Week 4.png', name: 'Skills Boost Arcade Trivia September 2025 Week 4' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Boost Arcade Trivia October 2025 Week 1.png', name: 'Skills Boost Arcade Trivia October 2025 Week 1' },
        { src: '/Badges/Google Cloud/Arcade Badges/Skills Scribble.png', name: 'Skills Scribble' },
        { src: '/Badges/Google Cloud/Arcade Badges/Work Meets Play - Faster Finance.png', name: 'Work Meets Play - Faster Finance' },

        // Google for Developers
        { src: '/Badges/Google Cloud/Google for Developers/Android Developer.jpeg', name: 'Android Developer' },
        { src: '/Badges/Google Cloud/Google for Developers/Cloud Shell in Cloud Documentation.jpg', name: 'Cloud Shell in Cloud Documentation' },
        { src: '/Badges/Google Cloud/Google for Developers/Codelab Completed.jpg', name: 'Codelab Completed' },
        { src: '/Badges/Google Cloud/Google for Developers/Firebase Studio Developer.jpg', name: 'Firebase Studio Developer' },
        { src: '/Badges/Google Cloud/Google for Developers/First Learning Pathway.jpg', name: 'First Learning Pathway' },
        { src: '/Badges/Google Cloud/Google for Developers/Gemini Code Assist Agents.jpg', name: 'Gemini Code Assist Agents' },
        { src: '/Badges/Google Cloud/Google for Developers/Google Cloud Skills Boost.jpg', name: 'Google Cloud Skills Boost' },
        { src: '/Badges/Google Cloud/Google for Developers/Innovator.jpg', name: 'Innovator' },
        { src: '/Badges/Google Cloud/Google for Developers/Joined the Google Developer Program.jpg', name: 'Joined the Google Developer Program' },
        { src: '/Badges/Google Cloud/Google for Developers/Maps Innovator.jpg', name: 'Maps Innovator' },
        { src: '/Badges/Google Cloud/Google for Developers/NVIDIA Community Member.jpg', name: 'NVIDIA Community Member' },
        { src: '/Badges/Google Cloud/Google for Developers/Set up Android Studio.jpg', name: 'Set up Android Studio' },

        // Lab Free Courses
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - AI Power-Ups for Google Workspace.png', name: 'AI Boost Bites - AI Power-Ups for Google Workspace' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Amplify Exec Voices with AI.png', name: 'AI Boost Bites - Amplify Exec Voices with AI' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Automate tasks with Gemini and Apps Script.png', name: 'AI Boost Bites - Automate tasks with Gemini and Apps Script' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Content Generation with Gemini Made Easy.png', name: 'AI Boost Bites - Content Generation with Gemini Made Easy' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Create Docs in Seconds.png', name: 'AI Boost Bites - Create Docs in Seconds' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Customer insights with NotebookLM.png', name: 'AI Boost Bites - Customer insights with NotebookLM' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Discover Sources in NotebookLM.png', name: 'AI Boost Bites - Discover Sources in NotebookLM' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Eat the Frog with NotebookLM.png', name: 'AI Boost Bites - Eat the Frog with NotebookLM' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Email Content Creation.png', name: 'AI Boost Bites - Email Content Creation' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Exec Summaries with Gemini Gems.png', name: 'AI Boost Bites - Exec Summaries with Gemini Gems' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Gemini Gems – Your ultimate marketing sidekick.png', name: 'AI Boost Bites - Gemini Gems – Your ultimate marketing sidekick' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Gemini Image-to-Sheets Hack.png', name: 'AI Boost Bites - Gemini Image-to-Sheets Hack' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Gemini Slide Summaries.png', name: 'AI Boost Bites - Gemini Slide Summaries' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Intro to NotebookLM.png', name: 'AI Boost Bites - Intro to NotebookLM' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - No-Code Sheets & Scripts.png', name: 'AI Boost Bites - No-Code Sheets & Scripts' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - NotebookLM for Competitive Edge.png', name: 'AI Boost Bites - NotebookLM for Competitive Edge' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - NotebookLM for Market Research.png', name: 'AI Boost Bites - NotebookLM for Market Research' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - NotebookLM Mind Maps.png', name: 'AI Boost Bites - NotebookLM Mind Maps' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - NotebookLM Video Overviews.png', name: 'AI Boost Bites - NotebookLM Video Overviews' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Personalization with customized prompts.png', name: 'AI Boost Bites - Personalization with customized prompts' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Poke Holes in Your Strategy.png', name: 'AI Boost Bites - Poke Holes in Your Strategy' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Project Notebooks.png', name: 'AI Boost Bites - Project Notebooks' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Prompting like a Pro with Google Workspace.png', name: 'AI Boost Bites - Prompting like a Pro with Google Workspace' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - Tame Your Inbox with AI.png', name: 'AI Boost Bites - Tame Your Inbox with AI' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Boost Bites - TL;DR with Gemini in Docs & Drive.png', name: 'AI Boost Bites - TL;DR with Gemini in Docs & Drive' },
        { src: '/Badges/Google Cloud/Lab Free Courses/AI Infrastructure Introduction to AI Hypercomputer.png', name: 'AI Infrastructure Introduction to AI Hypercomputer' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Building Complex End to End Self-Service Experiences in Dialogflow CX.png', name: 'Building Complex End to End Self-Service Experiences in Dialogflow CX' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Conversational AI on Vertex AI and Dialogflow CX.png', name: 'Conversational AI on Vertex AI and Dialogflow CX' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Digital Transformation with Google Cloud.png', name: 'Digital Transformation with Google Cloud' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Exploring Data Transformation with Google Cloud.png', name: 'Exploring Data Transformation with Google Cloud' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Gen AI Agents Transform Your Organization.png', name: 'Gen AI Agents Transform Your Organization' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Gen AI Apps Transform Your Work.png', name: 'Gen AI Apps Transform Your Work' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Gen AI Beyond the Chatbot.png', name: 'Gen AI Beyond the Chatbot' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Gen AI Navigate the Landscape.png', name: 'Gen AI Navigate the Landscape' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Gen AI Unlock Foundational Concepts.png', name: 'Gen AI Unlock Foundational Concepts' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Calendar.png', name: 'Google Calendar' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Docs.png', name: 'Google Docs' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Drive.png', name: 'Google Drive' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Meet.png', name: 'Google Meet' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Sheets.png', name: 'Google Sheets' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Google Slides.png', name: 'Google Slides' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Innovating with Google Cloud Artificial Intelligence.png', name: 'Innovating with Google Cloud Artificial Intelligence' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Introduction to Large Language Models.png', name: 'Introduction to Large Language Models' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Machine Learning Operations (MLOps) with Vertex AI Model Evaluation.png', name: 'Machine Learning Operations (MLOps) with Vertex AI Model Evaluation' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Modernize Infrastructure and Applications with Google Cloud.png', name: 'Modernize Infrastructure and Applications with Google Cloud' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Responsible AI Applying AI Principles with Google Cloud.png', name: 'Responsible AI Applying AI Principles with Google Cloud' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Responsible AI for Digital Leaders with Google Cloud.png', name: 'Responsible AI for Digital Leaders with Google Cloud' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Scaling with Google Cloud Operations.png', name: 'Scaling with Google Cloud Operations' },
        { src: '/Badges/Google Cloud/Lab Free Courses/Trust and Security with Google Cloud.png', name: 'Trust and Security with Google Cloud' },

        // Skill Badges
        { src: '/Badges/Google Cloud/Skill Badges/Build Infrastructure with Terraform on Google Cloud.png', name: 'Build Infrastructure with Terraform on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Build LookML Objects in Looker.png', name: 'Build LookML Objects in Looker' },
        { src: '/Badges/Google Cloud/Skill Badges/Cloud Speech API - 3 Ways.png', name: 'Cloud Speech API - 3 Ways' },
        { src: '/Badges/Google Cloud/Skill Badges/Create a Secure Data Lake on Cloud Storage.jpg', name: 'Create a Secure Data Lake on Cloud Storage' },
        { src: '/Badges/Google Cloud/Skill Badges/Develop Your Google Cloud Network.png', name: 'Develop Your Google Cloud Network' },
        { src: '/Badges/Google Cloud/Skill Badges/Enrich Metadata and Discovery of BigLake Data.png', name: 'Enrich Metadata and Discovery of BigLake Data' },
        { src: '/Badges/Google Cloud/Skill Badges/Explore Generative AI with the Gemini API in Vertex AI.png', name: 'Explore Generative AI with the Gemini API in Vertex AI' },
        { src: '/Badges/Google Cloud/Skill Badges/Get Started with Dataplex.png', name: 'Get Started with Dataplex' },
        { src: '/Badges/Google Cloud/Skill Badges/Get Started with Eventarc.png', name: 'Get Started with Eventarc' },
        { src: '/Badges/Google Cloud/Skill Badges/Get Started with Google Workspace Tools.png', name: 'Get Started with Google Workspace Tools' },
        { src: '/Badges/Google Cloud/Skill Badges/Get Started with Pub-Sub.png', name: 'Get Started with Pub-Sub' },
        { src: '/Badges/Google Cloud/Skill Badges/Get Started with Sensitive Data Protection.png', name: 'Get Started with Sensitive Data Protection' },
        { src: '/Badges/Google Cloud/Skill Badges/Implement CICD Pipelines on Google Cloud.png', name: 'Implement CICD Pipelines on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Implement Cloud Security Fundamentals on Google Cloud.png', name: 'Implement Cloud Security Fundamentals on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Implement DevOps Workflows in Google Cloud.png', name: 'Implement DevOps Workflows in Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Implement Multimodal Vector Search with BigQuery.png', name: 'Implement Multimodal Vector Search with BigQuery' },
        { src: '/Badges/Google Cloud/Skill Badges/Implementing Cloud Load Balancing for Compute Engine.png', name: 'Implementing Cloud Load Balancing for Compute Engine' },
        { src: '/Badges/Google Cloud/Skill Badges/Manage Data Models in Looker.png', name: 'Manage Data Models in Looker' },
        { src: '/Badges/Google Cloud/Skill Badges/Manage Kubernetes in Google Cloud.png', name: 'Manage Kubernetes in Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Mitigate Threats and Vulnerabilities with Security Command Center.png', name: 'Mitigate Threats and Vulnerabilities with Security Command Center' },
        { src: '/Badges/Google Cloud/Skill Badges/Monitor and Log with Google Cloud Observability.png', name: 'Monitor and Log with Google Cloud Observability' },
        { src: '/Badges/Google Cloud/Skill Badges/Monitor and Manage Google Cloud Resources.png', name: 'Monitor and Manage Google Cloud Resources' },
        { src: '/Badges/Google Cloud/Skill Badges/Monitor Environments with Google Cloud Managed Service for Prometheus.png', name: 'Monitor Environments with Google Cloud Managed Service for Prometheus' },
        { src: '/Badges/Google Cloud/Skill Badges/Monitoring in Google Cloud.png', name: 'Monitoring in Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Optimize Costs for Google Kubernetes Engine.png', name: 'Optimize Costs for Google Kubernetes Engine' },
        { src: '/Badges/Google Cloud/Skill Badges/Perform Predictive Data Analysis in BigQuery.png', name: 'Perform Predictive Data Analysis in BigQuery' },
        { src: '/Badges/Google Cloud/Skill Badges/Prepare Data for ML APIs on Google Cloud.png', name: 'Prepare Data for ML APIs on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Privileged Access with IAM.png', name: 'Privileged Access with IAM' },
        { src: '/Badges/Google Cloud/Skill Badges/Prompt Design in Vertex AI.png', name: 'Prompt Design in Vertex AI' },
        { src: '/Badges/Google Cloud/Skill Badges/Protect Cloud Traffic with Chrome Enterprise Premium Security.png', name: 'Protect Cloud Traffic with Chrome Enterprise Premium Security' },
        { src: '/Badges/Google Cloud/Skill Badges/Set Up a Google Cloud Network.png', name: 'Set Up a Google Cloud Network' },
        { src: '/Badges/Google Cloud/Skill Badges/Set Up an App Dev Environment on Google Cloud.png', name: 'Set Up an App Dev Environment on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Share Data Using Google Data Cloud.png', name: 'Share Data Using Google Data Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Store, Process, and Manage Data on Google Cloud - Command Line.png', name: 'Store, Process, and Manage Data on Google Cloud - Command Line' },
        { src: '/Badges/Google Cloud/Skill Badges/Store, Process, and Manage Data on Google Cloud - Console.png', name: 'Store, Process, and Manage Data on Google Cloud - Console' },
        { src: '/Badges/Google Cloud/Skill Badges/Streaming Analytics into BigQuery.png', name: 'Streaming Analytics into BigQuery' },
        { src: '/Badges/Google Cloud/Skill Badges/Use APIs to Work with Cloud Storage.png', name: 'Use APIs to Work with Cloud Storage' },
        { src: '/Badges/Google Cloud/Skill Badges/Use Functions, Formulas, and Charts in Google Sheets.png', name: 'Use Functions, Formulas, and Charts in Google Sheets' },
        { src: '/Badges/Google Cloud/Skill Badges/Use Machine Learning APIs on Google Cloud.png', name: 'Use Machine Learning APIs on Google Cloud' },
        { src: '/Badges/Google Cloud/Skill Badges/Using the Google Cloud Speech API.png', name: 'Using the Google Cloud Speech API' },
    ];

    const hacktoberfestBadges = [
        { src: '/Badges/Hacktoberfest 2025/Dev.to Hacktoberfest Badge.webp', name: 'Dev.to Hacktoberfest Writing Challenge Badge' },
        { src: '/Badges/Hacktoberfest 2025/Early Bird Pegasaurus.png', name: 'Early Bird Pegasaurus' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Level 0 Registered.webp', name: 'Hacktoberfest 2025 Level 0 Registered' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Level 1.webp', name: 'Hacktoberfest 2025 Level 1' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Level 2.webp', name: 'Hacktoberfest 2025 Level 2' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Level 3.webp', name: 'Hacktoberfest 2025 Level 3' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Level 4.webp', name: 'Hacktoberfest 2025 Level 4' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Supercontributor.webp', name: 'Hacktoberfest 2025 Supercontributor' },
        { src: '/Badges/Hacktoberfest 2025/Hacktoberfest 2025 Tree Planted.webp', name: 'Hacktoberfest 2025 Tree Planted' },
        { src: '/Badges/Hacktoberfest 2025/Holopin x Hacktoberfest - 1 Badge Club.webp', name: 'Holopin x Hacktoberfest - 1 Badge Club' },
        { src: '/Badges/Hacktoberfest 2025/Holopin x Hacktoberfest - 5 Badge Club.webp', name: 'Holopin x Hacktoberfest - 5 Badge Club' },
    ];

    return (
        <section className="events-section" id="events">
            <h2 className="heading">Events &amp; <span>Programs</span></h2>

            <div className="events-container">
                {/* Google Cloud Arcade Facilitator */}
                <div className="event-card">
                    <div className="event-header">
                        <div className="event-logo">
                            <img src="/Logos/Facilitator Program.jpg" alt="Google Cloud" />
                        </div>
                        <div className="event-title-section">
                            <h3>Google Cloud Arcade Facilitator Program</h3>
                            <div className="event-cohort">Cohort 2</div>
                            <div className="event-date"><i className="bx bxs-calendar"></i> August 2025 - December 2025</div>
                        </div>
                    </div>

                    <p className="event-description">
                        Actively participated in Cohort 2, focused on hands-on learning and cloud innovation; Gained practical experience through labs, skill badges, and trivia challenges, explored key areas like Cloud Computing, AI/ML, and scalable systems, collaborating with a community of cloud enthusiasts and future-ready developers...
                        <br />Continuously building skills and mindset for real-world applications in Google Cloud technologies.
                    </p>

                    <div className="event-links">
                        <a href="https://www.skills.google/public_profiles/88955038-92e7-4861-b63b-aee7a92261cc" target="_blank" rel="noopener noreferrer" className="event-link-btn">
                            <i className="bx bx-cloud"></i> Cloud Skills Boost Profile
                        </a>
                        <a href="https://g.dev/mreccentric" target="_blank" rel="noopener noreferrer" className="event-link-btn">
                            <i className="bx bxl-google"></i> Google for Developers Profile
                        </a>
                    </div>

                    <div className="badges-collection">
                        <div className="badges-header">
                            <h4><i className="bx bx-award"></i> Badges Collected</h4>
                        </div>

                        <div className="badges-grid visible-row">
                            {gcArcadeBadges.map((badge, idx) => (
                                <div key={idx} className="gc-badge-item">
                                    <span className="badge-icon">🏅</span>
                                    <img src={badge.src} alt={badge.name} />
                                    <span className="badge-name">{badge.name}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="view-more-badges-btn"
                            onClick={() => setShowGCArcadeBadges(!showGCArcadeBadges)}
                        >
                            <i className={`bx ${showGCArcadeBadges ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                            {showGCArcadeBadges ? 'Show Less Badges' : 'View All Badges'}
                        </button>
                    </div>

                    <div className="event-media-section">
                        <h4><i className="bx bx-image"></i> Swag &amp; Goodies</h4>
                        <div className="event-media-grid">
                            <img src="/images/Arcade Confirmation.png" alt="Google Cloud Confirmation" className="event-media-item" />
                            <img src="/images/Google Arcade Trooper Swags.png" alt="Google Cloud Swag" className="event-media-item" />
                        </div>
                    </div>
                </div>

                {/* Hacktoberfest */}
                <div className="event-card">
                    <div className="event-header">
                        <div className="event-logo">
                            <img src="/Logos/Hacktoberfest.jpeg" alt="Hacktoberfest" />
                        </div>
                        <div className="event-title-section">
                            <h3>Hacktoberfest</h3>
                        </div>
                    </div>

                    <div className="event-timeline">
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="year"><i className="bx bxs-calendar"></i> Oct 2025</div>
                                <h4>Project Maintainer</h4>
                                <p>Served as both the admin and mentor for several of my projects, where I facilitated issue tracking, reviewed pull requests, and helped contributors understand Python and Streamlit, MERN integration and HuggingFace Transformers resulting in successful feature additions and meaningful contributions from the mentees.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="year"><i className="bx bxs-calendar"></i> Oct 2025</div>
                                <h4>Open Source Contributor</h4>
                                <p>Made meaningful contributions to various open-source projects, submitting quality pull requests.</p>
                            </div>
                        </div>
                    </div>

                    <div className="badges-collection">
                        <div className="badges-header">
                            <h4><i className="bx bx-award"></i> Hacktoberfest Badges</h4>
                        </div>

                        <div className="badges-grid">
                            {hacktoberfestBadges.map((badge, idx) => (
                                <div key={idx} className="hf-badge-item">
                                    <span className="badge-icon">🏅</span>
                                    <img src={badge.src} alt={badge.name} />
                                    <span className="badge-name">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="event-media-section">
                        <h4><i className="bx bx-image"></i> T-Shirt &amp; Achievements</h4>
                        <div className="event-media-grid">
                            <img src="/images/Hacktoberfest Tee.jpg" alt="Tee" className="event-media-item" />
                            <img src="/images/Certificate - Treenation.png" alt="Treenation" className="event-media-item" />
                        </div>
                    </div>

                </div>

                {/* GirlScript Summer of Code */}
                <div className="event-card">
                    <div className="event-header">
                        <div className="event-logo">
                            <img src="/Logos/GSSoC.jpg" alt="GirlScript Summer of Code" />
                        </div>
                        <div className="event-title-section">
                            <h3>GirlScript Summer of Code</h3>
                            <div className="event-date"><i className="bx bxs-calendar"></i> July 2025 - Oct 2025</div>
                        </div>
                    </div>

                    <div className="event-single-position">
                        <h4>Project Administrator</h4>
                        <p>
                            Stood out in the Top 10 amongst hundreds of project admins. Served as both the admin and mentor for my projects TalkHeal, SaralSeva, Spamlyser and Venturalink, where I facilitated issue tracking, reviewed pull requests, and helped contributors understand Python and Streamlit, MERN integration and HuggingFace Transformers resulting in successful feature additions and meaningful contributions from the mentees.
                        </p>
                    </div>

                    <div className="badges-collection">
                        <div className="badges-header">
                            <h4><i className="bx bx-award"></i> GSSoC Badge</h4>
                        </div>

                        <div className="badges-grid">
                            <div className="gssoc-badge-item">
                                <span className="badge-icon">🏅</span>
                                <img src="/Badges/Project Admin Badge.jpg" alt="Project Admin" />
                                <span className="badge-name">Project Admin</span>
                            </div>
                        </div>
                    </div>

                    <div className="event-media-section">
                        <h4><i className="bx bx-image"></i> Achievements &amp; Swags</h4>
                        <div className="event-media-grid">
                            <img src="/images/LOR - GSSoC25.png" alt="LOR" className="event-media-item" />
                            <img src="/images/Certificate - Project Admin at GSSoC25.png" alt="Certificate - Project Admin at GSSoC25" className="event-media-item" />
                            <img src="/images/Certificate - Contributor at GSSoC25.png" alt="Certificate - Contributor at GSSoC25" className="event-media-item" />
                            <div class="coming-soon-placeholder">
                                <div class="cosmic-loader">
                                    <div class="orbit orbit-1"></div>
                                    <div class="orbit orbit-2"></div>
                                    <div class="orbit orbit-3"></div>
                                    <div class="core"></div>
                                </div>
                                <h5>⚡ INCOMING TRANSMISSION ⚡</h5>
                                <p class="tech-text">Swag materialisation in progress...</p>
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                                <span class="eta-text">ETA: Quantum delivery pending</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

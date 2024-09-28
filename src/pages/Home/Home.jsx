import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import authenticIcon from "../../assets/images/home/facilities/authentic.png";
import communityIcon from "../../assets/images/home/facilities/community.png";
import doubtIcon from "../../assets/images/home/facilities/doubt.png";
import insightIcon from "../../assets/images/home/facilities/insight.png";
import homePageImage from "../../assets/images/pages/home-page.png";
import harishImage from "../../assets/images/home/founders/harish.jpg";
import harishSmallImage from "../../assets/images/home/founders/harish-small.jpg";
import prajwalImage from "../../assets/images/home/founders/prajwal.jpg";
import prajwalSmallImage from "../../assets/images/home/founders/prajwal-small.jpg";
import shreyashImage from "../../assets/images/home/founders/shreyash.jpg";
import shreyashSmallImage from "../../assets/images/home/founders/shreyash-small.jpg";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CompaniesListInfiniteHorizontalScroll from "../../components/CompaniesListInfiniteHorizontalScroll/CompaniesListInfiniteHorizontalScroll";
import GithubSection from "../../components/GithubSection/GithubSection";
import Image from "../../components/Image/Image";
import LoginRequiredLink from "../../components/LoginRequiredLink/LoginRequiredLink";
import TopPosts from "../../components/TopPosts/TopPosts";
import styles from "./Home.module.css";
import "./slider.css";

function Home() {
  return (
    <>
      <Helmet>
        <title>Interview Experience | PICT</title>
        <meta
          name="description"
          content="Get the Inside Scoop on Pune Institute Of Computer Technology (PICT) Company Placements. Be the Pro in the Know with Real Interview Insights. Make Informed Decisions and Take Control of Your Career Journey Today!"
        />
        <meta name="twitter:card" content={homePageImage} />
        <meta name="twitter:title" content="Interview Experience | PICT" />
        <meta
          name="twitter:description"
          content="Get the Inside Scoop on Pune Institute Of Computer Technology (PICT) Company Placements. Be the Pro in the Know with Real Interview Insights. Make Informed Decisions and Take Control of Your Career Journey Today!"
        />
        <meta name="twitter:image" content={homePageImage} />

        <meta property="og:title" content="Interview Experience | PICT" />
        <meta
          property="og:description"
          content="Get the Inside Scoop on Pune Institute Of Computer Technology (PICT) Company Placements. Be the Pro in the Know with Real Interview Insights. Make Informed Decisions and Take Control of Your Career Journey Today!"
        />
        <meta property="og:image" content={homePageImage} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_BASE_CLIENT_URL}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className={styles.Home}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>
              <span>A Friendly Tool to</span>
              <span className={styles.underlineSpan}>Crack Interview</span>
            </h1>
            <p>
              Get the Inside Scoop on Pune Institute Of Computer Technology
              (PICT) Company Placements. Be the Pro in the Know with Real
              Interview Insights. Make Informed Decisions and Take Control of
              Your Career Journey Today!
            </p>
            <div className={styles.heroActionButtons}>
              <LoginRequiredLink
                textContent="Create Post"
                to="/post"
                className={`default-button ${styles.exploreButton}`}
              />
              <Link
                to="/posts"
                className={`default-button default-outline-button ${styles.aimButton}`}
              >
                View Posts
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.facilities} id="aim">
          <div className="container">
            <h2>
              <span>Be Prepared for your Next interview</span>
              <span className={styles.underlineSpan}>
                with Interview Experience
              </span>
            </h2>
            <div className={styles.facilitiesContainer}>
              <div className={styles.facility}>
                <img src={insightIcon} alt="" />
                <h3>Insights</h3>
                <p>
                  Get Real Insights, Ace Your Interviews. Discover the Power of
                  Sharing Your Experiences with Our Community.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={doubtIcon} alt="" />
                <h3>Doubt Solving</h3>
                <p>
                  Get the Support You Need for Your Career Journey. Ask Your
                  Doubts, Get Feedback from Your Peers.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={communityIcon} alt="" />
                <h3>Connect with Alumni</h3>
                <p>
                  Build Your Network, Grow Your Connections. Get to Know Alumni
                  and Expand Your Horizons.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={authenticIcon} alt="" />
                <h3>Authenticity</h3>
                <p>
                  Discover Authentic Interview Insights on Our Platform and Get
                  a Realistic Look at Campus Placements!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.posts} id="recentPosts">
          <div className="container">
            <h2>
              <span className={styles.underlineSpan}>
                Top Interview Experiences
              </span>
            </h2>
            <TopPosts />
          </div>
        </section>

        <section className={styles.companies} id="recentPosts">
          <div className="container">
            <h2>Students Posted about</h2>
            <CompaniesListInfiniteHorizontalScroll />
          </div>
        </section>

        <section className={styles.team}>
          <div className="container">
            <div className={styles.teamContainer}>
              <h2>
                <span className={styles.underlineSpan}>Our Team</span>
              </h2>
              <div className={styles.memberContainer}>
                <div className={styles.member}>
                  <Image
                    imageSrc={shreyashImage}
                    smallImageSrc={shreyashSmallImage}
                    imageAlt="Shreyash Bachate"
                    containerClassName={styles.profileImage}
                    imageClassName=""
                  />
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/shreyash-bachate-b79464233/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Shreyash Bachate
                    </a>
                  </h3>
                  <p>
                    Skilled Full Stack Developer proficient in React, Node,
                    with expertise in DSA problem-solving, and solved
                    700+ Problems on Leetcode and 60+ Contests.
                  </p>
                </div>

                <div className={styles.member}>
                  <Image
                    imageSrc={harishImage}
                    smallImageSrc={harishSmallImage}
                    imageAlt="Harish Sugandhi"
                    containerClassName={styles.profileImage}
                    imageClassName=""
                  />
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/harish-sugandhi-709bba225/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Harish Sugandhi
                    </a>
                  </h3>
                  <p>
                    Experienced with MERN Stack, showcased coding skills on
                    Leetcode, Codechef, and Gfg. Past roles include MERN Stack
                    intern in various startups and currently working at BSF.
                  </p>
                </div>

                <div className={styles.member}>
                  <Image
                    imageSrc={prajwalImage}
                    smallImageSrc={prajwalSmallImage}
                    imageAlt="Prajwal Kakade"
                    containerClassName={styles.profileImage}
                    imageClassName=""
                  />
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/prajwal-kakade-29bb7a1b5/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Prajwal Kakade
                    </a>
                  </h3>
                  <p>
                    MERN developer also well versed with ionic and react
                    framework.Full time Employee at ION. 3⭐ on CodeChef, 400+
                    Problems on Leetcode and always up for Problem Solving in
                    DSA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Used to show the button for github */}
        <GithubSection />

        <section className={styles.attribution}>
          <div className="container">
            <div>
              <h2>
                <span className={styles.underlineSpan}>User Reviews</span>
              </h2>
              <div className={`attributionSlides ${styles.attributionSlides}`}>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  navigation
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className={styles.attributionSlide}>
                      <p className={styles.attributionText}>
                        In the future, this website may be useful to future
                        engineers from PICT to prepare for their interviews as
                        well as to familiarize themselves with companies and
                        their processes.
                      </p>
                      <div className={styles.attributerDetail}>
                        <p className={styles.attributerName}>Beta Tester</p>
                        <p className={styles.attributerDesignation}>
                          Computer Student
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.footer}>
          <div className="container">
            <div className={styles.footerContainer}>
              <div className={styles.info}>
                <h2>Interview Experience</h2>
                <p>
                  Empowering PICT Students for Success: Join Our Community and
                  Share Your Interview Experiences. Learn from Your Peers and
                  Get the Edge You Need to Ace Your Interviews.
                </p>
              </div>

              <div className={styles.links}>
                <h2>Links</h2>
                <Link to="/credits">Credits</Link>
                <a href="mailto:pictarchives@gmail.com">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.copyRight}>
          <div className="container">
            <p>Interview Experience</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

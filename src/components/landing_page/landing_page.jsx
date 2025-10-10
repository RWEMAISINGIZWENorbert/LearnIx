import React from 'react';
import SplitText from "../animations/SplitText";
import './landing_page.css'
import Spline from '@splinetool/react-spline';
import BlurText from "../animations/BlurText";


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export const Landing_page = () => {
  return (
    <div className='landing_page'>
          <div className="gradient"></div>
      <div className="box">
        <div className="leftside">
          <div className="data">
            <div className="schools_count">
              <p className="schools_count_p">🥳 1K + schools across Rwanda.</p>
            </div>
            <div className="big_one">
              <div className="step">
                <p className="step_p">
                  <span className="purple">
                      <SplitText
                      text="Step"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    /> &nbsp;
                    </span> 
                     <SplitText
                      text="into the"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                      />
                  </p>
              </div>
              <div className="future">
                <p className="future_p">
                    <SplitText
                      text="f"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    />
                  <span className="purple">
                    <SplitText
                      text="u"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    />  
                  </span>
                    <SplitText
                      text="t"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    />
                  <span className="purple">
                    <SplitText
                      text="u"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    />  
                  </span>
                    <SplitText
                      text="re!"
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                      onLetterAnimationComplete={handleAnimationComplete}
                    />
                  </p>
              </div>
            </div>
            <div className="description">
              <p className="description_p">
                <span className="learnix">
                  <BlurText
                  text="Learn"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl mb-8"
                  />
                  <span className="ix">
                  <BlurText
                  text="Ix"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl mb-8"
                />
                      </span></span>
                <BlurText
                  text="is an all-in-one platform that provides students and teachers with easy access to past exam papers, school records, and school applications. With a simple and modern interface, users can quickly search, view, and download educational resources anytime, anywhere."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl mb-8"
                />
              </p>
            </div>
            <div className="buttons">
              <div className="get_started">
                <button>Get Started</button>
              </div>
              <div className="our_pricing">
                <button>Our Pricing</button>
              </div>
            </div>
            <div className="separator"></div>
            <div className="available_spaces">
              <p className="available_spaces_p a">132K +</p>
              <p className="available_spaces_p b">Available Spaces.</p>
            </div>
          </div>
        </div>
        <div className="rightside">
            <div className="animate">
              <main className="animation">
                {/* <Spline scene="https://prod.spline.design/5EQvbcXsUSiRIdJO/scene.splinecode" /> */}
              </main>
            </div>
            <div className="text">
              <div className="text_p">
                <div className="img">
                  <img src={`${import.meta.env.BASE_URL}assets/LearnIx.png`} alt="LearnIx logo" />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
